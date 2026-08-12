import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  coerceNum,
  completeSharedPackersPayment,
  createSharedPackersPaymentOrder,
  fetchSharedPackersBooking,
  formatRupee,
  loadRazorpayScript,
  openRazorpayCheckout,
  type SharedPackersBookingResponse,
} from "@/lib/sharedBookingApi";

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
      <span className={`font-semibold text-right ${highlight ? "text-blue-700" : "text-slate-900"}`}>
        {value}
      </span>
    </div>
  );
}

function epochToDateInput(ms: number): string {
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function dateInputToEpoch(dateStr: string): number {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.getTime();
}

export default function SharedPackersBookingReview() {
  const { token = "" } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SharedPackersBookingResponse | null>(null);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState<{ orderId: string; message: string } | null>(null);

  const [scheduledDate, setScheduledDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
      if (sched > 0) setScheduledDate(epochToDateInput(sched));
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
    push("Base price", "basePrice");
    push("Items price", "itemsPrice");
    push("Packing price", "packingPrice");
    push("Add-on services", "addOnServicesPrice");
    push("Extra pickup charge", "extraPickupCharge");
    push("Distance charge", "distanceCharge");
    push("Peak hours surcharge", "peakHoursSurcharge");
    push("Night charges", "nightChargesSurcharge");
    push("Risk location surcharge", "riskLocationSurcharge");
    push("Floor charge", "floorCharge");
    push("Long distance charge", "longDistancePrice");
    push("Rope pulling", "ropePullingPrice");
    push("Service tier discount", "serviceTierDiscount", true);
    push("Distance discount", "distanceDiscount", true);
    push("Part load CFT discount", "partLoadCftDiscount", true);
    push("Coupon discount", "discount", true);
    if (booking.isCouponApplied && booking.couponCode) {
      lines.push({
        label: `Coupon (${String(booking.couponCode)})`,
        value: coerceNum(booking.discount),
        discount: true,
      });
    }
    if (booking.isGSTAdded) {
      push("GST (5%)", "gstCharges");
      if (!coerceNum(booking.gstCharges)) push("GST (5%)", "gstAmount");
    }
    return lines;
  }, [booking, isHouse]);

  const handlePay = async () => {
    if (!data || paying) return;
    if (data.isAdminShare) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError("Please enter your name, email, and phone number.");
        return;
      }
    }
    if (!scheduledDate || !timeSlot.trim()) {
      setError("Please select shifting date and time.");
      return;
    }

    try {
      setPaying(true);
      setError(null);
      await loadRazorpayScript();

      const orderPayload = await createSharedPackersPaymentOrder({
        token: data.shareToken,
        scheduledDate: dateInputToEpoch(scheduledDate),
        timeSlot: timeSlot.trim(),
        ...(data.isAdminShare
          ? { name: name.trim(), email: email.trim(), phone: phone.trim() }
          : {}),
      });

      const checkout = await openRazorpayCheckout({
        key: orderPayload.razorpayKeyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        orderId: orderPayload.razorpayOrderId,
        name: data.isAdminShare ? name.trim() : name,
        email: data.isAdminShare ? email.trim() : email,
        contact: data.isAdminShare ? phone.trim() : phone,
        description:
          data.paymentDueLabel === "full"
            ? "Bike shifting — full payment"
            : "House shifting — advance payment",
      });

      const completed = await completeSharedPackersPayment({
        token: data.shareToken,
        razorpayOrderId: checkout.razorpay_order_id,
        razorpayPaymentId: checkout.razorpay_payment_id,
        razorpaySignature: checkout.razorpay_signature,
      });

      setSuccess({
        orderId: completed.orderId,
        message:
          completed.message ||
          "Booking confirmed. Please open the GoShift customer app to view your order details.",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-600">
        Loading booking details…
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
          <h1 className="text-xl font-bold text-green-800">Payment successful</h1>
          <p className="mt-3 text-sm text-green-900">{success.message}</p>
          <p className="mt-4 text-sm font-semibold text-slate-700">Order ID: {success.orderId}</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-lg font-bold text-red-800">Unable to open booking</h1>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const payLabel =
    data.paymentDueLabel === "full"
      ? `Pay ${formatRupee(data.paymentDueAmount)}`
      : `Pay advance ${formatRupee(data.paymentDueAmount)}`;

  return (
    <div className="bg-[#EFF6FF] py-8">
      <div className="mx-auto max-w-2xl px-4">
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
              {items.map((item, idx) => (
                <li key={idx} className="flex justify-between gap-3 py-2 text-sm">
                  <span className="text-slate-800">
                    {String(item.name || item.itemName || item.title || "Item")}
                    {item.quantity != null ? ` × ${String(item.quantity)}` : ""}
                  </span>
                  {item.cft != null && (
                    <span className="text-slate-500">{String(item.cft)} CFT</span>
                  )}
                </li>
              ))}
            </ul>
            {coerceNum(booking.totalCFT) > 0 && (
              <Row label="Total CFT" value={String(coerceNum(booking.totalCFT))} />
            )}
          </Section>
        )}

        {isHouse && booking.packingStyle && (
          <Section title="Packing style">
            <Row label="Selected" value={String(booking.packingStyle)} />
            {coerceNum(booking.packingStylePrice) > 0 && (
              <Row label="Packing price" value={formatRupee(coerceNum(booking.packingStylePrice))} />
            )}
          </Section>
        )}

        {isHouse && addOns.length > 0 && (
          <Section title="Add-on services">
            <ul className="space-y-2">
              {addOns.map((addon, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{String(addon.name || addon.title || addon.id || "Add-on")}</span>
                  <span className="font-medium">
                    {formatRupee(coerceNum(addon.price ?? addon.amount))}
                  </span>
                </li>
              ))}
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
              <Row
                label="Advance (pay now)"
                value={formatRupee(data.paymentDueAmount)}
                highlight
              />
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

        <Section title="Your details">
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Time slot</label>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                placeholder="e.g. 10:00"
              />
            </div>
          </div>
        </Section>

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
          {paying ? "Processing…" : payLabel}
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          After payment, check the GoShift customer app for full order details.
        </p>
      </div>
    </div>
  );
}
