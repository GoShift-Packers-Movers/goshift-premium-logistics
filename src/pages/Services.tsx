import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "house-shifting",
    name: "House Shifting",
    image:
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "End-to-end home relocation with expert packing, safe loading, GPS-tracked transit, and careful setup at your new home.",
  },
  {
    id: "office-relocation",
    name: "Office Relocation",
    image:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Planned corporate moves with IT equipment handling, weekend migrations, and minimal downtime for your teams.",
  },
  {
    id: "vehicle-transport",
    name: "Vehicle Transport",
    image:
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Enclosed car carriers, bike cradles, and real-time tracking to move your vehicles safely across cities.",
  },
  {
    id: "warehouse-storage",
    name: "Warehouse Storage",
    image:
      "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Short and long-term storage with 24/7 CCTV, fire safety, and SKU-level inventory management options.",
  },
  {
    id: "packing-moving",
    name: "Packing & Moving",
    image:
      "https://images.pexels.com/photos/7464703/pexels-photo-7464703.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Premium multi-layer packing, labelling, and insured movement for fragile and high-value items.",
  },
  {
    id: "international-moving",
    name: "International Moving",
    image:
      "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Door-to-door global relocations with customs documentation, sea & air freight options, and destination support.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1 + i * 0.05, ease: "easeOut" },
  }),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl"
            >
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
                Services
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                End-to-End Logistics &amp; Shifting Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore everything GoShift offers across home shifting, office relocations, vehicle moves,
                storage, and more – all designed to keep your move stress-free.
              </p>
            </motion.div>
          </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => (
                <motion.article
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                    <motion.h2
                      className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-primary-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      {service.name}
                    </motion.h2>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <a
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
      </section>
    </div>
  );
}
