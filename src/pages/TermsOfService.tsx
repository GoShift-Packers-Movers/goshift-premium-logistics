import { Link } from "react-router-dom";

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
            <p className="mt-3 text-base text-muted-foreground">
              Terms and conditions for using GoShift customer app, driver app,
              website, and related logistics services.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By accessing or using the GoShift website, customer app, driver app,
                or any related services, you agree to be bound by these Terms of
                Service. If you do not agree, please do not use GoShift.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                2. Eligibility &amp; account responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>You must be at least 18 years old to create an account and use our services.</li>
                <li>
                  You must provide accurate details for registration, bookings, deliveries,
                  and driver onboarding (where applicable).
                </li>
                <li>
                  You are responsible for keeping your credentials secure and for all
                  activity under your account.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                3. Bookings, Pricing &amp; Payments
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>
                  Quotes/estimates are indicative and may vary based on actual load,
                  access constraints, distance, tolls, waiting, and on-site conditions.
                </li>
                <li>
                  A booking is confirmed only after confirmation is shared via app,
                  call, SMS, WhatsApp, or email.
                </li>
                <li>
                  Payments are processed through secure third-party partners. By paying
                  online, you authorize transaction processing through these partners.
                </li>
                <li>
                  Refund/cancellation timelines and conditions are governed by our{" "}
                  <Link to="/refund-policy" className="text-accent hover:underline">
                    Refund Policy
                  </Link>
                  .
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                4. Customer obligations
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Provide accurate pickup/drop and contact details.</li>
                <li>Do not submit prohibited, illegal, hazardous, or banned items.</li>
                <li>Treat support staff, drivers, and partners respectfully.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                5. Driver/partner obligations
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Maintain valid documents required by law and platform policies.</li>
                <li>Use the driver app only for legitimate service operations.</li>
                <li>
                  Maintain service standards, safety practices, and truthful status/location updates.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                6. Service availability, cancellation, and termination
              </h2>
              <p className="text-sm text-muted-foreground">
                Service availability may vary by location, demand, vehicle capacity,
                weather, traffic, and operational constraints. We may cancel, reschedule,
                suspend, or terminate services/accounts for fraud, abuse, repeated policy
                violations, legal non-compliance, or safety concerns.
              </p>
              <p className="text-sm text-muted-foreground">
                Users may request account deletion via in-app settings or from our{" "}
                <Link to="/delete-account" className="text-accent hover:underline">
                  Delete Account
                </Link>{" "}
                page.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                7. Prohibited uses
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Transporting illegal, hazardous, or banned goods.</li>
                <li>Misusing offers, wallets, payouts, pricing, or payment systems.</li>
                <li>Harassment, threats, or abusive behavior toward users/staff/partners.</li>
                <li>Attempting unauthorized access, scraping, reverse engineering, or system disruption.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                8. Liability, indemnity, and disclaimers
              </h2>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, GoShift is not liable for
                indirect, incidental, or consequential losses. Service disruptions,
                delays, and external factors may occur. Where applicable, liability
                is limited to the amount paid for the affected booking or the limits
                communicated in the booking.
              </p>
              <p className="text-sm text-muted-foreground">
                You agree to indemnify GoShift from claims arising from your misuse,
                policy violations, illegal activity, or inaccurate declarations.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                9. Privacy and policy links
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>
                  Personal data processing is governed by our{" "}
                  <Link to="/privacy-policy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  Cookies/local storage usage is covered in our{" "}
                  <Link to="/cookie-policy" className="text-accent hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </li>
                <li>
                  For account closure and data deletion requests, refer to{" "}
                  <Link to="/delete-account" className="text-accent hover:underline">
                    Delete Account
                  </Link>
                  .
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                10. Governing law, dispute resolution, and updates
              </h2>
              <p className="text-sm text-muted-foreground">
                These Terms are governed by applicable Indian laws. Any disputes are
                subject to the jurisdiction of courts in Madurai, Tamil Nadu, unless
                otherwise required by law.
              </p>
              <p className="text-sm text-muted-foreground">
                We may update these Terms from time to time. The updated version will
                be posted on this page with a revised &quot;Last updated&quot; date.
                Continued use of our services after updates means you accept the
                revised Terms.
              </p>
              <p className="text-sm text-muted-foreground">
                For terms-related questions, contact{" "}
                <span className="font-medium text-foreground">hello@goshift.in</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

