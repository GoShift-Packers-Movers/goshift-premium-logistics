import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Truck, Tag, ArrowRight } from "lucide-react";
import {
  fetchPricingAndOffers,
  getPerKmForServiceType,
  applyCouponToFare,
  type WebsiteOffer,
} from "@/lib/websiteApi";

const serviceTypes = ["House Shifting Services", "Bike Shifting Services", "Delivery Services"] as const;

const FALLBACK_PER_KM: Record<string, number> = {
  "House Shifting Services": 35,
  "Bike Shifting Services": 25,
  "Delivery Services": 8,
};

export default function PricingCalculator() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [service, setService] = useState<string>("");
  const [distanceKm, setDistanceKm] = useState<string>("");
  const [coupon, setCoupon] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [pricingAndOffers, setPricingAndOffers] = useState<Awaited<ReturnType<typeof fetchPricingAndOffers>>>(null);

  useEffect(() => {
    fetchPricingAndOffers().then(setPricingAndOffers);
  }, []);

  const handleEstimate = () => {
    const dist = parseFloat(distanceKm);
    if (service && (distanceKm === "" || (Number.isFinite(dist) && dist > 0))) {
      setShowResult(true);
    }
  };

  const getEstimate = (): { low: string; high: string; appliedCoupon: WebsiteOffer | null } => {
    const dist = parseFloat(distanceKm);
    const distance = Number.isFinite(dist) && dist > 0 ? dist : 100;
    const perKm = pricingAndOffers
      ? getPerKmForServiceType(pricingAndOffers.pricing, service)
      : null;
    const rate = perKm ?? FALLBACK_PER_KM[service] ?? 8;
    const fare = Math.round(distance * rate);
    const estimatedFare = Math.round((fare / 100) * 100);

    const offers = pricingAndOffers?.offers ?? [];
    const code = coupon.trim().toUpperCase();
    const appliedCoupon =
      code && offers.find((o) => o.code.toUpperCase() === code) ? (offers.find((o) => o.code.toUpperCase() === code) as WebsiteOffer) : null;

    const { discountedFare } = applyCouponToFare(estimatedFare, appliedCoupon ?? null);
    const low = appliedCoupon ? discountedFare : estimatedFare;
    const high = Math.round((low * 1.15) / 100) * 100;

    return {
      low: low.toLocaleString("en-IN"),
      high: high.toLocaleString("en-IN"),
      appliedCoupon: appliedCoupon ?? null,
    };
  };

  const result = showResult ? getEstimate() : null;

  return (
    <section id="pricing" className="py-1 lg:py-1">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
            Pricing
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Transparent <span className="text-gradient">Price Estimator</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Get an instant estimate based on distance. No hidden charges, no surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-3xl bg-card border border-border/50 shadow-elevated overflow-hidden">
            <div className="bg-hero p-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-gradient">
                <Calculator className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary-foreground">Price Calculator</h3>
                <p className="text-xs text-primary-foreground/50">Distance-based estimate for your service</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Pickup Location
                  </label>
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Drop Location
                  </label>
                  <input
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="e.g. Delhi"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-accent" /> Service Type
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all appearance-none"
                  >
                    <option value="">Select service</option>
                    {serviceTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="e.g. 100"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-accent" /> Coupon Code
                </label>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="e.g. GOSHIFT20"
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              <button
                onClick={handleEstimate}
                disabled={!service}
                className="w-full rounded-xl bg-accent-gradient py-4 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_hsl(24_95%_53%/0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Calculate Estimate
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border p-6 sm:p-8"
              >
                <div className="rounded-2xl bg-secondary/50 p-6 text-center">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Estimated Price Range
                  </p>
                  <div className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                    ₹{result.low} – ₹{result.high}
                  </div>
                  {result.appliedCoupon && (
                    <p className="text-sm text-accent font-medium mt-2">
                      Coupon {result.appliedCoupon.code} applied
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Price is based on distance only. Final quote may vary with items, floor &amp; requirements.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground text-center">
                    Get an exact quote from our team
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                    <input
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                  </div>
                  <button className="w-full rounded-xl bg-navy py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light">
                    Request Callback
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
