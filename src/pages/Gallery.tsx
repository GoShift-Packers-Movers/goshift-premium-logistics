import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Category = "all" | "moves" | "vehicles" | "storage";

const images: { src: string; alt: string; category: Category }[] = [
  {
    src: "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift team packing boxes in living room",
    category: "moves",
  },
  {
    src: "https://images.pexels.com/photos/7464703/pexels-photo-7464703.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift packed boxes ready for loading",
    category: "moves",
  },
  {
    src: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift vehicle transport truck on highway",
    category: "vehicles",
  },
  {
    src: "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift warehouse storage with stacked pallets",
    category: "storage",
  },
  {
    src: "https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift workers loading boxes into truck",
    category: "moves",
  },
  {
    src: "https://images.pexels.com/photos/4484072/pexels-photo-4484072.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "GoShift forklift moving goods in warehouse",
    category: "storage",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedImage, setSelectedImage] = useState<(typeof images)[number] | null>(null);

  const filteredImages =
    activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

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
                Gallery
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Real Moves. Real People.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A glimpse into how GoShift handles packing, loading, transport, and storage for customers
                across India.
              </p>
            </motion.div>

            {/* Filters */}
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { id: "all", label: "All" },
                { id: "moves", label: "Moves" },
                { id: "vehicles", label: "Vehicles" },
                { id: "storage", label: "Storage" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as Category)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry-like grid */}
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              <AnimatePresence>
                {filteredImages.map((img) => (
                  <motion.button
                    key={img.src}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={() => setSelectedImage(img)}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-primary-foreground/90">
                      {img.alt}
                    </p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative max-w-4xl w-full px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-2xl object-cover"
                  loading="lazy"
                />
                <p className="mt-3 text-sm text-primary-foreground/80 text-center">{selectedImage.alt}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
