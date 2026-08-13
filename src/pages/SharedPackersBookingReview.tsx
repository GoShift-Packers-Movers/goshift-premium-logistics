import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  coerceNum,
  completeSharedPackersPaymentWithRetry,
  createSharedPackersPaymentOrder,
  fetchSharedPackersBooking,
  formatRupee,
  formatRazorpayContact,
  loadRazorpayScript,
  openRazorpayCheckout,
  PaymentCancelledError,
  type SharedPackersBookingResponse,
} from "@/lib/sharedBookingApi";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
] as const;

const TIME_PERIODS = ["Morning", "Afternoon", "Evening"] as const;
const TIME_SLOTS: Record<(typeof TIME_PERIODS)[number], string[]> = {
  Morning: ["7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM", "10:00 AM - 11:00 AM"],
  Afternoon: ["2:00 PM - 3:00 PM", "4:00 PM - 5:00 PM"],
  Evening: ["6:00 PM - 7:00 PM"],
};

const SHARED_BOOKING_SUCCESS_MESSAGE =
  "Order confirmed successfully. Please check the GoShift app — your order will be updated shortly.";

const PACKING_STYLE_LABELS: Record<string, string> = {
  elite_multi: "Elite Packing",
  standard_single: "Standard Packing",
  just_shifting: "You Pack We Shift",
  part_load: "Part Load Packing",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">{title}</h2>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">{children}</div>
    </section>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className={`text-right font-semibold ${highlight ? "text-blue-700" : "text-slate-900"}`}>
        {value}
      </span>
    </div>
  );
}

function dateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function availableScheduleDates(preferred?: Date): Date[] {
  const today = dateOnly(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(tomorrow);
    d.setDate(d.getDate() + i);
    return d;
  });
  if (preferred && !dates.some((d) => isSameDay(d, preferred))) {
    return [preferred, ...dates].slice(0, 8);
  }
  return dates;
}

function dateToEpoch(d: Date): number {
  const copy = dateOnly(d);
  copy.setHours(12, 0, 0, 0);
  return copy.getTime();
}

function epochToDate(ms: number): Date | null {
  if (!ms || ms <= 0) return null;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return dateOnly(d);
}

function formatPackingStyle(raw: string): string {
  return PACKING_STYLE_LABELS[raw] ?? raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function periodForSlot(slot: string): (typeof TIME_PERIODS)[number] {
  for (const period of TIME_PERIODS) {
    if (TIME_SLOTS[period].includes(slot)) return period;
  }
  return "Morning";
}

function ScheduleDateStrip({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const dates = useMemo(() => availableScheduleDates(selectedDate ?? undefined), [selectedDate]);

  return (
    <div>
      <p className="mb-3 text-sm font-bold text-slate-800">Select date</p>
      <div className="-mx-1 flex gap-2.5 overflow-x-auto pb-1">
        {dates.map((date) => {
          const isSelected = selectedDate != null && isSameDay(date, selectedDate);
          const weekday = WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
          return (
            <button
              key={date.getTime()}
              type="button"
              onClick={() => onSelect(date)}
              className={`flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-2 py-2.5 transition ${
                isSelected
                  ? "border-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-blue-300"
              }`}
            >
              <span className={`text-[10px] font-bold tracking-wide ${isSelected ? "text-white/90" : "text-slate-500"}`}>
                {weekday.toUpperCase()}
              </span>
              <span className="mt-1 text-2xl font-extrabold leading-none">{date.getDate()}</span>
              <span
                className={`mt-1 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {MONTHS[date.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleTimeSlots({
  selectedSlot,
  onSelect,
}: {
  selectedSlot: string;
  onSelect: (slot: string) => void;
}) {
  const [period, setPeriod] = useState<(typeof TIME_PERIODS)[number]>(() =>
    selectedSlot ? periodForSlot(selectedSlot) : "Morning",
  );

  useEffect(() => {
    if (selectedSlot) setPeriod(periodForSlot(selectedSlot));
  }, [selectedSlot]);

  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-bold text-slate-800">Select time slot</p>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {TIME_PERIODS.map((p) => {
          const active = period === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-xl border px-2 py-2.5 text-xs font-bold transition ${
                active
                  ? "border-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {TIME_SLOTS[period].map((slot) => {
          const active = selectedSlot === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-3 text-left text-sm font-semibold transition ${
                active
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"
              }`}
            >
              <span>{slot}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                }`}
              >
                {active ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SharedPackersBookingReview() {
  const { token = "" } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);
  const [data, setData] = useState<SharedPackersBookingResponse | null>(null);
  const [paying, setPaying] = useState(false);
  const [payPhase, setPayPhase] = useState<"idle" | "preparing" | "checkout" | "verifying">("idle");
  const [success, setSuccess] = useState<{ orderId: string; message: string } | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    void loadRazorpayScript().catch(() => {
      /* pre-load; payment handler will retry */
    });
  }, []);

  const load = useCallback(async () => {
    if (!token) {
      setError("Invalid share link");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetchSharedPackersBooking(token);
      setData(res);
      const bd = res.bookingData;
      const sched = coerceNum(bd.scheduledDate);
      const parsedDate = epochToDate(sched);
      if (parsedDate) setSelectedDate(parsedDate);
      setTimeSlot(String(bd.timeSlot || ""));
      if (res.personalDetails) {
        setName(res.personalDetails.name || "");
        setEmail(res.personalDetails.email || "");
        setPhone(res.personalDetails.phone || "");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load booking");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const booking = data?.bookingData ?? {};
  const isHouse = data?.bookingType === "house_shifting";
  const isBike = data?.bookingType === "bike_shifting";

  const items = useMemo(() => {
    const raw = booking.items;
    if (!Array.isArray(raw)) return [];
    return raw as Array<Record<string, unknown>>;
  }, [booking.items]);

  const addOns = useMemo(() => {
    const raw = booking.addOns;
    if (!Array.isArray(raw)) return [];
    return raw as Array<Record<string, unknown>>;
  }, [booking.addOns]);

  const fareLines = useMemo(() => {
    if (!isHouse) return [];
    const lines: Array<{ label: string; value: number; discount?: boolean }> = [];
    const push = (label: string, key: string, discount = false) => {
      const v = coerceNum(booking[key]);
      if (v !== 0) lines.push({ label, value: v, discount });
    };
    const mergedCorePrice =
      coerceNum(booking.basePrice) +
      coerceNum(booking.packingPrice) +
      coerceNum(booking.distanceCharge);
    if (mergedCorePrice !== 0) {
      lines.push({ label: "Price", value: mergedCorePrice });
    }
    push("Items price", "itemsPrice");
    push("Add-on services", "addOnServicesPrice");
    push("Extra pickup charge", "extraPickupCharge");
    push("Peak hours surcharge", "peakHoursSurcharge");
    push("Night charges", "nightChargesSurcharge");
    push("Risk location surcharge", "riskLocationSurcharge");
    push("Floor charge", "floorCharge");
    push("Long distance charge", "longDistancePrice");
    push("Rope pulling", "ropePullingPrice");
    push("Service tier discount", "serviceTierDiscount", true);
    push("Distance discount", "distanceDiscount", true);
    push("Part load CFT discount", "partLoadCftDiscount", true);

    const couponAmount = coerceNum(booking.discount ?? booking.couponDiscount);
    if (booking.isCouponApplied && booking.couponCode && couponAmount > 0) {
      lines.push({
        label: `Coupon (${String(booking.couponCode).toUpperCase()})`,
        value: couponAmount,
        discount: true,
      });
    } else if (couponAmount > 0) {
      lines.push({ label: "Coupon discount", value: couponAmount, discount: true });
    }

    if (booking.isGSTAdded) {
      const gst = coerceNum(booking.gstCharges) || coerceNum(booking.gstAmount);
      if (gst > 0) lines.push({ label: "GST (5%)", value: gst });
    }
    return lines;
  }, [booking, isHouse]);

  const handlePay = async () => {
    if (!data || paying) return;
    setPaymentNotice(null);
    if (data.isAdminShare) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError("Please enter your name, email, and phone number.");
        return;
      }
    }
    if (!selectedDate) {
      setError("Please select a shifting date.");
      return;
    }
    if (isHouse && !timeSlot.trim()) {
      setError("Please select a time slot.");
      return;
    }

    try {
      setPaying(true);
      setError(null);
      setPayPhase("preparing");
      await loadRazorpayScript();

      const orderPayload = await createSharedPackersPaymentOrder({
        token: data.shareToken,
        scheduledDate: dateToEpoch(selectedDate),
        timeSlot: timeSlot.trim(),
        ...(data.isAdminShare
          ? { name: name.trim(), email: email.trim(), phone: phone.trim() }
          : {}),
      });

      setPayPhase("checkout");
      const razorpayContact = formatRazorpayContact(
        data.isAdminShare ? phone.trim() : phone,
      );
      const checkout = await openRazorpayCheckout({
        key: orderPayload.razorpayKeyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        orderId: orderPayload.razorpayOrderId,
        name: data.isAdminShare ? name.trim() : name,
        email: data.isAdminShare ? email.trim() : email,
        contact: razorpayContact,
        description:
          data.paymentDueLabel === "full"
            ? "Bike shifting — full payment"
            : "House shifting — advance payment",
      });

      setPayPhase("verifying");
      const completed = await completeSharedPackersPaymentWithRetry({
        token: data.shareToken,
        razorpayOrderId: checkout.razorpay_order_id,
        razorpayPaymentId: checkout.razorpay_payment_id,
        razorpaySignature: checkout.razorpay_signature,
      });

      setSuccess({
        orderId: completed.orderId,
        message: completed.message || SHARED_BOOKING_SUCCESS_MESSAGE,
      });
    } catch (e) {
      if (e instanceof PaymentCancelledError) {
        setPaymentNotice("Payment was cancelled. You can try again when ready.");
        setError(null);
      } else {
        setError(e instanceof Error ? e.message : "Payment failed");
      }
    } finally {
      setPaying(false);
      setPayPhase("idle");
    }
  };

  const payButtonLabel = useMemo(() => {
    if (!data) return "Pay";
    const amount =
      data.paymentDueLabel === "full"
        ? `Pay ${formatRupee(data.paymentDueAmount)}`
        : `Pay advance ${formatRupee(data.paymentDueAmount)}`;
    if (payPhase === "preparing") return "Preparing payment…";
    if (payPhase === "checkout") return "Complete payment in Razorpay…";
    if (payPhase === "verifying") return "Confirming payment…";
    return paying ? "Processing…" : amount;
  }, [data, payPhase, paying]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EFF6FF] text-slate-600">
        Loading booking details…
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#EFF6FF]">
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
            <h1 className="text-xl font-bold text-green-800">Payment successful</h1>
            <p className="mt-3 text-sm text-green-900">{success.message}</p>
            <p className="mt-4 text-sm font-semibold text-slate-700">Order ID: {success.orderId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-[#EFF6FF]">
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <h1 className="text-lg font-bold text-red-800">Unable to open booking</h1>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <header className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-2xl items-center">
          <img src={logo} alt="GoShift" className="h-10 w-auto object-contain" />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Review Booking</h1>
          <p className="mt-1 text-sm text-slate-600">
            {isHouse ? "House shifting" : "Bike shifting"} — GoShift Packers &amp; Movers
          </p>
        </div>

        <Section title="Trip">
          <Row
            label="Service"
            value={isHouse ? String(booking.vehicleName || "House shifting") : "Bike shifting"}
          />
          <Row
            label="Date & time"
            value={`${String(booking.scheduledDateFormatted || "—")} · ${String(booking.timeSlot || "—")}`}
          />
          {coerceNum(booking.distanceKm) > 0 && (
            <Row label="Distance" value={`${coerceNum(booking.distanceKm).toFixed(2)} km`} />
          )}
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold text-green-700">Pickup</p>
            <p className="text-sm text-slate-800">{String(booking.pickupAddress || "—")}</p>
            {(booking.pickupFloor || booking.pickupHasServiceLift != null) && (
              <p className="mt-1 text-xs text-slate-500">
                Floor: {String(booking.pickupFloor || "—")}
                {booking.pickupHasServiceLift ? " · Service lift" : ""}
              </p>
            )}
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-red-600">Drop</p>
            <p className="text-sm text-slate-800">{String(booking.dropAddress || "—")}</p>
            {(booking.dropFloor || booking.dropHasServiceLift != null) && (
              <p className="mt-1 text-xs text-slate-500">
                Floor: {String(booking.dropFloor || "—")}
                {booking.dropHasServiceLift ? " · Service lift" : ""}
              </p>
            )}
          </div>
        </Section>

        {isHouse && items.length > 0 && (
          <Section title="Inventory / Items">
            <ul className="divide-y divide-slate-100">
              {items.map((item, idx) => {
                const itemName = String(item.name || item.itemName || item.title || "Item");
                const qty = item.quantity != null ? coerceNum(item.quantity) : 0;
                return (
                  <li key={idx} className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-slate-800">{itemName}</span>
                    {qty > 0 && <span className="font-medium text-slate-600">× {qty}</span>}
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {isHouse && booking.packingStyle && (
          <Section title="Packing style">
            <p className="text-sm font-medium text-slate-800">
              {formatPackingStyle(String(booking.packingStyle))}
            </p>
          </Section>
        )}

        {isHouse && addOns.length > 0 && (
          <Section title="Add-on services">
            <ul className="divide-y divide-slate-100">
              {addOns.map((addon, idx) => {
                const addonName = String(addon.title || addon.name || addon.id || "Add-on");
                const qty = coerceNum(addon.quantity) || 1;
                return (
                  <li key={idx} className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-slate-800">{addonName}</span>
                    <span className="font-medium text-slate-600">× {qty}</span>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {isBike && (
          <Section title="Bike details">
            <Row label="Bike type" value={String(booking.bikeType || "—")} />
            <Row label="Model" value={String(booking.bikeModel || "—")} />
            <Row label="Number" value={String(booking.bikeNumber || "—")} />
          </Section>
        )}

        <Section title="Price breakdown">
          {isHouse ? (
            <>
              {fareLines.map((line, i) => (
                <Row
                  key={i}
                  label={line.label}
                  value={`${line.discount ? "-" : ""}${formatRupee(Math.abs(line.value))}`}
                  highlight={line.discount}
                />
              ))}
              <div className="my-2 border-t border-slate-200" />
              <Row label="Grand total" value={formatRupee(data.grandTotal)} highlight />
              <Row label="Advance (pay now)" value={formatRupee(data.paymentDueAmount)} highlight />
              <Row
                label="Balance after advance"
                value={formatRupee(Math.max(0, data.grandTotal - data.paymentDueAmount))}
              />
            </>
          ) : (
            <>
              <Row label="Base price" value={formatRupee(coerceNum(booking.basePrice ?? booking.fixedPrice))} />
              {booking.isGSTAdded && (
                <Row label="GST (5%)" value={formatRupee(coerceNum(booking.gstAmount))} />
              )}
              <div className="my-2 border-t border-slate-200" />
              <Row label="Total (pay now)" value={formatRupee(data.paymentDueAmount)} highlight />
            </>
          )}
        </Section>

        {booking.isGSTAdded && (
          <Section title="GST details">
            <Row label="GSTIN" value={String(booking.gstin || "Added")} />
          </Section>
        )}

        <Section title="Customer Details">
          {data.isAdminShare ? (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Full name</label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Mobile</label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <Row label="Name" value={name || "—"} />
              <Row label="Email" value={email || "—"} />
              <Row label="Mobile" value={phone ? `+91 ${phone}` : "—"} />
              <p className="text-xs text-slate-500">Contact details are locked for this booking.</p>
            </div>
          )}
        </Section>

        <Section title="Shifting date & time">
          <ScheduleDateStrip
            selectedDate={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d);
              if (isHouse) setTimeSlot("");
            }}
          />
          {isHouse && (
            <ScheduleTimeSlots selectedSlot={timeSlot} onSelect={setTimeSlot} />
          )}
        </Section>

        {paymentNotice && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {paymentNotice}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={paying}
          onClick={() => void handlePay()}
          className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
        >
          {payButtonLabel}
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          After payment, check the GoShift customer app for full order details.
        </p>
      </div>
    </div>
  );
}
