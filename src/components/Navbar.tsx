import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "House Shifting Services", to: "/services/house-shifting" },
      { label: "Bike Shifting Services", to: "/services/office-relocation" },
      { label: "Delivery Services", to: "/services/warehouse-storage" },
    ],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Offers", to: "/offers" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-soft py-3 transition-all duration-300"
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="GoShift logo"
            className="h-14 w-auto object-contain"
            loading="lazy"
          />
         
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isOffers = item.label === "Offers";
            const activeClassName = isOffers
              ? "ring-2 ring-emerald-300 ring-offset-2 ring-offset-white"
              : "bg-accent-gradient text-accent-foreground shadow-glow";

            return (
              <div key={item.label} className="relative group">
                {isOffers && (
                  <>
                    {/* Water ripple effect around Offers pill */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-400/70"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [1, 1.2, 1.45],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeOut",
                      }}
                    />
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full border border-emerald-300/60"
                      animate={{
                        opacity: [0, 0.9, 0],
                        scale: [1.1, 1.35, 1.6],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                  </>
                )}
                <NavLink
                  to={item.to}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isOffers
                      ? "bg-emerald-500 text-white shadow-glow hover:bg-emerald-600"
                      : "text-black hover:text-black/80 hover:bg-black/5"
                  }`}
                  activeClassName={activeClassName}
                >
                  <div className="flex items-center gap-1">
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="h-3 w-3" />}
                    {isOffers && (
                      <span className="ml-1 flex items-center gap-1 text-[11px] font-semibold">
                        
                        <span className="rounded-full bg-white px-2 py-0.5 text-emerald-600">
                          %
                        </span>
                      </span>
                    )}
                  </div>
                </NavLink>
                {item.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="glass rounded-xl p-2 shadow-elevated min-w-[220px]">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="block rounded-lg px-4 py-2.5 text-sm text-black transition-colors hover:text-black/80 hover:bg-black/5"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <NavLink
          to="/pricing"
          className="hidden rounded-xl bg-accent-gradient px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-105 lg:block"
        >
          Get Estimate
        </NavLink>

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
              {navItems.map((item) => {
                const isOffers = item.label === "Offers";
                const activeClassName = isOffers
                  ? "ring-2 ring-emerald-300 ring-offset-2 ring-offset-background"
                  : "bg-accent-gradient text-accent-foreground shadow-glow";

                return (
                  <div key={item.label}>
                    <NavLink
                      to={item.to}
                      onClick={() => {
                        if (item.children) {
                          setServicesOpen(!servicesOpen);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                        isOffers
                          ? "bg-emerald-500 text-white shadow-glow hover:bg-emerald-600"
                          : "text-black hover:text-black/80 hover:bg-black/5"
                      }`}
                      activeClassName={activeClassName}
                    >
                      <div className="flex items-center gap-1">
                        <span>{item.label}</span>
                        {item.children && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </NavLink>
                    {item.children && servicesOpen && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-4 py-2 text-sm text-black/80 transition-colors hover:text-black"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <NavLink
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-accent-gradient px-6 py-3 text-center text-sm font-semibold text-accent-foreground mt-3"
              >
                Get Estimate
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
