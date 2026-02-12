import { motion } from "framer-motion";
import { ArrowRight, Play, Package, MapPin, Truck as TruckIcon } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";
import { useCountUp } from "@/hooks/use-count-up";

function FloatingElement({ children, delay, x, y, duration = 6 }: { children: React.ReactNode; delay: number; x: string; y: string; duration?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref}>
      <div className="font-display text-2xl font-bold text-accent sm:text-3xl">
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <div className="mt-1 text-xs text-primary-foreground/50 sm:text-sm">{label}</div>
    </div>
  );
}

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

      {/* Animated floating 3D-like elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0} x="70%" y="15%" duration={7}>
          <div className="h-20 w-20 rounded-2xl glass-dark flex items-center justify-center shadow-glow rotate-12">
            <Package className="h-8 w-8 text-accent/60" />
          </div>
        </FloatingElement>
        <FloatingElement delay={1.2} x="80%" y="55%" duration={8}>
          <div className="h-16 w-16 rounded-2xl glass-dark flex items-center justify-center rotate-[-8deg]">
            <MapPin className="h-7 w-7 text-accent/50" />
          </div>
        </FloatingElement>
        <FloatingElement delay={0.6} x="65%" y="75%" duration={6}>
          <div className="h-24 w-24 rounded-2xl glass-dark flex items-center justify-center shadow-glow rotate-6">
            <TruckIcon className="h-10 w-10 text-accent/40" />
          </div>
        </FloatingElement>
        <FloatingElement delay={2} x="85%" y="30%" duration={9}>
          <div className="h-12 w-12 rounded-full bg-accent/10 blur-sm" />
        </FloatingElement>
        <FloatingElement delay={1.5} x="55%" y="25%" duration={7}>
          <div className="h-8 w-8 rounded-full bg-accent/15" />
        </FloatingElement>
        {/* Animated route line */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          animate={{ opacity: [0, 0.6, 0], x: [0, 60, 120] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-48 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          animate={{ opacity: [0, 0.4, 0], x: [0, -40, -80] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Decorative blurs */}
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
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px hsl(24 95% 53% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition-colors"
              >
                Get Free Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 rounded-xl glass-dark px-6 py-4 text-base font-medium text-primary-foreground/90 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient">
                  <Play className="h-4 w-4 text-accent-foreground ml-0.5" />
                </span>
                Watch How It Works
              </motion.button>
            </motion.div>

            {/* Trust metrics with count-up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-primary-foreground/10 pt-8"
            >
              <AnimatedStat value={50000} suffix="+" label="Successful Moves" />
              <AnimatedStat value={500} suffix="+" label="Cities Served" />
              <AnimatedStat value={49} suffix="★" label="Customer Rating" />
            </motion.div>
          </div>

          {/* Quick Estimator Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-dark rounded-2xl p-8 shadow-elevated"
            >
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
                  className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <input
                  type="text"
                  placeholder="Drop City"
                  className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <select className="w-full rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/60 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all appearance-none">
                  <option>Select Service Type</option>
                  <option>House Shifting</option>
                  <option>Vehicle Transport</option>
                  <option>Office Relocation</option>
                  <option>Packing & Moving</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-accent-gradient py-3.5 text-sm font-semibold text-accent-foreground shadow-glow"
                >
                  Get Estimate →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
