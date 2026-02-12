import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "how-to-prepare-for-house-shifting",
    title: "How to Prepare for House Shifting: 10-Step Checklist",
    category: "House Shifting",
    image:
      "https://images.pexels.com/photos/7464704/pexels-photo-7464704.jpeg?auto=compress&cs=tinysrgb&w=1200",
    excerpt:
      "From decluttering to packing fragile items, here’s a practical checklist to make your move smoother.",
    readTime: "7 min read",
  },
  {
    slug: "office-relocation-with-minimal-downtime",
    title: "Office Relocation with Minimal Downtime",
    category: "Office Relocation",
    image:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1200",
    excerpt:
      "Plan IT moves, seating charts, and communication so your teams stay productive through the shift.",
    readTime: "6 min read",
  },
  {
    slug: "how-goshift-keeps-your-vehicle-safe",
    title: "How GoShift Keeps Your Vehicle Safe in Transit",
    category: "Vehicle Transport",
    image:
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    excerpt:
      "Learn about carriers, loading ramps, wheel chocks, and the safety checks behind every vehicle move.",
    readTime: "5 min read",
  },
];

export default function BlogListPage() {
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
                Blog
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Moving Tips, Playbooks &amp; Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Guides from GoShift experts to help you plan better moves – from packing hacks to city-level
                relocation insights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card transition-transform hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-semibold text-foreground line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                      <span>{post.readTime}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-accent font-semibold text-xs hover:underline"
                      >
                        Read article
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
