import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const BASE_TITLE = "NDIARAMA Media & Consulting";
const DEFAULT_DESCRIPTION =
  "NDIARAMA accompagne les jeunes africains vers les meilleures opportunités : bourses, leadership, médias et consulting.";
// VITE_SITE_URL permet de générer des URLs absolues pour og:image et canonical
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(selector: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const attrMatch = selector.match(/\[([^=]+)=["']?([^"'\]]+)/);
    if (attrMatch) el.setAttribute(attrMatch[1], attrMatch[2]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Composant SEO — met a jour document.title et les balises meta Open Graph /
 * Twitter Card de facon dynamique. Doit etre place en premier enfant de chaque page.
 * Ref CDC R10 : "SEO par page".
 */
export default function Seo({ title, description, image, url }: SeoProps) {
  const fullTitle =
    title === BASE_TITLE ? title : `${title} | ${BASE_TITLE}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const img = image ?? DEFAULT_IMAGE;
  // Canonical : utiliser VITE_SITE_URL en prod pour éviter les URLs localhost
  const canonical = url ?? `${SITE_URL}${window.location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    // Standard
    setMeta('meta[name="description"]', desc);

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:site_name"]', BASE_TITLE);

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "summary_large_image");
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', img);

    // Canonical
    setLink("canonical", canonical);
  }, [fullTitle, desc, img, canonical]);

  return null;
}
