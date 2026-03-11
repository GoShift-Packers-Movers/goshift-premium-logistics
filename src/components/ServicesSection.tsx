import { motion } from "framer-motion";
import { Home, Bike, Package, Truck, ArrowRight, Route } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Entire House Shifting - Within City",
    description: "Make your local move effortless with our End-to-End City Shifting. We provide expert packing, secure transport, and professional reinstallation of electrical appliances and fittings for a move-in-ready home experience.",
    color: "from-accent/10 to-accent/5",
  },
  {
    icon: Home,
    title: "Entire House Shifting - Between City",
    description: "Relocate stress-free with our Full House Shifting Service. We provide premium multi-layer packing and comprehensive insurance for your belongings, ensuring a secure, fully protected journey between cities with guaranteed delivery.",
    color: "from-navy/10 to-navy/5",
  },
  {
    icon: Package,
    title: "Part Load House Shifting",
    description: "Move between cities affordably with our Part Load Shifting. We offer secure multi-layer packing and shared truck space to ensure on-time delivery while keeping your moving costs low.",
    color: "from-accent/10 to-accent/5",
  },
  {
    icon: Bike,
    title: "Bike Shifting Service",
    description: "Relocate your bike across cities with ease. Our professional bike shifting service ensures scratch-free transport using specialized carriers, secure packaging.",
    color: "from-navy/10 to-navy/5",
  },
  {
    icon: Truck,
    title: "Within City Truck",
    description: "Get reliable Within-City Truck Services for all your local transport needs. We guarantee on-time pickup and swift delivery, providing professional drivers and right-sized vehicles for a seamless moving experience.",
    color: "from-accent/10 to-accent/5",
  },
  {
    icon: Truck,
    title: "Outside City Truck",
    description: "Long-Distance Trucking Services. We specialize in inter-city transport, providing secure handling, real-time GPS tracking, and a commitment to on-time pickup and delivery All Over India.",
    color: "from-navy/10 to-navy/5",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
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
            From house shifting and bike shifting to local and outside-city deliveries — we handle it all with care,
            precision, and transparency.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative rounded-2xl bg-card p-8 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:border-accent/20"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color}`}>
                <service.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
