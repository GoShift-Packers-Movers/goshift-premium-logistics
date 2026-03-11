import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");
    const result = await submitToFormspree({
      _subject: "Contact: Enquiry from website",
      name: (data.get("name") as string) || "",
      phone: (data.get("phone") as string) || "",
      serviceType: (data.get("serviceType") as string) || "",
      message: (data.get("message") as string) || "",
    });
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

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
              <form className="space-y-4" onSubmit={handleSubmit}>
                {status === "success" && (
                  <div className="flex items-center gap-2 rounded-xl bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-3 text-sm">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>Thanks! We&apos;ll get back to you within a few working hours.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 text-destructive px-4 py-3 text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage || "Something went wrong. Please try again or call us."}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground" htmlFor="contact-phone">Phone</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    placeholder="+91-XXXXXX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground" htmlFor="contact-service">Service Type</label>
                  <select id="contact-service" name="serviceType" className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                    <option value="House Shifting Services">House Shifting Services</option>
                    <option value="Bike Shifting Services">Bike Shifting Services</option>
                    <option value="Packers and Movers Services">Packers and Movers Services</option>
                    <option value="Delivery Services">Delivery Services</option>
                    <option value="Intra-City Delivery Service">Intra-City Delivery Service</option>
                    <option value="Outside City Services">Outside City Services</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="w-full rounded-xl bg-background border border-border/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 resize-none"
                    placeholder="Share pickup city, drop city, preferred date, and any special requirements."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Submit Enquiry"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

