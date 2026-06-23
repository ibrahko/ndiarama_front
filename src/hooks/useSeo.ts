/**
 * useSeo — Hook de mise à jour dynamique du titre et des meta tags SEO.
 *
 * Pour la majorité des cas, préférez le composant <Seo /> (src/common/Seo.tsx)
 * qui s'intègre directement dans le JSX de la page.
 *
 * Ce hook expose la même logique pour les rares cas où vous avez besoin
 * d'appeler la mise à jour depuis une fonction ou un context provider.
 *
 * @example
 * // Utilisation composant (recommandée) :
 * <Seo title="Accueil" description="..." />
 *
 * // Utilisation hook (cas avancés) :
 * useSeo({ title: "Accueil", description: "..." });
 */

import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const BASE_TITLE = "NDIARAMA Media & Consulting";
const DEFAULT_DESCRIPTION =
  "NDIARAMA accompagne les jeunes africains vers les meilleures opportunites : bourses, leadership, medias et consulting.";
const DEFAULT_IMAGE = "/og-image.jpg";

function setMeta(selector: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[([^=]+)=["']?([^"'\]]+)/);
    if (m) el.setAttribute(m[1], m[2]);
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

export function useSeo({ title, description, image, url }: SeoOptions) {
  const fullTitle = title === BASE_TITLE ? title : `${title} | ${BASE_TITLE}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const img  = image ?? DEFAULT_IMAGE;
  const canonical = url ?? window.location.href.split("#")[0];

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:site_name"]', BASE_TITLE);
    setMeta('meta[name="twitter:card"]', "summary_large_image");
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', img);
    setLink("canonical", canonical);
  }, [fullTitle, desc, img, canonical]);
}
