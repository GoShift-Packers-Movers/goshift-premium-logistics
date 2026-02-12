import { motion } from "framer-motion";
import { Shield, Clock, MapPin, Headphones, BadgeCheck, Banknote } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Fully Insured", desc: "Every move covered with comprehensive transit insurance up to ₹10 Lakhs." },
  { icon: Clock, title: "On-Time Delivery", desc: "98.7% on-time delivery rate with real-time tracking and live updates." },
  { icon: MapPin, title: "500+ Cities", desc: "Pan-India network spanning 500+ cities with dedicated local teams." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support with dedicated move managers." },
  { icon: BadgeCheck, title: "Verified Team", desc: "Background-verified professionals with 5+ years of experience." },
  { icon: Banknote, title: "No Hidden Costs", desc: "Transparent pricing with detailed breakdowns. What you see is what you pay." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-hero relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
            Why GoShift
          </span>
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
            Trusted by <span className="text-gradient">50,000+ Families</span>
          </h2>
          <p className="mt-4 text-primary-foreground/60 text-lg">
            We don't just move your belongings — we move your peace of mind.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-dark rounded-2xl p-7 transition-all duration-300 hover:bg-primary-foreground/10"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gradient shadow-glow">
                <r.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-primary-foreground/50 leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
