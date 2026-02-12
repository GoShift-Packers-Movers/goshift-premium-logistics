import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Seo } from "@/components/Seo";

const posts = [
  {
    slug: "how-to-prepare-for-house-shifting",
    title: "How to Prepare for House Shifting: 10-Step Checklist",
    image:
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "House Shifting",
    readTime: "7 min read",
    date: "Feb 2026",
  },
  {
    slug: "office-relocation-with-minimal-downtime",
    title: "Office Relocation with Minimal Downtime",
    image:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Office Relocation",
    readTime: "6 min read",
    date: "Jan 2026",
  },
  {
    slug: "how-goshift-keeps-your-vehicle-safe",
    title: "How GoShift Keeps Your Vehicle Safe in Transit",
    image:
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Vehicle Transport",
    readTime: "5 min read",
    date: "Dec 2025",
  },
];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug) || posts[0];
  const related = posts.filter((p) => p.slug !== post.slug);

  return (
    <div className="min-h-screen bg-background pt-24">
      <Seo
        title={post.title}
        description={`GoShift blog: ${post.title} – practical tips for safer, smoother moves and transport.`}
        canonical={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          image: post.image,
          author: {
            "@type": "Organization",
            name: "GoShift",
          },
          datePublished: "2026-02-01",
          dateModified: "2026-02-01",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://goshift.in/blog/${post.slug}`,
          },
        }}
      />
      <main>
        {/* Cover */}
        <section className="pb-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                {post.category} · {post.readTime}
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-3">{post.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">Published {post.date} · GoShift Editorial</p>
            </motion.div>
          </div>
          <div className="container mx-auto px-6 mt-4">
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated border border-border/60">
              <img
                src={post.image}
                alt={`GoShift ${post.title}`}
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content + share bar */}
        <section className="pb-20 lg:pb-24">
          <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.5fr)] max-w-5xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
            >
              <p>
                Moving homes or offices is a big milestone – and often, a big source of stress. At GoShift, we&apos;ve
                helped thousands of families and businesses move across cities. This guide distills that experience
                into a practical checklist you can follow.
              </p>
              <p>
                Start by blocking your moving date and working backwards. Declutter, group items by room, and create a
                simple inventory so nothing gets left behind. For electronics and appliances, keep original boxes if
                possible – or ask for specialised packing.
              </p>
              <blockquote>
                A well-planned move starts at least 10–14 days before shifting day – especially for larger homes or
                outstation moves.
              </blockquote>
              <h2>Key things to do before moving day</h2>
              <ul>
                <li>Confirm elevator and parking permissions with your building.</li>
                <li>Separate &quot;essentials&quot; boxes that travel with you: documents, jewellery, medicines.</li>
                <li>Label every box clearly with room name and a short description.</li>
                <li>Click quick photos of fragile items before packing for insurance reference.</li>
              </ul>
              <h2>How GoShift helps</h2>
              <p>
                Your move coordinator will share a tailored plan based on your inventory, floor access, and distance.
                On moving day, the crew follows a defined loading sequence so heavy furniture, kitchen items, and
                wardrobes are stacked safely.
              </p>
            </motion.article>

            {/* Sticky share / sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 lg:sticky lg:top-28 self-start"
            >
              <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-card">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Share
                </p>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <button
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              {related.length > 0 && (
                <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-card space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Related articles
                  </p>
                  <ul className="space-y-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          to={`/blog/${r.slug}`}
                          className="text-sm text-foreground hover:text-accent transition-colors"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.aside>
          </div>
        </section>
      </main>
    </div>
  );
}
