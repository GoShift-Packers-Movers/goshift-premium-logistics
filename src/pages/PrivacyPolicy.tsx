export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <section className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Overview
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                GoShift (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains what information we collect, how we use it, and
                the choices you have when you use our website, mobile apps, and logistics services.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Account details:</span> name, phone number, email address and
                  password when you create or update your GoShift account.
                </li>
                <li>
                  <span className="font-medium text-foreground">Booking details:</span> pickup and drop addresses, service type,
                  preferred dates and times, inventory notes and special instructions.
                </li>
                <li>
                  <span className="font-medium text-foreground">Payment information:</span> masked card details or UPI references
                  processed securely by our payment partners. We do not store full card numbers or CVV.
                </li>
                <li>
                  <span className="font-medium text-foreground">Usage data:</span> app and website interactions, device
                  information, approximate location and logs used to improve reliability and safety.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>To create and manage your GoShift account.</li>
                <li>To process bookings, assign drivers/partners and provide customer support.</li>
                <li>To send booking confirmations, trip updates and important service messages.</li>
                <li>To improve our routes, pricing, safety features and overall experience.</li>
                <li>To comply with legal obligations and respond to lawful requests.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                4. How We Share Information
              </h2>
              <p className="text-sm text-muted-foreground">
                We do not sell your personal data. We share information only with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Verified drivers and logistics partners to fulfil your bookings.</li>
                <li>Payment gateways and banks to process transactions securely.</li>
                <li>
                  Service providers (for example SMS, email, analytics) who work on our behalf under
                  strict confidentiality obligations.
                </li>
                <li>Government authorities or law enforcement when required by applicable law.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                5. Data Retention &amp; Security
              </h2>
              <p className="text-sm text-muted-foreground">
                We keep your information only for as long as necessary for the purposes described
                above, or as required by law. We use industry-standard safeguards, including
                encryption in transit, access controls and regular monitoring to protect your data
                from unauthorised access or misuse.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                6. Your Choices &amp; Rights
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>You can update your profile details from within the GoShift apps.</li>
                <li>You may request access, correction or deletion of your personal data, subject to law.</li>
                <li>You can opt out of non-essential marketing communications at any time.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                7. Contact Us
              </h2>
              <p className="text-sm text-muted-foreground">
                If you have any questions about this Privacy Policy or how we handle your data,
                please contact us at <span className="font-medium text-foreground">hello@goshift.in</span>{" "}
                or write to us at our registered office in Madurai, India.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

