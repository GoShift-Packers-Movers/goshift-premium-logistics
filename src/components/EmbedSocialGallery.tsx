import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

const DATA_REF = import.meta.env.VITE_EMBEDSOCIAL_DATA_REF ?? "";
const SCRIPT_ID = "EmbedSocialHashtagScript";
const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_USERNAME ?? "go_shift";

/**
 * Renders the EmbedSocial hashtag widget. Set VITE_EMBEDSOCIAL_DATA_REF in .env.
 */
export default function EmbedSocialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasRealContent = (container: HTMLDivElement) => {
    const iframe = container.querySelector("iframe[src], iframe.embedsocial-hashtag-iframe");
    const feed = container.querySelector(".es-feed");
    return (
      (iframe != null && !!(iframe as HTMLIFrameElement).src) ||
      (feed != null && feed.children.length > 0)
    );
  };

  useEffect(() => {
    if (!DATA_REF || !containerRef.current) return;

    const container = containerRef.current;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const checkEmpty = () => {
      timeoutId = window.setTimeout(() => {
        setLoading(false);
        if (!hasRealContent(container)) setShowFallback(true);
      }, 4000);
    };

    const observer = new MutationObserver(() => {
      if (hasRealContent(container)) {
        setLoading(false);
        setShowFallback(false);
        if (timeoutId) window.clearTimeout(timeoutId);
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    if (document.getElementById(SCRIPT_ID)) {
      checkEmpty();
      return () => {
        observer.disconnect();
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = false;
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.onerror = () => {
      setShowFallback(true);
      setLoading(false);
    };
    script.onload = checkEmpty;
    document.getElementsByTagName("head")[0].appendChild(script);

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
      const el = document.getElementById(SCRIPT_ID);
      if (el?.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  if (!DATA_REF) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card p-4 sm:p-6">
      {loading && (
        <div className="flex min-h-[320px] w-full items-center justify-center text-muted-foreground">
          <span className="text-sm">Loading gallery…</span>
        </div>
      )}
      <div
        ref={containerRef}
        className={`embedsocial-hashtag min-h-[320px] w-full ${showFallback ? "hidden" : ""}`}
        data-ref={DATA_REF}
        aria-label="Instagram gallery"
      />
      {showFallback && (
        <div className="min-h-[280px] flex flex-col items-center justify-center rounded-xl bg-muted/40 py-12 px-6 text-center">
          <p className="text-muted-foreground mb-4">The embedded gallery could not be loaded. See our latest posts on Instagram.</p>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#E1306C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C13584] transition-colors"
          >
            <Instagram className="h-5 w-5" />
            Follow @{INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>
      )}
    </div>
  );
}
