import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "house-shifting",
    name: "House Shifting Services",
    image:
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Apartment and villa shifting with professional packing, careful loading and organised setup at your new home.",
  },
  {
    id: "office-relocation",
    name: "Bike Shifting Services",
    image:
      "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Doorstep bike pickup, secure packing and transport with ramps and wheel chocks designed for two-wheelers.",
  },
  {
    id: "vehicle-transport",
    name: "Packers and Movers Services",
    image:
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "End-to-end packers and movers support for full-house moves, partial moves and small offices in your city.",
  },
  {
    id: "warehouse-storage",
    name: "Delivery Services",
    image:
      "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Point-to-point deliveries using mini trucks and tempos for furniture, appliances, and store orders.",
  },
  {
    id: "packing-moving",
    name: "Intra-City Delivery Service",
    image:
      "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Fast within-city pickup and drop across popular neighbourhoods with slot-based scheduling.",
  },
  {
    id: "international-moving",
    name: "Outside City Services",
    image:
      "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Planned inter-city movements with dedicated vehicles, line-haul routes and proactive tracking updates.",
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
                Moving &amp; Delivery Services Built for Cities
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore GoShift&apos;s core services across house shifting, bike shifting, packers and movers, and
                within-city and outside-city delivery solutions.
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
