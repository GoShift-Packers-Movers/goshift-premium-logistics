import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

type PageKey = "packers-movers-ahmedabad" | "mini-truck-mumbai" | "intercity-transport-delhi";

const pages: Record<
  PageKey,
  {
    title: string;
    h1: string;
    description: string;
    city: string;
    breadcrumb: { name: string; path: string }[];
    faqs: { question: string; answer: string }[];
  }
> = {
  "packers-movers-ahmedabad": {
    title: "Packers and Movers in Ahmedabad",
    h1: "Trusted Packers and Movers in Ahmedabad",
    description:
      "Book trusted packers and movers in Ahmedabad with GoShift for safe house shifting, apartment moves and local relocations across the city.",
    city: "Ahmedabad",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Packers & Movers Ahmedabad", path: "/packers-movers-ahmedabad" },
    ],
    faqs: [
      {
        question: "How early should I book packers and movers in Ahmedabad?",
        answer:
          "For weekends and month-end dates we recommend booking at least 7–10 days in advance. For weekday moves, 3–5 days is usually sufficient, but earlier booking gives you better time-slot options.",
      },
      {
        question: "Do you provide packing material for house shifting in Ahmedabad?",
        answer:
          "Yes. Our crew brings all required packing material such as cartons, bubble wrap, stretch film, wardrobe boxes and tapes. We standardise packing across all moves in Ahmedabad so fragile items are protected.",
      },
      {
        question: "Can GoShift help with only loading and unloading?",
        answer:
          "Yes. If you already have a vehicle arranged, you can book GoShift only for loading and unloading labour. Let your move coordinator know this during the survey so pricing is shared accordingly.",
      },
      {
        question: "Are my belongings insured during the move?",
        answer:
          "For most moves we offer optional damage protection that covers sudden and accidental damage during transit. Your move coordinator will explain the coverage, exclusions and claim process before you confirm the booking.",
      },
      {
        question: "What locations in Ahmedabad do you cover?",
        answer:
          "We cover all major areas in Ahmedabad including SG Highway, Bopal, Satellite, Maninagar, Chandkheda, Naroda and more. For nearby towns, speak to our team to confirm availability.",
      },
    ],
  },
  "mini-truck-mumbai": {
    title: "Mini Truck on Rent in Mumbai",
    h1: "Mini Truck Transport Service in Mumbai",
    description:
      "Rent mini trucks in Mumbai for local shifting, last‑mile deliveries and small moves with GoShift’s verified driver partners.",
    city: "Mumbai",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Mini Truck Mumbai", path: "/mini-truck-mumbai" },
    ],
    faqs: [
      {
        question: "What types of mini trucks are available in Mumbai?",
        answer:
          "We provide Tata Ace, Bolero Pickup and similar small commercial vehicles suitable for home shifting, store deliveries and marketplace sellers. Based on your inventory and lane width, we suggest the right vehicle.",
      },
      {
        question: "Can I book mini trucks for hourly use in Mumbai?",
        answer:
          "Yes. For within‑city movements you can book vehicles on a point‑to‑point or hourly package. Hourly packages are ideal when you have multiple pickup and drop points inside Mumbai.",
      },
      {
        question: "Do your mini trucks come with labour?",
        answer:
          "You can choose vehicle‑only or vehicle with 1–3 helpers. For heavy items like fridges, washing machines or furniture, we strongly recommend booking at least two helpers for safe loading and unloading.",
      },
      {
        question: "Are tolls and parking charges included in the mini truck fare?",
        answer:
          "Base fares typically exclude tolls and parking. Any actual tolls, parking or entry fees paid during the trip are billed transparently at cost and reflected in your invoice.",
      },
      {
        question: "Can I schedule a mini truck for late‑night or early‑morning slots?",
        answer:
          "Yes, subject to availability and local regulations for your pickup and drop areas. Night or odd‑hour slots may attract a small additional charge which will be shared up‑front.",
      },
    ],
  },
  "intercity-transport-delhi": {
    title: "Intercity Transport from Delhi",
    h1: "Intercity Transport Service from Delhi",
    description:
      "Plan safe and predictable intercity transport from Delhi to major Indian cities with GoShift’s scheduled line‑haul and door‑to‑door service.",
    city: "Delhi",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Intercity Transport Delhi", path: "/intercity-transport-delhi" },
    ],
    faqs: [
      {
        question: "Which cities can I move to from Delhi with GoShift?",
        answer:
          "We support moves from Delhi to most major metros and Tier‑1 cities including Mumbai, Bengaluru, Chennai, Hyderabad, Pune, Ahmedabad and Kolkata, along with many regional routes in North and West India.",
      },
      {
        question: "How long does intercity transport from Delhi usually take?",
        answer:
          "Transit time depends on distance and route. For example, Delhi–Mumbai typically takes 2–4 days door‑to‑door while Delhi–Bengaluru can take 4–6 days. Your move plan will mention an estimated delivery window.",
      },
      {
        question: "Can I track my intercity shipment from Delhi?",
        answer:
          "Yes. Most long‑haul vehicles are GPS‑enabled and your move coordinator shares regular status updates by SMS, WhatsApp or phone, along with tracking links where available.",
      },
      {
        question: "Do you handle part‑load or only full‑truck loads from Delhi?",
        answer:
          "We arrange both part‑load (shared) and full‑truck movements depending on your volume and urgency. Part‑load options are budget‑friendly, while full‑truck loads give you dedicated capacity and faster dispatch.",
      },
      {
        question: "Is unpacking included at the destination city?",
        answer:
          "For house shifting moves, unloading and basic unpacking are usually included. For commercial or customised moves, scope of unpacking and on‑site support will be defined in your quotation.",
      },
    ],
  },
};

interface Props {
  pageKey: PageKey;
}

export default function ServiceCitySeoPage({ pageKey }: Props) {
  const page = pages[pageKey];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumb.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://goshift.in${crumb.path}`,
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `GoShift - ${page.h1}`,
    url: `https://goshift.in/${pageKey}`,
    telephone: "+91-9384900568",
    address: {
      "@type": "PostalAddress",
      streetAddress: "58C Ponmeni Narayana Street, SS Colony",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      postalCode: "625016",
      addressCountry: "IN",
    },
    areaServed: page.city,
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title={page.title}
        description={page.description}
        canonical={`/${pageKey}`}
        type="article"
        jsonLd={[faqSchema, breadcrumbSchema, localBusinessSchema]}
      />
      <main className="container mx-auto px-6 py-12 lg:py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            {page.breadcrumb.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-1">
                {index > 0 && <span>/</span>}
                {index < page.breadcrumb.length - 1 ? (
                  <Link to={crumb.path} className="hover:text-accent">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="max-w-3xl mb-10">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
            {page.city}
          </span>
          <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">{page.h1}</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">{page.description}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)] items-start">
          <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">
              Why choose GoShift for {page.city}?
            </h2>
            <p>
              GoShift combines technology, trained crews and city‑level operations to keep your move
              predictable. From survey and pricing to packing, loading, transit and unloading, each
              step follows a clearly defined process, so you know what will happen and when.
            </p>
            <p>
              Our field teams are familiar with traffic patterns, apartment bylaws and parking
              restrictions in {page.city}. That local knowledge helps us plan the right vehicle,
              crew size and timings – whether you are moving on a weekday evening or a weekend
              morning. At the same time, our central control room monitors long‑haul movements and
              supports drivers with routing and status updates.
            </p>
            <p>
              Every booking gets a dedicated move coordinator who is your single point of contact.
              They confirm your inventory, share packing guidance, coordinate with building
              security, and keep you posted at key milestones. If your plans change, the coordinator
              helps reschedule and re‑optimise the move so you do not lose time.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">
              Services available in {page.city}
            </h2>
            <p>
              Depending on the route and service, GoShift supports house shifting, office
              relocations, small moves, mini trucks, full‑truck loads and part‑load movements. For
              many lanes, we also support scheduled intercity departures so your consignment moves
              on time without last‑minute surprises.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>House Shifting Services for apartments, villas and independent homes.</li>
              <li>Bike Shifting Services with secure two-wheeler handling.</li>
              <li>Delivery Services and Intra-City Delivery Service for within-city moves.</li>
              <li>Outside City Services for planned inter-city movements.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8">How booking works</h2>
            <p>
              Share your basic details – pickup and drop locations, tentative date and an overview
              of your items. Based on this, we prepare an initial estimate and, where required,
              arrange a quick video or in‑person survey. Once you are comfortable with the scope and
              pricing, we confirm the slot, assign a crew and send booking confirmation with
              timelines.
            </p>
            <p>
              On move day, the crew reaches on time with packing material and starts room‑wise
              packing. Boxes are labelled clearly, fragile items are wrapped in multiple layers, and
              furniture is dismantled only where required. After loading, you receive vehicle and
              driver details along with tracking links where available. At destination, unloading
              happens as per your room plan, followed by basic unpacking and debris collection.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">Related GoShift services</h2>
            <p>
              Depending on your route, you can also explore our dedicated service pages to
              understand inclusions and process in more depth:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <Link to="/services/house-shifting" className="text-accent hover:underline">
                  House Shifting Services
                </Link>
              </li>
              <li>
                <Link to="/services/office-relocation" className="text-accent hover:underline">
                  Bike Shifting Services
                </Link>
              </li>
              <li>
                <Link to="/services/vehicle-transport" className="text-accent hover:underline">
                  Packers and Movers Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-accent hover:underline">
                  Transparent Price Estimator
                </Link>
              </li>
            </ul>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-2">
                Plan your move with GoShift
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Share your route and basic details. Our team will suggest the right vehicle,
                estimate and schedule for your move.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-accent-gradient px-5 py-2.5 text-xs font-semibold text-accent-foreground shadow-glow hover:scale-[1.02] transition-transform"
              >
                Talk to our team
              </Link>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-2">FAQs</h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                {page.faqs.map((faq) => (
                  <li key={faq.question}>
                    <p className="font-semibold text-foreground mb-1">{faq.question}</p>
                    <p>{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

