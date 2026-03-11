import { motion } from "framer-motion";

const stats = [
  { label: "Customers Served", value: "30,000+" },
  { label: "Cities Covered", value: "500+" },
  { label: "Customer Rating", value: "4.9★" },
  { label: "Partner Network", value: "South India + Pan-India" },
];

const milestones = [
  {
    period: "2018–2019",
    title: "Establishing the Local Stronghold",
    content: [
      "Following its launch in Madurai, Go Shift spent these years perfecting its \"local shifting\" model.",
      "The brand established branch offices in Theni, Tirunelveli, and Dindigul, moving beyond its Madurai roots to cover the southern belt of Tamil Nadu.",
      "While initially focused on 1BHK/2BHK household moves, the company introduced specialized Bike Shifting services using custom packing materials to cater to the growing student and young professional demographic in these cities.",
    ],
  },
  {
    period: "2020–2021",
    title: "Resilience & Digital Pivot",
    content: [
      "The pandemic brought challenges to the logistics industry, but it also forced a digital evolution for Go Shift.",
      "During the COVID-19 lockdowns, the company was among the first in the region to implement \"Zero Contact Shifting\" and strict sanitization of trucks and packing materials.",
      "Go Shift launched its Android Application, allowing customers to get instant quotes and track their consignments. This move shifted them from a traditional \"call-for-quote\" business to a more transparent, tech-forward competitor.",
    ],
  },
  {
    period: "2022–2023",
    title: "The Pan-India Leap",
    content: [
      "Post-pandemic, the company focused on long-distance interstate relocations.",
      "Go Shift opened a dedicated branch in Chennai, serving as a strategic hub for moves toward North India.",
      "They began handling larger office relocations (including IT infrastructure) for clients like SBI, HCL, and TCS, proving their capability to handle sensitive electronic equipment and complex logistics.",
      "The company expanded its fleet to include both open and enclosed container trucks, ensuring safer transport for luxury cars and high-value household items.",
    ],
  },
  {
    period: "2024–Present",
    title: "Scaling & Customer Centricity",
    content: [
      "Today, Go Shift is recognized for its transparency and professional crew management.",
      "The brand now facilitates moves to over 500+ cities through a robust partner network while maintaining direct control over major South Indian routes.",
      "They introduced \"No Hidden Cost\" guarantees and \"Price Locking\" (where the quote doesn't change post-booking), addressing a major pain point in the Indian packing and moving industry.",
      "With over 30,000 customers served, the company has maintained high ratings on platforms like Justdial and AssureShift, particularly for their 1BHK and 2BHK local relocation efficiency.",
    ],
  },
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
                Since its establishment in 2016–2017, Go Shift Packers and Movers has evolved from a local Madurai
                startup into a tech-enabled relocation brand with a footprint across South India. We combine
                technology, trained crews, and city-level expertise to make relocations predictable, transparent, and
                genuinely stress-free for families and businesses.
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

        {/* Key Milestones */}
        <section className="py-12 lg:py-16 bg-muted/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Key Milestones at a Glance</h2>
            <p className="text-muted-foreground mb-10">
              Here is the journey of Go Shift Packers and Movers from 2018 to the present day.
            </p>
            <div className="space-y-10">
              {milestones.map((entry, index) => (
                <motion.div
                  key={entry.period}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl bg-card border border-border/60 p-6 sm:p-8 shadow-card"
                >
                  <div className="flex flex-wrap items-baseline gap-2 mb-3">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">{entry.period}</span>
                    <span className="text-muted-foreground/70">·</span>
                    <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {entry.content.map((paragraph, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent/70 mt-1.5 shrink-0">•</span>
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
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
                  Our mission is to make every move organised and transparent – from 1BHK/2BHK local shifts to
                  multi-truck office and IT relocations. We combine predictable processes with local expertise and
                  technology, and we stand by &quot;No Hidden Cost&quot; guarantees and &quot;Price Locking&quot; so your quote
                  doesn&apos;t change after booking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to be the operating system for relocations across India – connecting customers, drivers,
                  and partners on a single platform while maintaining direct control over quality on major South Indian
                  routes and a robust partner network for 500+ cities.
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
