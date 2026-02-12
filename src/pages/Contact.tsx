import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="pb-20">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4 tracking-wide uppercase">
                Contact
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Talk to the GoShift Team
              </h1>
              <p className="text-lg text-muted-foreground">
                Reach out for quotes, support, or partnership queries. Our team is available across phone and email to
                help you plan your next move.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 lg:pb-24">
          <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start max-w-6xl">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-1">Call Us</h2>
                <p className="text-sm text-muted-foreground">
                  For quick help with bookings, pricing, or an existing move, call our primary support line.
                </p>
                <a
                  href="tel:+919384900568"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  +91-9384900568
                </a>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>Billing Support: 8344415795</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>Shifting Support: 9384900569</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>Quotation Support: 9750371308</span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-2xl bg-card border border-border/60 p-6 shadow-card space-y-4"
              >
                <h2 className="text-xl font-semibold text-foreground mb-1">Email &amp; Address</h2>
                <a
                  href="mailto:hello@goshift.in"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  hello@goshift.in
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>58C Ponmeni Narayana Street, SS Colony, Madurai - 625016</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span>Support hours: 9:00 AM – 9:00 PM, all days</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/60 p-6 shadow-card"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Share a few details and we’ll get back with a callback or quote within a few working hours.
              </p>
              <form className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">Phone</label>
                  <input
                    type="tel"
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    placeholder="+91-XXXXXX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">Service Type</label>
                  <select className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                    <option>House Shifting</option>
                    <option>Office Relocation</option>
                    <option>Vehicle Transport</option>
                    <option>Warehouse Storage</option>
                    <option>Packing &amp; Moving</option>
                    <option>International Moving</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 resize-none"
                    placeholder="Share pickup city, drop city, preferred date, and any special requirements."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:bg-accent/90"
                >
                  Submit Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

