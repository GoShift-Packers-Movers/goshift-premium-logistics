import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  /** One or more JSON‑LD schema objects */
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
};

const APP_ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://goshift.in";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

export function Seo({ title, description, canonical, ogImage, type = "website", jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | GoShift`;
    document.title = fullTitle;

    // Basic description
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    // Open Graph
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: ogImage,
      });
    }
    if (canonical) {
      const url = canonical.startsWith("http") ? canonical : `${APP_ORIGIN}${canonical}`;
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: url,
      });
      // Canonical link
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    }

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    if (ogImage) {
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: ogImage,
      });
    }

    // JSON‑LD structured data
    // Remove previous injected scripts
    document
      .querySelectorAll('script[type="application/ld+json"][data-goshift-seo="true"]')
      .forEach((el) => el.parentElement?.removeChild(el));

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((data) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-goshift-seo", "true");
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical, ogImage, type, jsonLd]);

  return null;
}

