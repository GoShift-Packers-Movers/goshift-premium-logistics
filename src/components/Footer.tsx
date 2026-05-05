import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { GooglePlayStoreButton } from "@/components/GooglePlayStoreButton";
import { PLAY_STORE_CUSTOMER_APP, PLAY_STORE_DRIVER_APP } from "@/lib/playStoreLinks";

const services = [
  "House Shifting Services",
  "Bike Shifting Services",
  "Packers and Movers Services",
  "Delivery Services",
  "Intra-City Delivery Service",
  "Outside City Services",
];
const cities = ["Chennai", "Coimbatore", "Tirunelveli", "Tiruchirappalli", "Theni"];
const legal = [
  "Privacy Policy",
  "Delete Account",
  "Terms of Service",
  "Refund Policy",
  "Cookie Policy",
  "Sitemap",
];
const socialColors = [
  "bg-[#1877F2] text-white hover:bg-[#1451b3]", // Facebook
  "bg-[#E1306C] text-white hover:bg-[#b32554]", // Instagram
  "bg-[#0A66C2] text-white hover:bg-[#084f95]", // LinkedIn
  "bg-[#FF0000] text-white hover:bg-[#cc0000]", // YouTube
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div>
            <div className="flex justify-center items-center mb-4 bg-white px-4 py-2 shadow-sm">
              <img
                src={logo}
                alt="GoShift logo"
                className="h-10 w-auto object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-5">
              India's most trusted logistics and shifting partner. Moving homes, offices, and vehicles safely since 2018.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={
                    i === 0
                      ? "https://www.facebook.com/share/188hh18KBY/"
                      : i === 1
                      ? "https://www.instagram.com/go_shift"
                      : i === 2
                      ? "https://www.linkedin.com/in/go-shift-packers-and-movers-%C2%AE-01283a167/"
                      : "https://youtube.com/@goshiftpackersandmovers?si=wuSclD0fxdS_Zokw"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105 ${socialColors[i]}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-primary-foreground/10">
              <p className="text-xs font-bold text-primary-foreground uppercase tracking-wide mb-2.5">
                Download apps
              </p>
              <div className="flex flex-row flex-wrap items-start gap-3">
                <GooglePlayStoreButton
                  href={PLAY_STORE_CUSTOMER_APP}
                  label="Customer app"
                  variant="onDark"
                  compact
                />
                <GooglePlayStoreButton
                  href={PLAY_STORE_DRIVER_APP}
                  label="Driver app"
                  variant="onDark"
                  compact
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to={
                      s === "House Shifting Services"
                        ? "/services/house-shifting"
                        : s === "Bike Shifting Services"
                        ? "/services/office-relocation"
                        : s === "Packers and Movers Services"
                        ? "/services/vehicle-transport"
                        : s === "Delivery Services"
                        ? "/services/warehouse-storage"
                        : s === "Intra-City Delivery Service"
                        ? "/services/packing-moving"
                        : "/services/international-moving"
                    }
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-4">Service Cities</h4>
            <ul className="space-y-2.5">
              {cities.map((c) => (
                <li key={c}>
                  <Link
                    to={
                      c === "Chennai"
                        ? "/city/chennai"
                        : c === "Coimbatore"
                        ? "/city/coimbatore"
                        : c === "Tirunelveli"
                        ? "/city/tirunelveli"
                        : c === "Tiruchirappalli"
                        ? "/city/tiruchirappalli"
                        : "/city/theni"
                    }
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+919384900568"
                className="flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" /> +91-9384900568
              </a>
              <div className="space-y-1 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>Billing Support: 8344415795</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>Shifting Support: 9384900569</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>Quotation Support: 9750371308</span>
                </div>
              </div>
              <a
                href="mailto:hello@goshift.in"
                className="flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" /> hello@goshift.in
              </a>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                58C Ponmeni Narayana Street, SS Colony, Madurai - 625016
              </div>
            </div>
          </div>
        </div>

        {/* Copyright · developed by · legal — one band, aligned baselines on large screens */}
        <div className="grid grid-cols-1 gap-8 border-t border-primary-foreground/10 pt-10 pb-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-6 xl:gap-8">
          <p className="order-2 text-center text-xs leading-relaxed text-primary-foreground/60 lg:order-1 lg:text-left lg:self-center">
            © {new Date().getFullYear()} GoShift. All rights reserved.
          </p>

          <div className="order-1 flex justify-center lg:order-2 lg:self-center">
            <a
              href="https://navikxtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/[0.08] px-4 py-2.5 pl-2 shadow-sm backdrop-blur-sm transition-all hover:border-[#cba345]/50 hover:bg-primary-foreground/[0.12]"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cba345] text-sm font-bold tracking-tight text-white shadow-inner"
                aria-hidden
              >
                NX
              </span>
              <span className="min-w-0 flex flex-col items-start text-left">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/55">
                  Developed by
                </span>
                <span className="text-sm font-bold text-primary-foreground group-hover:text-white">
                  NavikX Technologies
                </span>
              </span>
              <Sparkles
                className="h-6 w-6 shrink-0 text-[#cba345] transition-transform group-hover:scale-110"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          </div>

          <nav
            className="order-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-end lg:self-center"
            aria-label="Legal"
          >
            {legal.map((l) =>
              l === "Sitemap" ? (
                <Link
                  key={l}
                  to="/sitemap"
                  className="text-xs text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  Sitemap
                </Link>
              ) : (
                <Link
                  key={l}
                  to={
                    l === "Privacy Policy"
                      ? "/privacy-policy"
                      : l === "Delete Account"
                      ? "/delete-account"
                      : l === "Terms of Service"
                      ? "/terms-of-service"
                      : l === "Refund Policy"
                      ? "/refund-policy"
                      : "/cookie-policy"
                  }
                  className="text-xs text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {l}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
