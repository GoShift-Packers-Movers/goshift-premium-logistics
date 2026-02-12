import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

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
              Premium house shifting, vehicle transport & logistics services
              across 500+ cities. Trusted by 50,000+ families for safe,
              on-time relocations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#pricing"
                className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition-all hover:scale-105 hover:shadow-[0_0_50px_hsl(24_95%_53%/0.3)]"
              >
                Get Free Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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

          {/* Quick Estimator Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-dark rounded-2xl p-8 shadow-elevated">
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">
                Quick Price Estimate
              </h3>
              <p className="text-sm text-primary-foreground/50 mb-6">
                Get an instant estimate for your move
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Pickup City"
                  className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Drop City"
                  className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
                <select className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/60 focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                  <option>Select Service Type</option>
                  <option>House Shifting</option>
                  <option>Vehicle Transport</option>
                  <option>Office Relocation</option>
                  <option>Packing & Moving</option>
                </select>
                <button className="w-full rounded-xl bg-accent-gradient py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.02]">
                  Get Estimate →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
