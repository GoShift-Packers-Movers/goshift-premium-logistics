import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, MapPin, Truck, Home as HomeIcon, Tag, ArrowRight, Sparkles } from "lucide-react";

const serviceTypes = ["House Shifting", "Office Relocation", "Vehicle Transport", "Packing Only", "International Moving"];
const houseTypes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa/Bungalow"];

export default function PricingCalculator() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [service, setService] = useState("");
  const [houseType, setHouseType] = useState("");
  const [distance, setDistance] = useState("");
  const [coupon, setCoupon] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleEstimate = () => {
    if (pickup && drop && service) {
      setShowResult(false);
      setIsCalculating(true);
      setCouponApplied(!!coupon.trim());
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
      }, 1200);
    }
  };

  const getEstimate = () => {
    const base = service === "Vehicle Transport" ? 4000 : service === "International Moving" ? 50000 : 8000;
    const multiplier = houseType === "4+ BHK" || houseType === "Villa/Bungalow" ? 3 : houseType === "3 BHK" ? 2.2 : houseType === "2 BHK" ? 1.6 : 1;
    const dist = parseInt(distance) || 100;
    const low = Math.round((base * multiplier + dist * 8) / 100) * 100;
    const high = Math.round(low * 1.4 / 100) * 100;
    return { low: low.toLocaleString("en-IN"), high: high.toLocaleString("en-IN") };
  };

  return (
    <section id="pricing" className="py-24 lg:py-32">
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
                  <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Mumbai"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Drop Location
                  </label>
                  <input value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="e.g. Delhi"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-accent" /> Service Type
                  </label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all appearance-none">
                    <option value="">Select service</option>
                    {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <HomeIcon className="h-3.5 w-3.5 text-accent" /> House Type
                  </label>
                  <select value={houseType} onChange={(e) => setHouseType(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all appearance-none">
                    <option value="">Select type</option>
                    {houseTypes.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Distance (km)</label>
                  <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g. 1400"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-accent" /> Coupon Code
                  </label>
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="e.g. GOSHIFT20"
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                </div>
              </div>

              <motion.button
                onClick={handleEstimate}
                whileHover={{ scale: 1.02, boxShadow: "0 0 50px hsl(24 95% 53% / 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-accent-gradient py-4 text-sm font-bold text-accent-foreground shadow-glow flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <motion.div className="flex items-center gap-2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                    <div className="h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
                    Calculating...
                  </motion.div>
                ) : (
                  <>Calculate Estimate <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>
            </div>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="rounded-2xl bg-secondary/50 p-6 text-center relative overflow-hidden"
                    >
                      {/* Confetti for coupon */}
                      {couponApplied && (
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute h-2 w-2 rounded-full"
                              style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: "-10px",
                                backgroundColor: ["hsl(24 95% 53%)", "hsl(222 60% 16%)", "hsl(45 95% 55%)", "hsl(160 60% 50%)"][i % 4],
                              }}
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 200, opacity: 0, rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
                              transition={{ duration: 1.2 + Math.random() * 0.8, delay: Math.random() * 0.3, ease: "easeOut" }}
                            />
                          ))}
                        </div>
                      )}
                      {couponApplied && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-1.5 mb-3"
                        >
                          <Sparkles className="h-4 w-4 text-accent" />
                          <span className="text-xs font-semibold text-accent">Coupon Applied!</span>
                        </motion.div>
                      )}
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Estimated Price Range
                      </p>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="font-display text-3xl font-extrabold text-foreground sm:text-4xl"
                      >
                        ₹{getEstimate().low} – ₹{getEstimate().high}
                      </motion.div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Final price may vary based on items, floor, and special requirements
                      </p>
                    </motion.div>

                    {/* Lead capture */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 space-y-3"
                    >
                      <p className="text-sm font-semibold text-foreground text-center">
                        Get an exact quote from our team
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input placeholder="Your Name" className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                        <input placeholder="Phone Number" className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl bg-navy py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light"
                      >
                        Request Callback
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
