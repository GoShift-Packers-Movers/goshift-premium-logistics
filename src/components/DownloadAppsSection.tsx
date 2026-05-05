import { motion } from "framer-motion";
import { Smartphone, Truck } from "lucide-react";
import { MobileAppDownloadBlock } from "@/components/MobileAppDownloadBlock";
import { PLAY_STORE_CUSTOMER_APP, PLAY_STORE_DRIVER_APP } from "@/lib/playStoreLinks";

export default function DownloadAppsSection() {
  return (
    <section
      id="download-apps"
      className="py-20 lg:py-28 bg-muted/40 border-y border-border/60"
      aria-labelledby="download-apps-heading"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center mb-12 lg:mb-14"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
            Mobile
          </span>
          <h2
            id="download-apps-heading"
            className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl font-display"
          >
            Download Our Apps
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Book moves, track deliveries, and manage trips on the go — available on Google Play.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <MobileAppDownloadBlock
              title="Customer App"
              benefit="Book shifting & delivery, live tracking, and offers in one place."
              playStoreUrl={PLAY_STORE_CUSTOMER_APP}
              icon={<Smartphone className="h-7 w-7" aria-hidden />}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MobileAppDownloadBlock
              title="Driver App"
              benefit="Accept orders, navigate jobs, and manage your trips on the road."
              playStoreUrl={PLAY_STORE_DRIVER_APP}
              icon={<Truck className="h-7 w-7" aria-hidden />}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
