import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Smartphone, Sparkles, TimerReset, Truck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MobileAppDownloadBlock } from "@/components/MobileAppDownloadBlock";
import { PLAY_STORE_CUSTOMER_APP, PLAY_STORE_DRIVER_APP } from "@/lib/playStoreLinks";
import { Button } from "@/components/ui/button";

const customerFeatures = [
  "Book house shifting, bike transport, and deliveries in a few steps",
  "Track your job status and crew updates in real time",
  "View quotes, invoices, and booking history in one place",
  "Get notifications for offers, reminders, and trip milestones",
  "Reach support quickly when you need changes or help",
];

const driverFeatures = [
  "See and accept jobs that match your vehicle and zone",
  "Navigate trips with clear pickup and drop details",
  "Update trip status so customers stay informed",
  "Manage your profile and availability from the road",
  "Keep your day organized with a simple trip workflow",
];

const appHighlights = [
  {
    icon: ShieldCheck,
    title: "Reliable tracking",
    text: "Live status updates and transparent trip progress for both customers and drivers.",
  },
  {
    icon: TimerReset,
    title: "Faster workflows",
    text: "From booking to delivery updates, complete tasks in fewer steps and less time.",
  },
  {
    icon: Sparkles,
    title: "Simple experience",
    text: "Clean mobile flows that are easy to use even during busy moving days.",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title="GoShift mobile apps"
        description="Download the GoShift Customer and Driver apps on Google Play. Book moves, track deliveries, and manage trips on the go."
        canonical="/apps"
        type="website"
      />
      <main className="pb-20">
        <section className="py-12 lg:py-16 border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-border/80 bg-card px-6 py-8 shadow-sm sm:px-8 lg:px-10"
            >
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
                Mobile apps
              </span>
              <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl font-display">
                GoShift on your phone
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Whether you are booking a move or driving one, our Android apps keep everything in one place —
                from quotes and tracking to trip updates. Install the app that fits your role from Google Play.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="rounded-full px-6">
                  <a href="#customer-app">
                    Download Customer App
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <a href="#driver-app">Download Driver App</a>
                </Button>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {appHighlights.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-border/70 bg-background p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h2 className="mt-3 text-sm font-semibold text-foreground">{title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 max-w-5xl flex flex-col gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="customer-app"
              className="scroll-mt-28"
            >
              <MobileAppDownloadBlock
                title="Customer App"
                benefit="Book shifting and delivery, follow your trip, and manage bookings without calling around."
                playStoreUrl={PLAY_STORE_CUSTOMER_APP}
                icon={<Smartphone className="h-7 w-7" aria-hidden />}
                features={customerFeatures}
                showDownloadNowButton
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              id="driver-app"
              className="scroll-mt-28"
            >
              <MobileAppDownloadBlock
                title="Driver App"
                benefit="Pick up trips, stay on route, and keep customers updated — built for drivers on the road."
                playStoreUrl={PLAY_STORE_DRIVER_APP}
                icon={<Truck className="h-7 w-7" aria-hidden />}
                features={driverFeatures}
                showDownloadNowButton
              />
            </motion.div>
          </div>
        </section>

        <section className="pt-2 pb-4">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                Choose your app and get started in minutes
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Customer app is built for bookings and tracking. Driver app is built for assignments and trip updates.
                Install the right app now and start using GoShift on the go.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <a href={PLAY_STORE_CUSTOMER_APP} target="_blank" rel="noopener noreferrer">
                    Customer App
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <a href={PLAY_STORE_DRIVER_APP} target="_blank" rel="noopener noreferrer">
                    Driver App
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
