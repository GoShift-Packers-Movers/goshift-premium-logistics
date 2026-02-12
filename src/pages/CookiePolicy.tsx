export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <section className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
              Cookie Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. What Are Cookies?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cookies are small text files stored on your browser by websites you visit. They help
                websites remember your actions and preferences so that your experience is smoother
                and more personalised.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                2. How GoShift Uses Cookies
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>To keep you signed in to your account between visits.</li>
                <li>To remember basic preferences such as language and city.</li>
                <li>To understand how visitors use our website and apps so we can improve them.</li>
                <li>To show relevant offers and measure the effectiveness of campaigns.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                3. Types of Cookies We Use
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Strictly necessary cookies:</span>{" "}
                  required for core features like login, security and booking flows.
                </li>
                <li>
                  <span className="font-medium text-foreground">Analytics cookies:</span> help us
                  understand traffic, popular pages and app performance.
                </li>
                <li>
                  <span className="font-medium text-foreground">Marketing cookies:</span> used
                  occasionally to deliver more relevant ads and measure conversions.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                4. Managing Cookies
              </h2>
              <p className="text-sm text-muted-foreground">
                Most browsers allow you to control cookies through their settings, including
                blocking certain types or clearing them completely. Please note that disabling
                essential cookies may affect how the GoShift website and apps function.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                5. Contact
              </h2>
              <p className="text-sm text-muted-foreground">
                If you have questions about this Cookie Policy, you can contact us at{" "}
                <span className="font-medium text-foreground">hello@goshift.in</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

