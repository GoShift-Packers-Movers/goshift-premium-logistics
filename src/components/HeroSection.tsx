import { motion } from "framer-motion";
import { ArrowRight, Play, Calculator, MapPin, Truck, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-logistics.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="GoShift logistics fleet on highway at golden hour"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          width="1600"
          height="900"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-hero opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-accent/5 blur-[80px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm text-primary-foreground/80"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse_glow" />
              India's Fastest Growing Logistics Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Move Smarter.
              <br />
              <span className="text-gradient">Shift Faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-primary-foreground/70 leading-relaxed"
            >
              Premium house shifting, bike shifting and delivery services
              across 500+ cities. Trusted by 50,000+ families for safe,
              on-time relocations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/pricing"
                className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition-all hover:scale-105 hover:shadow-[0_0_50px_hsl(24_95%_53%/0.3)]"
              >
                Get Free Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="group flex items-center gap-3 rounded-xl glass-dark px-6 py-4 text-base font-medium text-primary-foreground/90 transition-all hover:bg-primary-foreground/10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient">
                  <Play className="h-4 w-4 text-accent-foreground ml-0.5" />
                </span>
                Watch How It Works
              </button>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-primary-foreground/10 pt-8"
            >
              {[
                { value: "50K+", label: "Successful Moves" },
                { value: "500+", label: "Cities Served" },
                { value: "4.9★", label: "Customer Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-accent sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-primary-foreground/50 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Price Estimator Card (Hero) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="max-w-md rounded-3xl bg-white shadow-elevated overflow-hidden ml-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-navy-dark to-navy px-6 py-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-gradient text-accent-foreground shadow-glow">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent/80">
                    Pricing
                  </p>
                  <h3 className="font-display text-lg font-bold text-white">
                    Transparent Price Estimator
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    Get an instant estimate. No hidden charges, no surprises.
                  </p>
                </div>
              </div>

              {/* Form body */}
              <div className="bg-white px-6 pb-6 pt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Pickup Location */}
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span>Pickup Location</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition"
                    />
                  </div>

                  {/* Drop Location */}
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span>Drop Location</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Delhi"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      <Truck className="h-3.5 w-3.5 text-accent" />
                      <span>Service Type</span>
                    </div>
                    <select
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-700 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select service
                      </option>
                      <option>House Shifting Services</option>
                      <option>Bike Shifting Services</option>
                      <option>Delivery Services</option>
                    </select>
                  </div>

                  {/* Coupon Code */}
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      <Tag className="h-3.5 w-3.5 text-accent" />
                      <span>Coupon Code</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. GOSHIFT20"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition"
                    />
                  </div>
                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-gradient py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.02]">
                  Calculate Estimate
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
