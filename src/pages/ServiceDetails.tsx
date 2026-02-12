import PricingCalculator from "@/components/PricingCalculator";
import FAQSection from "@/components/FAQSection";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CheckCircle2, Truck, Clock, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";

const serviceConfigs = {
  "house-shifting": {
    title: "House Shifting",
    heroImage:
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "End-to-end home relocation with expert packing and careful handling.",
  },
  "office-relocation": {
    title: "Office Relocation",
    heroImage:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Fast, structured office moves with minimal downtime.",
  },
  "vehicle-transport": {
    title: "Vehicle Transport",
    heroImage:
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Door-to-door vehicle transport with GPS tracking.",
  },
} as const;

const steps = [
  { icon: Truck, title: "Pickup & Packing", text: "Team arrives on time, packs and labels all items carefully." },
  { icon: Clock, title: "In-Transit Care", text: "GPS-tracked vehicles with shock-absorbing arrangements." },
  { icon: ShieldCheck, title: "Safe Delivery", text: "Unloading, placement, and basic setup at destination." },
];

const benefits = [
  "Dedicated move coordinator for every booking.",
  "Verified crew with ID checks and training.",
  "Standardised packing material across all cities.",
  "Damage protection options for high-value items.",
  "Live tracking and proactive status updates.",
  "Flexible scheduling for night / weekend moves.",
];

export default function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: keyof typeof serviceConfigs }>();
  const config = (slug && serviceConfigs[slug]) || serviceConfigs["house-shifting"];

  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title={`${config.title} Service`}
        description={config.tagline}
        canonical={`/services/${slug || "house-shifting"}`}
        type="article"
      />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={config.heroImage}
              alt={config.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
                GoShift Service
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{config.title}</h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl">{config.tagline}</p>
            </motion.div>
          </div>
        </section>

        {/* Description + Steps */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How this service works</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every relocation is different. GoShift combines a proven operating playbook with city-level expertise
                to move your belongings safely, on time, and with full visibility. From survey to delivery, a dedicated
                move coordinator stays with you at every step.
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-2xl bg-card border border-border/60 p-5 shadow-card"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Split image / key points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/60 shadow-card overflow-hidden"
            >
              <div className="h-40 md:h-48 overflow-hidden">
                <motion.img
                  src={config.heroImage}
                  alt={`${config.title} operations`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Why GoShift for {config.title.toLowerCase()}?</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing estimator */}
        <section className="py-12 lg:py-16 bg-muted/40">
          <div className="container mx-auto px-6">
            <PricingCalculator />
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />
      </main>
    </div>
  );
}
