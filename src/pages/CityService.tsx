import FAQSection from "@/components/FAQSection";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { MapPin, Truck, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";

const cityConfigs: Record<
  string,
  {
    name: string;
    heroImage: string;
    intro: string;
    popularAreas: string[];
  }
> = {
  chennai: {
    name: "Chennai",
    heroImage:
      "https://images.pexels.com/photos/10074272/pexels-photo-10074272.jpeg?auto=compress&cs=tinysrgb&w=1600",
    intro:
      "Door-to-door shifting across Chennai with crews who understand city traffic, parking, and apartment logistics.",
    popularAreas: ["Velachery", "Anna Nagar", "OMR & ECR", "T. Nagar", "Tambaram"],
  },
  coimbatore: {
    name: "Coimbatore",
    heroImage:
      "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1600",
    intro:
      "Fast, reliable moves across Coimbatore with special handling for gated communities and industrial clusters.",
    popularAreas: ["RS Puram", "Gandhipuram", "Saibaba Colony", "Peelamedu"],
  },
  tirunelveli: {
    name: "Tirunelveli",
    heroImage:
      "https://images.pexels.com/photos/7464703/pexels-photo-7464703.jpeg?auto=compress&cs=tinysrgb&w=1600",
    intro: "Trusted packers and movers across Tirunelveli city and nearby towns.",
    popularAreas: ["Palayamkottai", "Tirunelveli Town", "Melapalayam"],
  },
  tiruchirappalli: {
    name: "Tiruchirappalli",
    heroImage:
      "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1600",
    intro: "Smooth relocations across Trichy with experienced local crews.",
    popularAreas: ["Thillai Nagar", "Srirangam", "Cantonment"],
  },
  theni: {
    name: "Theni",
    heroImage:
      "https://images.pexels.com/photos/4484072/pexels-photo-4484072.jpeg?auto=compress&cs=tinysrgb&w=1600",
    intro: "House shifting and goods transport across Theni and surrounding towns.",
    popularAreas: ["Theni Allinagaram", "Periyakulam", "Bodinayakanur"],
  },
};

export default function CityServicePage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const key = (citySlug || "").toLowerCase();
  const city = cityConfigs[key] || cityConfigs["chennai"];

  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title={`Packers and Movers in ${city.name}`}
        description={city.intro}
        canonical={`/city/${key || "chennai"}`}
        type="article"
      />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={city.heroImage}
              alt={`GoShift ${city.name} logistics`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="1600"
              height="900"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/10 to-navy/40" />
          </div>
          <div className="relative container mx-auto px-6 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
                <MapPin className="h-3.5 w-3.5" />
                Service Area
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
                GoShift in {city.name}
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl">{city.intro}</p>
            </motion.div>
          </div>
        </section>

        {/* Service availability & popular areas */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What we cover in {city.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                From apartments and independent houses to offices and warehouses, GoShift covers all major
                neighborhoods in {city.name}. Our crews understand local roads, parking rules, and building
                guidelines so your move stays predictable.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-card">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-accent" />
                    Same-city moves
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fast, carefully planned moves within {city.name} with standardised packing and trained crews.
                  </p>
                </div>
                <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-card">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    Inter-city moves
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Regular line-haul departures from {city.name} to major South Indian cities with live tracking.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/60 p-6 shadow-card"
            >
              <h3 className="font-semibold text-foreground mb-3">Popular Areas Covered</h3>
              <ul className="space-y-2">
                {city.popularAreas.map((area) => (
                  <li key={area} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FAQ & CTA */}
        <section className="pb-8">
          <FAQSection />
        </section>
      </main>
    </div>
  );
}
