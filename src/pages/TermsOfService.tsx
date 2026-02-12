export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <section className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By accessing or using the GoShift website, mobile apps or any of our logistics
                services, you agree to be bound by these Terms of Service. If you do not agree,
                please do not use GoShift.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                2. Using GoShift
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>You must be at least 18 years old to create an account and place bookings.</li>
                <li>
                  You agree to provide accurate pickup/drop addresses, contact details and item
                  descriptions so we can safely complete your move.
                </li>
                <li>
                  You are responsible for keeping your account credentials confidential and for any
                  activity that happens under your account.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                3. Bookings, Pricing &amp; Payments
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>
                  Prices shown in the estimator are indicative and may vary based on actual items,
                  floor access, distance, tolls and on-site assessment.
                </li>
                <li>
                  Your booking is confirmed only after we share a confirmation via SMS, WhatsApp,
                  email or in-app notification.
                </li>
                <li>
                  Payments are processed via secure third-party gateways. By paying online you
                  authorise us and our partners to process the transaction.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                4. Prohibited Uses
              </h2>
              <p className="text-sm text-muted-foreground">
                You agree not to misuse GoShift, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Transporting illegal, hazardous or banned items.</li>
                <li>Harassing staff, drivers or support teams.</li>
                <li>Attempting to damage, overload or reverse-engineer our systems.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                5. Liability
              </h2>
              <p className="text-sm text-muted-foreground">
                While we take extensive care to protect your belongings, certain risks are inherent
                in any move. Our liability is limited to the extent permitted by applicable law and,
                where applicable, to the coverage limits communicated in your booking.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                6. Changes to These Terms
              </h2>
              <p className="text-sm text-muted-foreground">
                We may update these Terms from time to time to reflect changes to our services or
                legal requirements. The updated version will always be available on this page and
                will apply from the date it is posted.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                7. Contact
              </h2>
              <p className="text-sm text-muted-foreground">
                For questions about these Terms of Service, you can reach us at{" "}
                <span className="font-medium text-foreground">hello@goshift.in</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

