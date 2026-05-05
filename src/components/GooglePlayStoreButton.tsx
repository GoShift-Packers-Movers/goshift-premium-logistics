import googlePlayBadge from "@/assets/google_play.png";

type GooglePlayStoreButtonProps = {
  href: string;
  /** Identifies app in aria-label & optional caption (e.g. "Customer", "Driver", "Customer app") */
  label: string;
  variant: "onDark" | "onLight";
  /** Smaller badge (e.g. footer) */
  compact?: boolean;
  /** Visible caption under badge — useful when multiple badges appear side-by-side */
  showCaption?: boolean;
  className?: string;
};

export function GooglePlayStoreButton({
  href,
  label,
  variant,
  compact = false,
  showCaption = true,
  className = "",
}: GooglePlayStoreButtonProps) {
  const imgHeight = compact ? "h-9 sm:h-10" : "h-10 sm:h-12";

  const wrap =
    variant === "onDark"
      ? "rounded-xl ring-1 ring-primary-foreground/15 bg-black/25 p-1.5 hover:bg-black/40"
      : "rounded-xl ring-1 ring-border bg-background/80 p-1.5 shadow-sm hover:bg-muted/50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: Get it on Google Play`}
      className={`inline-flex flex-col items-center gap-1.5 transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`.trim()}
    >
      <span className={`inline-block rounded-lg overflow-hidden leading-none ${wrap}`}>
        <img
          src={googlePlayBadge}
          alt=""
          width={180}
          height={54}
          className={`w-auto ${imgHeight}`}
          decoding="async"
        />
      </span>
      {showCaption ? (
        <span
          className={`text-[11px] font-medium leading-tight ${
            variant === "onDark" ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
      ) : null}
    </a>
  );
}
