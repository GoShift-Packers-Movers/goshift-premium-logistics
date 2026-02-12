import { motion } from "framer-motion";

const offers = [
  {
    code: "GOSHIFT10",
    title: "10% OFF on Local Moves",
    description: "Valid on within-city house shifting booked at least 7 days in advance.",
    discount: "10% OFF",
    expires: "31 Mar 2026",
    highlight: "Local House Shifting",
  },
  {
    code: "INTERCITY15",
    title: "Flat ₹1500 OFF on Inter-City Moves",
    description: "For moves above 250km. Includes free door-to-door survey.",
    discount: "₹1500 OFF",
    expires: "30 Apr 2026",
    highlight: "Inter-City Moves",
  },
  {
    code: "STORAGE20",
    title: "20% OFF on First Month Storage",
    description: "Applies to warehouse storage plans of 3 months or more.",
    discount: "20% OFF",
    expires: "15 May 2026",
    highlight: "Warehouse Storage",
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main>
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
                Offers
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Smart Savings on Every Move
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Apply active GoShift coupons to get instant discounts on house shifting, inter-city moves, and
                storage plans.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Offers grid */}
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.code}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card transition-transform duration-500 [transform-style:preserve-3d] hover:-translate-y-2 hover:shadow-elevated"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-6 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                      {offer.highlight}
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">{offer.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{offer.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Coupon Code</p>
                        <p className="rounded-md bg-muted px-3 py-1 text-sm font-mono font-semibold text-foreground">
                          {offer.code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-accent">{offer.discount}</p>
                        <p className="text-[11px] text-muted-foreground">Valid till {offer.expires}</p>
                      </div>
                    </div>
                    <button className="mt-3 w-full rounded-xl bg-accent text-accent-foreground py-2.5 text-sm font-semibold shadow-glow transition hover:bg-accent/90">
                      Apply Offer
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
