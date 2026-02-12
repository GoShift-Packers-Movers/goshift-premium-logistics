import { Truck, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const services = ["House Shifting", "Office Relocation", "Vehicle Transport", "Warehouse Storage", "Packing & Moving", "International Moving"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const legal = ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient">
                <Truck className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-primary-foreground">
                GoShift
              </span>
            </div>
            <p className="text-sm text-primary-foreground/50 leading-relaxed mb-5">
              India's most trusted logistics and shifting partner. Moving homes, offices, and vehicles safely since 2018.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/5 text-primary-foreground/40 transition-all hover:bg-accent hover:text-accent-foreground">
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
                  <a href="#services" className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">{s}</a>
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
                  <a href="#" className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">{c}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+911800123456" className="flex items-center gap-2.5 text-sm text-primary-foreground/40 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-accent" /> 1800-123-456
              </a>
              <a href="mailto:hello@goshift.in" className="flex items-center gap-2.5 text-sm text-primary-foreground/40 hover:text-accent transition-colors">
                <Mail className="h-4 w-4 text-accent" /> hello@goshift.in
              </a>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/40">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                GoShift HQ, Sector 62, Noida, UP 201301
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/30">
            © 2026 GoShift. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {legal.map((l) => (
              <a key={l} href="#" className="text-xs text-primary-foreground/30 hover:text-accent transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
