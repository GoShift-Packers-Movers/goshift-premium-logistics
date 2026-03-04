/**
 * Website API client for pricing and offers from admin (via Cloud Function).
 * Uses VITE_APP_WEBSITE_API_URL for the getWebsitePricingAndOffers endpoint.
 */

const BASE_URL = import.meta.env.VITE_APP_WEBSITE_API_URL ?? "";

const DEBUG = true; // set to false to disable [GoShift Offers] logs
function debug(...args: unknown[]) {
  if (DEBUG) console.log("[GoShift Offers API]", ...args);
}

export interface WebsitePricing {
  deliveryPerKm: number | null;
  packersPerKm: number | null;
  bikeShiftingPerKm: number | null;
}

export interface WebsiteOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number | null;
  validUntil: string;
}

export interface WebsitePricingAndOffersResponse {
  pricing: WebsitePricing;
  offers: WebsiteOffer[];
}

let cached: WebsitePricingAndOffersResponse | null = null;

export async function fetchPricingAndOffers(): Promise<WebsitePricingAndOffersResponse | null> {
  debug("fetchPricingAndOffers called. BASE_URL:", BASE_URL || "(empty - set VITE_APP_WEBSITE_API_URL in .env)");
  if (!BASE_URL) {
    debug("Abort: BASE_URL is empty. Add VITE_APP_WEBSITE_API_URL to website/.env and restart dev server.");
    return null;
  }
  // Only use cache when we have offers (avoid caching empty list so new admin coupons show after refresh)
  if (cached && cached.offers?.length > 0) {
    debug("Returning cached data, offers count:", cached.offers.length);
    return cached;
  }
  const url = `${BASE_URL.replace(/\/$/, "")}/getWebsitePricingAndOffers`;
  debug("Fetching:", url);
  try {
    const res = await fetch(url);
    debug("Response status:", res.status, res.statusText, "ok:", res.ok);
    if (!res.ok) {
      const text = await res.text();
      debug("Response not ok. Body:", text.slice(0, 200));
      return null;
    }
    const data = (await res.json()) as WebsitePricingAndOffersResponse;
    debug("Parsed data. offers count:", data?.offers?.length ?? 0, "raw offers:", data?.offers);
    if (data?.offers?.length > 0) cached = data;
    else cached = null;
    return data;
  } catch (err) {
    debug("Fetch error:", err);
    return null;
  }
}

/**
 * Get per-km rate for website service type (distance-only, no base).
 */
export function getPerKmForServiceType(
  pricing: WebsitePricing | null,
  serviceType: string
): number | null {
  if (!pricing) return null;
  if (serviceType === "Delivery Services") return pricing.deliveryPerKm;
  if (serviceType === "House Shifting Services") return pricing.packersPerKm;
  if (serviceType === "Bike Shifting Services") return pricing.bikeShiftingPerKm;
  return null;
}

/**
 * Apply coupon discount to a fare (website estimate).
 */
export function applyCouponToFare(
  fare: number,
  coupon: WebsiteOffer | null
): { discountedFare: number; discountAmount: number } {
  if (!coupon || fare <= 0) return { discountedFare: fare, discountAmount: 0 };
  if (coupon.minOrderValue > 0 && fare < coupon.minOrderValue) return { discountedFare: fare, discountAmount: 0 };

  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = fare * (coupon.discountValue / 100);
    if (coupon.maxDiscount != null && coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else {
    discountAmount = Math.min(coupon.discountValue, fare);
  }
  return { discountedFare: Math.max(0, fare - discountAmount), discountAmount };
}
