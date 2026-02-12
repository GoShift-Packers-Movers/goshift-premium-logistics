export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <section className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
              Refund Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. General Principles
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We understand plans can change. This Refund Policy explains how cancellations,
                schedule changes and refunds are handled for GoShift bookings.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                2. Cancellation by Customer
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Free cancellation if done well before vehicle and crew have been dispatched.</li>
                <li>
                  A nominal processing fee may apply for same-day cancellations or when expenses
                  (tolls, loading, packing materials) have already been incurred.
                </li>
                <li>
                  If the team has reached the pickup location and work has started, only a partial
                  refund may be possible depending on effort and costs already spent.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                3. Rescheduling
              </h2>
              <p className="text-sm text-muted-foreground">
                You can usually reschedule your move to another available slot. In many cases this
                is free if requested in advance; last-minute changes may attract a small rescheduling
                fee depending on availability and commitments already made.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                4. Refund Timeline
              </h2>
              <p className="text-sm text-muted-foreground">
                Approved refunds are usually processed back to your original payment method within
                5–7 business days, subject to your bank or payment provider&apos;s timelines.
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                5. Non‑Refundable Scenarios
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>No‑show at the pickup location after the team has arrived.</li>
                <li>Refusal to proceed after work has substantially started without valid reason.</li>
                <li>Bookings made under special non‑refundable promotions explicitly marked as such.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                6. Contact for Refund Support
              </h2>
              <p className="text-sm text-muted-foreground">
                For any questions or to request a refund review, please contact our billing support
                at <span className="font-medium text-foreground">8344415795</span> or write to{" "}
                <span className="font-medium text-foreground">hello@goshift.in</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

