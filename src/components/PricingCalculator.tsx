import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Truck, Tag, ArrowRight } from "lucide-react";

const serviceTypes = ["House Shifting", "Office Relocation", "Vehicle Transport", "Packing Only", "International Moving"];

export default function PricingCalculator() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [service, setService] = useState("");
  const [coupon, setCoupon] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleEstimate = () => {
    if (pickup && drop && service) {
      setShowResult(true);
    }
  };

  const getEstimate = () => {
    const base = service === "Vehicle Transport" ? 4000 : service === "International Moving" ? 50000 : 8000;
    const assumedDistance = 100; // km, simple average since distance field is removed
    const low = Math.round((base + assumedDistance * 8) / 100) * 100;
    const high = Math.round((low * 1.4) / 100) * 100;
    return { low: low.toLocaleString("en-IN"), high: high.toLocaleString("en-IN") };
  };

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
            Get an instant estimate. No hidden charges, no surprises.
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
            {/* Header */}
            <div className="bg-hero p-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-gradient">
                <Calculator className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary-foreground">Price Calculator</h3>
                <p className="text-xs text-primary-foreground/50">Fill in your details for an instant estimate</p>
              </div>
            </div>

            {/* Form */}
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
                    <Tag className="h-3.5 w-3.5 text-accent" /> Coupon Code
                  </label>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="e.g. GOSHIFT20"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleEstimate}
                className="w-full rounded-xl bg-accent-gradient py-4 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_hsl(24_95%_53%/0.3)] flex items-center justify-center gap-2"
              >
                Calculate Estimate
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Result */}
            {showResult && (
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
                    ₹{getEstimate().low} – ₹{getEstimate().high}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Final price may vary based on items, floor, and special requirements
                  </p>
                </div>

                {/* Lead capture */}
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
