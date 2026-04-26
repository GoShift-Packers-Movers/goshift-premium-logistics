import { Link } from "react-router-dom";

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <section className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold text-foreground">
              GoShift - Account Deletion
            </h1>
          </div>

          <div className="rounded-2xl bg-card border border-border/60 p-6 lg:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Customer account deletion</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Open the GoShift Customer app</li>
              <li>Go to Profile</li>
              <li>Click on &quot;Delete Account&quot;</li>
            </ol>
            <h2 className="pt-2 text-lg font-semibold text-foreground">Driver account deletion</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Open the GoShift Driver app</li>
              <li>Go to Profile / Account Settings</li>
              <li>Click on &quot;Delete Account&quot;</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Alternatively, you can request account deletion by emailing:{" "}
              <span className="font-medium text-foreground">hello@goshift.in</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Please include your registered email or phone number and mention
              whether it is a customer or driver account.
            </p>
            <p className="text-sm text-muted-foreground">
              Your account and all associated data will be permanently deleted
              within 7 working days.
            </p>
            <p className="text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="text-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link to="/terms-of-service" className="text-accent hover:underline">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
