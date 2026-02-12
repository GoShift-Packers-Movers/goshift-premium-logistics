import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Truck } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    href: "#services",
    children: ["House Shifting", "Office Relocation", "Vehicle Transport", "Warehouse Storage", "Packing & Moving", "International Moving"],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft py-3 backdrop-blur-xl" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gradient"
          >
            <Truck className="h-5 w-5 text-accent-foreground" />
          </motion.div>
          <span className="font-display text-xl font-bold text-foreground">
            Go<span className="text-gradient">Shift</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className="relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
              {item.children && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="glass rounded-xl p-2 shadow-elevated min-w-[220px]">
                    {item.children.map((child, i) => (
                      <motion.a
                        key={child}
                        href="#services"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="block rounded-lg px-4 py-2.5 text-sm text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
                      >
                        {child}
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(24 95% 53% / 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="hidden rounded-xl bg-accent-gradient px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow lg:block"
        >
          Get Estimate
        </motion.a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground lg:hidden hover:bg-secondary"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mt-2 mx-4 rounded-2xl overflow-hidden shadow-elevated lg:hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      if (item.children) {
                        setServicesOpen(!servicesOpen);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                    )}
                  </a>
                  <AnimatePresence>
                    {item.children && servicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 space-y-1 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child}
                            href="#services"
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {child}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-accent-gradient px-6 py-3 text-center text-sm font-semibold text-accent-foreground mt-3"
              >
                Get Estimate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
