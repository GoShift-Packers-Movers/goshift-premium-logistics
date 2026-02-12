import PricingCalculator from "@/components/PricingCalculator";
import FAQSection from "@/components/FAQSection";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CheckCircle2, Truck, Clock, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";

const serviceConfigs = {
  "house-shifting": {
    title: "House Shifting Services",
    heroImage:
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Complete house shifting with premium packing, organised loading and careful placement at destination.",
    howTitle: "How house shifting with GoShift works",
    howIntro:
      "House shifting is more than moving boxes. Our teams follow a room-wise packing plan, label everything clearly and use multi-layer protection for furniture, appliances and fragile items so your new home is ready faster.",
    steps: [
      {
        icon: Truck,
        title: "Pre-move planning",
        text: "We confirm inventory, floor access, parking and elevator availability so the crew arrives prepared with the right vehicle and material.",
      },
      {
        icon: Clock,
        title: "Packing & loading",
        text: "Room-wise packing with labels, disassembly of large furniture where required and safe loading into the truck with weight-balanced stacking.",
      },
      {
        icon: ShieldCheck,
        title: "Delivery & setup",
        text: "Unloading as per room plan, basic reassembly of furniture and collection of packing debris so your home feels settled quickly.",
      },
    ],
    benefits: [
      "Dedicated move coordinator for every house shifting booking.",
      "Standard house shifting checklists so nothing is missed on move day.",
      "Special care for kitchen items, glassware and electronics.",
      "Crews trained to work with apartment associations and gated communities.",
      "Transparent pricing with clear inclusions and exclusions.",
    ],
    gallery: [
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7464703/pexels-photo-7464703.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "office-relocation": {
    title: "Bike Shifting Services",
    heroImage:
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Two-wheeler relocation with doorstep pickup, protective packing and secure bike cradles.",
    howTitle: "How bike shifting with GoShift works",
    howIntro:
      "Your bike is more than a vehicle. Our bike shifting workflow focuses on secure packing, careful loading and safe tying so your two-wheeler reaches the destination without scratches or leaks.",
    steps: [
      {
        icon: Truck,
        title: "Vehicle inspection",
        text: "We record basic bike condition, note accessories and check for existing dents before packing begins.",
      },
      {
        icon: Clock,
        title: "Protective packing",
        text: "Handlebars, mirrors and delicate panels are wrapped with foam, stretch film and in many cases corrugated sheets for extra safety.",
      },
      {
        icon: ShieldCheck,
        title: "Safe loading & tying",
        text: "Bikes are loaded using ramps, placed in dedicated channels or racks and tied with multiple straps to prevent movement during transit.",
      },
    ],
    benefits: [
      "Doorstep pickup and delivery for most bike shifting routes.",
      "Multi-layer packing designed specifically for two-wheelers.",
      "Secure tying inside the carrier to avoid falls and scratches.",
      "Transit updates shared proactively by your move coordinator.",
      "Options for standard and premium protection based on bike value.",
    ],
    gallery: [
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/593172/pexels-photo-593172.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1006104/pexels-photo-1006104.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "vehicle-transport": {
    title: "Packers and Movers Services",
    heroImage:
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "End-to-end packers and movers solutions for full-house moves and compact city moves.",
    howTitle: "How our packers and movers service works",
    howIntro:
      "From cartons and bubble wrap to trained manpower and vehicles, GoShift provides a complete packers and movers solution so you do not have to coordinate multiple vendors.",
    steps: [
      {
        icon: Truck,
        title: "Survey & planning",
        text: "We estimate required cartons, packing material and crew size based on the number of rooms and special items.",
      },
      {
        icon: Clock,
        title: "Systematic packing",
        text: "Items are packed category-wise with clear labels so cartons are easy to identify and unpack at destination.",
      },
      {
        icon: ShieldCheck,
        title: "Move execution",
        text: "Loading, transport and unloading are coordinated by a single move coordinator, minimising confusion at both ends.",
      },
    ],
    benefits: [
      "Single vendor responsible for complete packers and movers scope.",
      "Standardised packing material and methods across cities.",
      "Experienced supervisors to guide crews on complex moves.",
      "Flexible plans for full-house, partial and small moves.",
      "Damage protection options available for high-value consignments.",
    ],
    gallery: [
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5025660/pexels-photo-5025660.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5025665/pexels-photo-5025665.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "warehouse-storage": {
    title: "Delivery Services",
    heroImage:
      "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "On-demand delivery services using mini trucks and tempos for furniture, appliances and store orders.",
    howTitle: "How GoShift delivery services work",
    howIntro:
      "Whether you are moving a single sofa, delivering a store order or shifting a few boxes, our delivery services give you the right-sized vehicle with loading support where needed.",
    steps: [
      {
        icon: Truck,
        title: "Job assessment",
        text: "You share pickup and drop points along with what needs to be moved so we can suggest the ideal mini truck or tempo.",
      },
      {
        icon: Clock,
        title: "Slot confirmation",
        text: "Based on traffic patterns in your city, we confirm a suitable time slot to minimise delays and loading issues.",
      },
      {
        icon: ShieldCheck,
        title: "Pickup & delivery",
        text: "The assigned driver reaches the origin, assists with loading as per scope and ensures safe delivery at the drop location.",
      },
    ],
    benefits: [
      "On-demand mini trucks and tempos for small and medium loads.",
      "Transparent pricing shared up front based on distance and effort.",
      "Optional helpers available for heavy or bulky items.",
      "Support for store-to-home, home-to-storage and reverse logistics.",
      "Real-time coordination with drivers through your move coordinator.",
    ],
    gallery: [
      "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5025631/pexels-photo-5025631.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "packing-moving": {
    title: "Intra-City Delivery Service",
    heroImage:
      "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Within-city pickup and drop across key neighbourhoods with time-slot based planning.",
    howTitle: "How intra-city delivery works",
    howIntro:
      "Intra-city delivery is built for regular movements inside the same city — from marketplace sellers and D2C brands to individuals who need trusted last-mile support.",
    steps: [
      {
        icon: Truck,
        title: "Route planning",
        text: "We plan the best sequence for multiple pickups and drops so your intra-city route stays efficient.",
      },
      {
        icon: Clock,
        title: "Time-slot execution",
        text: "Deliveries are scheduled in defined time windows, keeping building access and traffic patterns in mind.",
      },
      {
        icon: ShieldCheck,
        title: "Proof of delivery",
        text: "Our partners capture basic proof of delivery and share status updates so you always know what has been completed.",
      },
    ],
    benefits: [
      "Ideal for sellers, brands and individuals with frequent city movements.",
      "Single partner for multiple pickup and drop points.",
      "Time-slot based execution to respect building and customer constraints.",
      "Support for fragile and high-value items with extra care instructions.",
      "Simple escalation paths if any delivery requires attention.",
    ],
    gallery: [
      "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4484072/pexels-photo-4484072.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5025642/pexels-photo-5025642.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "international-moving": {
    title: "Outside City Services",
    heroImage:
      "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Inter-city transport services with planned routes, dedicated vehicles and proactive tracking.",
    howTitle: "How outside city services work",
    howIntro:
      "For moves that cross city boundaries, GoShift relies on planned departures, verified long-haul partners and proactive tracking so your belongings travel safely over longer distances.",
    steps: [
      {
        icon: Truck,
        title: "Route & mode selection",
        text: "We help you choose between shared loads and dedicated vehicles based on volume, budget and urgency.",
      },
      {
        icon: Clock,
        title: "Scheduled departure",
        text: "Your consignment is aligned with a confirmed departure slot so you know when it will leave the origin city.",
      },
      {
        icon: ShieldCheck,
        title: "Tracked transit & delivery",
        text: "Wherever possible, vehicles are GPS-enabled and we share updates until unloading is completed at the destination.",
      },
    ],
    benefits: [
      "Support for both part-load and full-truck inter-city movements.",
      "Defined transit time windows shared before you confirm.",
      "Coordinated handover between origin and destination teams.",
      "Damage protection options available for long-distance moves.",
      "Dedicated escalation paths in case a route faces delays.",
    ],
    gallery: [
      "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
} as const;

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
              alt={`GoShift ${config.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="1600"
              height="900"
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
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {config.howTitle ?? "How this service works"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {config.howIntro ??
                  "GoShift combines a proven operating playbook with city-level expertise to move your belongings safely, on time, and with full visibility."}
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {config.steps.map((step, index) => (
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
                  alt={`GoShift ${config.title} operations`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Why GoShift for {config.title.toLowerCase()}?</h3>
                <ul className="space-y-2">
                  {config.benefits.map((benefit) => (
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

        {/* Service gallery */}
        {config.gallery && (
          <section className="pb-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Service gallery</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A quick glimpse into how GoShift handles {config.title.toLowerCase()} on the ground — from packing
                  and loading to vehicle arrangements and delivery.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {config.gallery.map((src, index) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card"
                  >
                    <img
                      src={src}
                      alt={`GoShift ${config.title} example ${index + 1}`}
                      loading="lazy"
                      className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <FAQSection />
      </main>
    </div>
  );
}
