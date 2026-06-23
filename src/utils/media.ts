/**
 * Utilitaires pour la résolution des URLs médias backend.
 *
 * Utilise la variable d'environnement VITE_API_BASE_URL (définie dans .env)
 * pour construire les URLs absolues en développement et en production.
 *
 * @example
 * import { resolveMediaUrl } from "../../utils/media";
 * const src = resolveMediaUrl(photo);  // => "https://api.ndiarama.com/media/..."
 */

const BACKEND_BASE =
  (
    (import.meta as ImportMeta & { env: Record<string, string> }).env
      ?.VITE_API_BASE_URL ?? "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");

/**
 * Résout une URL de média relative en URL absolue.
 * Les URLs déjà absolues (http/https) sont retournées telles quelles.
 *
 * @param url - URL relative ou absolue issue du backend Django.
 * @returns URL absolue ou null si l'entrée est vide/nulle.
 */
export function resolveMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BACKEND_BASE}${url}`;
}
