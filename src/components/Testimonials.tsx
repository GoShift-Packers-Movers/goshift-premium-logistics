import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Relocated from Mumbai to Pune",
    text: "GoShift made our move completely stress-free. The team was professional, on-time, and handled our fragile items with incredible care. Highly recommend!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Office Move — Bangalore",
    text: "We relocated our 50-person office over a weekend with zero downtime. GoShift's planning and execution were flawless. Our IT equipment arrived safely.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Vehicle Transport — Delhi to Chennai",
    text: "Shipped my car across the country and received it in perfect condition. The GPS tracking gave me real-time peace of mind. Amazing service!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl bg-card p-7 shadow-card border border-border/50"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/15" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-gradient flex items-center justify-center text-sm font-bold text-accent-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
