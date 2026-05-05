import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { GooglePlayStoreButton } from "@/components/GooglePlayStoreButton";
import { Button } from "@/components/ui/button";

type MobileAppDownloadBlockProps = {
  title: string;
  benefit: string;
  playStoreUrl: string;
  /** Optional icon or small logo mark */
  icon: ReactNode;
  /** Bullet list of product features (e.g. on the dedicated Apps page) */
  features?: string[];
  /** Optional primary CTA shown below badge */
  showDownloadNowButton?: boolean;
};

export function MobileAppDownloadBlock({
  title,
  benefit,
  playStoreUrl,
  icon,
  features,
  showDownloadNowButton = false,
}: MobileAppDownloadBlockProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4 min-w-0">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{benefit}</p>
          </div>
        </div>
        <div className="shrink-0 sm:pt-1 flex flex-col items-start gap-2">
          <GooglePlayStoreButton
            href={playStoreUrl}
            label={title}
            variant="onLight"
            showCaption={false}
          />
          {showDownloadNowButton ? (
            <Button asChild size="sm" className="rounded-full px-5">
              <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download ${title} now`}>
                Download Now
              </a>
            </Button>
          ) : null}
        </div>
      </div>
      {features && features.length > 0 ? (
        <ul className="mt-6 grid gap-2.5 border-t border-border pt-6 sm:grid-cols-2">
          {features.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-snug">
              <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
