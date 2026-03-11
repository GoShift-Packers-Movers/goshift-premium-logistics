import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";

const faqs: { q: string; a: string | React.ReactNode }[] = [
  {
    q: "How does GoShift estimate pricing?",
    a: "Our pricing is based on distance, volume of goods, service type, and any special requirements. Use our Price Estimator for an instant range, then our team will provide an exact quote after a quick survey.",
  },
  {
    q: "Is my shipment insured during transit?",
    a: "Yes, every GoShift move comes with comprehensive transit insurance up to ₹10 Lakhs. We also offer extended coverage options for high-value items.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 5–7 days in advance for local moves and 10–14 days for intercity relocations. However, we also accommodate last-minute requests based on availability.",
  },
  {
    q: "Can I track my shipment in real-time?",
    a: "Absolutely! Every shipment comes with a unique tracking ID. You'll receive live GPS updates via our app and SMS notifications at every milestone.",
  },
  {
    q: "What happens if items are damaged during the move?",
    a: "In the rare event of damage, our claims process is straightforward. File a claim within 48 hours and our team will assess and compensate within 7 business days.",
  },
  {
    q: "Do you handle packing and unpacking?",
    a: "Yes, we offer full-service packing with premium multi-layer materials. Unpacking and furniture reassembly services are also available.",
  },
  {
    q: "How to check and prepare my household inventory checklist things?",
    a: (
      <span className="block space-y-3">
        <span className="block">Please download our PDF file and fill in your household inventory.</span>
        <a
          href="/inventory-checklist.pdf"
          download="GoShift-Household-Inventory-Checklist.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent hover:bg-accent/25 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download inventory checklist (PDF)
        </a>
      </span>
    ),
  },
  {
    q: "Do you have fittings for electrical appliances at the new home?",
    a: "Yes, available. Use our add-on service in the application; charges are applicable.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card border border-border/50 shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === i ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed">
                      {typeof faq.a === "string" ? <p>{faq.a}</p> : faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
