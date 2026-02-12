import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const services = ["House Shifting", "Office Relocation", "Vehicle Transport", "Warehouse Storage", "Packing & Moving", "International Moving"];
const cities = ["Chennai", "Coimbatore", "Tirunelveli", "Tiruchirappalli", "Theni"];
const legal = ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"];
const socialColors = [
  "bg-[#1877F2] text-white hover:bg-[#1451b3]", // Facebook
  "bg-[#1DA1F2] text-white hover:bg-[#177fbd]", // Twitter / X
  "bg-[#E1306C] text-white hover:bg-[#b32554]", // Instagram
  "bg-[#0A66C2] text-white hover:bg-[#084f95]", // LinkedIn
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
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href={
                    i === 0
                      ? "https://facebook.com"
                      : i === 1
                      ? "https://twitter.com"
                      : i === 2
                      ? "https://instagram.com"
                      : "https://linkedin.com"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105 ${socialColors[i]}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
                      s === "House Shifting"
                        ? "/services/house-shifting"
                        : s === "Office Relocation"
                        ? "/services/office-relocation"
                        : s === "Vehicle Transport"
                        ? "/services/vehicle-transport"
                        : s === "Warehouse Storage"
                        ? "/services/warehouse-storage"
                        : s === "Packing & Moving"
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

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">
            © 2026 GoShift. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {legal.map((l) => (
              <Link
                key={l}
                to={
                  l === "Privacy Policy"
                    ? "/privacy-policy"
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
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
