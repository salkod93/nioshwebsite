import { useEffect } from "react";

const OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/niosh-og-preview_c2b4e622.png";
const BASE_URL = "https://niosh.sa";

interface PageMetaProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Dynamically updates Open Graph and Twitter Card meta tags for each page.
 * Falls back to the static tags in index.html when the component unmounts.
 */
export default function PageMeta({ title, description, url, image }: PageMetaProps) {
  useEffect(() => {
    const ogImage = image ?? OG_IMAGE;
    const ogUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    // Page title
    document.title = title;

    // Standard meta
    setMeta("description", description, true);

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", ogUrl);
    setMeta("og:image", ogImage);

    // Twitter Card
    setMeta("twitter:title", title, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", ogImage, true);
  }, [title, description, url, image]);

  return null;
}
