import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Pricing", to: "/pricing" },
  { label: "Offers", to: "/offers" },
];

const serviceLinks = [
  { label: "House Shifting Services", to: "/services/house-shifting" },
  { label: "Bike Shifting Services", to: "/services/office-relocation" },
  { label: "Packers and Movers Services", to: "/services/vehicle-transport" },
  { label: "Delivery Services", to: "/services/warehouse-storage" },
  { label: "Intra-City Delivery Service", to: "/services/packing-moving" },
  { label: "Outside City Services", to: "/services/international-moving" },
];

const cityLinks = [
  { label: "Chennai", to: "/city/chennai" },
  { label: "Coimbatore", to: "/city/coimbatore" },
  { label: "Tirunelveli", to: "/city/tirunelveli" },
  { label: "Tiruchirappalli", to: "/city/tiruchirappalli" },
  { label: "Theni", to: "/city/theni" },
];

const seoLandingLinks = [
  { label: "Packers and Movers in Ahmedabad", to: "/packers-movers-ahmedabad" },
  { label: "Mini Truck in Mumbai", to: "/mini-truck-mumbai" },
  { label: "Intercity Transport from Delhi", to: "/intercity-transport-delhi" },
];

const contentLinks = [
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Refund Policy", to: "/refund-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title="HTML Sitemap"
        description="Browse all key GoShift pages including services, city pages, pricing, offers, legal and blog from a single sitemap screen."
        canonical="/sitemap"
        type="website"
      />
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <header className="max-w-3xl mb-10">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
            Sitemap
          </span>
          <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
            GoShift HTML Sitemap
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Use this sitemap to quickly navigate to GoShift service pages, city pages, offers,
            pricing, legal information and blog content.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            For search engines, the XML sitemap is available at{" "}
            <a
              href="/sitemap.xml"
              className="text-accent hover:underline"
            >
              /sitemap.xml
            </a>
            .
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Primary pages</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {primaryLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Service pages</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/services" className="text-foreground hover:text-accent transition-colors">
                  All Services Overview
                </Link>
              </li>
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">City pages</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {cityLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">SEO landing pages</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {seoLandingLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Content</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {contentLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Legal & policies</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

