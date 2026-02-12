import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl leading-tight">
            Ready to Make Your
            <br />
            <span className="text-gradient">Next Move?</span>
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
            Join 50,000+ satisfied customers. Get your free estimate today and experience the GoShift difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition-all hover:scale-105"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+911800123456"
              className="flex items-center gap-2 rounded-xl glass-dark px-8 py-4 text-base font-medium text-primary-foreground/90 transition-all hover:bg-primary-foreground/10"
            >
              <Phone className="h-4 w-4 text-accent" />
              1800-123-456
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
