import { motion } from "framer-motion";

const timeline = [
  {
    year: "2018",
    title: "GoShift is founded",
    text: "Started with a small fleet in Madurai, serving local house shifting customers.",
  },
  {
    year: "2020",
    title: "Expands across Tamil Nadu",
    text: "Launched operations in Chennai, Coimbatore, Tirunelveli, and Tiruchirappalli.",
  },
  {
    year: "2023",
    title: "50,000+ moves completed",
    text: "Scaled operations with standardised packing, training, and real-time tracking.",
  },
  {
    year: "2025",
    title: "Integrated logistics platform",
    text: "Launched GoShift apps for customers, drivers, and zonal partners.",
  },
];

const stats = [
  { label: "Successful Moves", value: "50K+" },
  { label: "Cities Served", value: "25+" },
  { label: "Customer Rating", value: "4.9★" },
  { label: "Partner Fleet", value: "500+" },
];

const team = [
  { name: "Operations Lead", role: "City & Line-Haul Operations" },
  { name: "Customer Success Lead", role: "Customer Experience & Quality" },
  { name: "Tech Lead", role: "Product & Platform" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main>
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
                About GoShift
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Building India&apos;s Most Trusted Shifting Partner
              </h1>
              <p className="text-lg text-muted-foreground">
                GoShift combines technology, trained crews, and city-level expertise to make relocations predictable,
                transparent, and genuinely stress-free for families and businesses.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl bg-card border border-border/60 p-6 shadow-card text-center"
                >
                  <p className="font-display text-2xl lg:text-3xl font-bold text-accent mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 lg:py-16 bg-muted/40">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Our Journey</h2>
            <div className="relative border-l border-border/60 pl-6 space-y-8">
              {timeline.map((entry, index) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent shadow-glow" />
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">{entry.year}</p>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">{entry.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Mission &amp; Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to make every move feel organised and transparent – whether it&apos;s a 1BHK shift
                  within the city or a multi-truck office relocation. We do this by combining predictable processes with
                  local expertise and technology.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to be the operating system for relocations across India, connecting customers, drivers,
                  and partners on a single platform.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl bg-card border border-border/60 p-6 shadow-card"
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">Core Team</h3>
                <ul className="space-y-3">
                  {team.map((member) => (
                    <li key={member.name} className="text-sm">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
