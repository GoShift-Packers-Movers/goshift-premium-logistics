import { motion } from "framer-motion";
import { Home, Building2, Car, Warehouse, Package, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  { icon: Home, title: "House Shifting", description: "End-to-end home relocation with professional packing, loading, and setup at your new place.", color: "from-accent/10 to-accent/5" },
  { icon: Building2, title: "Office Relocation", description: "Minimal downtime corporate moves with IT equipment handling and furniture reassembly.", color: "from-navy/10 to-navy/5" },
  { icon: Car, title: "Vehicle Transport", description: "Safe car and bike transport via enclosed carriers with real-time GPS tracking.", color: "from-accent/10 to-accent/5" },
  { icon: Warehouse, title: "Warehouse Storage", description: "Secure, climate-controlled storage solutions for short and long-term needs.", color: "from-navy/10 to-navy/5" },
  { icon: Package, title: "Packing & Moving", description: "Premium multi-layer packing with insurance coverage for fragile and valuable items.", color: "from-accent/10 to-accent/5" },
  { icon: Globe, title: "International Moving", description: "Door-to-door international relocation with customs clearance and documentation support.", color: "from-navy/10 to-navy/5" },
];

function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.2s ease-out" }}
      className="group relative rounded-2xl bg-card p-8 shadow-card border border-border/50 hover:shadow-elevated hover:border-accent/20"
    >
      <motion.div
        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color}`}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <service.icon className="h-6 w-6 text-accent" />
      </motion.div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
      <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
        Learn More
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
            Our Services
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="text-gradient">Move Safely</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From local house shifting to international relocations — we handle it all with care, precision, and transparency.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
