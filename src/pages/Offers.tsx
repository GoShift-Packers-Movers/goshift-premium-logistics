import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchPricingAndOffers, type WebsiteOffer } from "@/lib/websiteApi";

function formatOfferDiscount(o: WebsiteOffer): string {
  if (o.discountType === "percentage") return `${o.discountValue}% OFF`;
  return `₹${o.discountValue} OFF`;
}

function formatValidUntil(validUntil: string): string {
  if (!validUntil) return "—";
  try {
    const d = new Date(validUntil);
    return isNaN(d.getTime()) ? validUntil : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return validUntil;
  }
}

type DisplayOffer = {
  code: string;
  title: string;
  description: string;
  discount: string;
  expires: string;
  highlight: string;
};

const DEBUG_OFFERS = true; // set to false to disable [GoShift Offers] page logs
function debugOffers(...args: unknown[]) {
  if (DEBUG_OFFERS) console.log("[GoShift Offers Page]", ...args);
}

export default function OffersPage() {
  const [offers, setOffers] = useState<DisplayOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugOffers("Offers page mounted, fetching...");
    fetchPricingAndOffers()
      .then((data) => {
        const list = data?.offers ?? [];
        debugOffers("fetchPricingAndOffers result: data?", !!data, "offers array length:", list.length, "raw data:", data);
        setOffers(
          list.map((o) => ({
            code: o.code,
            title: o.title,
            description: o.description,
            discount: formatOfferDiscount(o),
            expires: formatValidUntil(o.validUntil),
            highlight: o.title || "Offer",
          }))
        );
        debugOffers("setOffers called with", list.length, "items");
      })
      .catch((err) => {
        debugOffers("fetchPricingAndOffers catch:", err);
        setOffers([]);
      })
      .finally(() => {
        debugOffers("Loading done.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24">
      <main>
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

        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 rounded-2xl bg-card border border-border/60 animate-pulse"
                  />
                ))}
              </div>
            ) : offers.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No offers at the moment. Check back soon!
              </p>
            ) : (
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
                      <button
                        type="button"
                        onClick={() => window.location.href = "/pricing"}
                        className="mt-3 w-full rounded-xl bg-accent text-accent-foreground py-2.5 text-sm font-semibold shadow-glow transition hover:bg-accent/90"
                      >
                        Apply Offer
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
