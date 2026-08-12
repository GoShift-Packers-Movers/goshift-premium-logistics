/**
 * Shared Packers & Movers booking link API (Cloud Functions HTTP).
 * Uses the same base URL as VITE_APP_WEBSITE_API_URL.
 */

const BASE_URL = import.meta.env.VITE_APP_WEBSITE_API_URL ?? "";

function apiUrl(path: string): string {
  return `${BASE_URL.replace(/\/$/, "")}${path}`;
}

export interface SharedBookingPersonalDetails {
  name: string;
  email: string;
  phone: string;
}

export interface SharedPackersBookingResponse {
  shareToken: string;
  bookingType: "house_shifting" | "bike_shifting";
  isAdminShare: boolean;
  bookingData: Record<string, unknown>;
  paymentDueAmount: number;
  paymentDueLabel: "advance" | "full";
  grandTotal: number;
  personalDetails: SharedBookingPersonalDetails | null;
  orderId: string;
  razorpayKeyId: string;
}

export async function fetchSharedPackersBooking(
  token: string,
): Promise<SharedPackersBookingResponse> {
  const url = `${apiUrl("/getSharedPackersBooking")}?token=${encodeURIComponent(token)}`;
  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || "Failed to load booking");
  }
  return body as SharedPackersBookingResponse;
}

export interface CreateSharedPaymentOrderRequest {
  token: string;
  scheduledDate?: number;
  timeSlot?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface CreateSharedPaymentOrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
  shareToken: string;
}

export async function createSharedPackersPaymentOrder(
  payload: CreateSharedPaymentOrderRequest,
): Promise<CreateSharedPaymentOrderResponse> {
  const res = await fetch(apiUrl("/createSharedPackersBookingRazorpayOrder"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || "Failed to start payment");
  }
  return body as CreateSharedPaymentOrderResponse;
}

export interface CompleteSharedPaymentRequest {
  token: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface CompleteSharedPaymentResponse {
  success: boolean;
  orderId: string;
  userId?: string;
  message?: string;
  alreadyProcessed?: boolean;
}

export async function completeSharedPackersPayment(
  payload: CompleteSharedPaymentRequest,
): Promise<CompleteSharedPaymentResponse> {
  const res = await fetch(apiUrl("/completeSharedPackersBookingPayment"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || "Payment verification failed");
  }
  return body as CompleteSharedPaymentResponse;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

export function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    ) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true" && window.Razorpay) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => {
        existing.dataset.loaded = "true";
        resolve();
      });
      existing.addEventListener("error", () => reject(new Error("Razorpay script failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Razorpay script failed"));
    document.body.appendChild(script);
  });
}

export class PaymentCancelledError extends Error {
  constructor() {
    super("Payment cancelled");
    this.name = "PaymentCancelledError";
  }
}

export function openRazorpayCheckout(options: {
  key: string;
  amount: number;
  currency: string;
  orderId: string;
  name?: string;
  email?: string;
  contact?: string;
  description?: string;
}): Promise<{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}> {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay not loaded"));
      return;
    }
    const rzp = new window.Razorpay({
      key: options.key,
      amount: options.amount,
      currency: options.currency,
      order_id: options.orderId,
      name: "GoShift",
      description: options.description || "Packers & Movers booking",
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.contact,
      },
      theme: { color: "#2563EB" },
      retry: { enabled: true, max_count: 3 },
      handler: (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => resolve(response),
      modal: {
        confirm_close: true,
        ondismiss: () => reject(new PaymentCancelledError()),
      },
    });
    rzp.on("payment.failed", (response: { error?: { description?: string } }) => {
      const msg = response?.error?.description?.trim();
      reject(new Error(msg || "Payment failed. Please try again."));
    });
    rzp.open();
  });
}

function coerceNum(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[₹,\s]/g, ""));
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

export function formatRupee(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export { coerceNum };
