import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-hero relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-accent/10 blur-[80px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl leading-tight"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Ready to Make Your
            <br />
            <span className="text-gradient">Next Move?</span>
          </motion.h2>
          <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
            Join 50,000+ satisfied customers. Get your free estimate today and experience the GoShift difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px hsl(24 95% 53% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow animate-pulse_glow"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="tel:+911800123456"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl glass-dark px-8 py-4 text-base font-medium text-primary-foreground/90 transition-colors"
            >
              <Phone className="h-4 w-4 text-accent" />
              1800-123-456
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
