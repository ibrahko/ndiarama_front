/**
 * Footer global — liens de navigation, reseaux sociaux,
 * formulaire newsletter express et mentions legales.
 * Connecte a l'API POST /api/communication/newsletter/.
 */
import React, { useState } from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS, SITE_META, SOCIAL_LINKS } from "../../utils/constants";
import { postNewsletter } from "../../api/communication";

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenNewsletter: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenNewsletter }) => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerSent, setFooterSent] = useState(false);
  const [footerError, setFooterError] = useState<string | null>(null);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail) return;
    setFooterLoading(true);
    setFooterError(null);
    try {
      await postNewsletter({ email: footerEmail, source: "footer" });
      setFooterSent(true);
      setFooterEmail("");
      localStorage.setItem("ndiarama_newsletter", "true");
    } catch {
      setFooterError("Cet email est peut-etre deja inscrit.");
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <footer className="border-t border-[#e5d7ce] bg-[#2b211d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6
                      lg:grid-cols-[1.2fr_0.9fr_1fr] lg:px-8">

        {/* Colonne 1 — Description */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d8b7a4]">
            NDIARAMA
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Media & Consulting
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Plateforme media, programmes, consulting et communaute dediee au
            developpement des soft skills et a l'acces aux opportunites
            internationales.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/75">
            <p>{SITE_META.address}</p>
            <p>{SITE_META.email}</p>
            <p>{SITE_META.phone}</p>
          </div>
        </div>

        {/* Colonne 2 — Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b7a4]">
            Navigation
          </h3>
          <ul className="mt-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.key)}
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="transition hover:text-white"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={onOpenNewsletter}
              className="block transition hover:text-white text-sm text-white/75"
            >
              Newsletter
            </button>
          </div>
        </div>

        {/* Colonne 3 — Newsletter */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b7a4]">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-white/70 leading-6">
            Recois les opportunites, contenus et programmes directement dans ta boite.
          </p>

          {footerSent ? (
            <p role="status" aria-live="polite" className="mt-4 text-sm text-[#d8b7a4]">
              ✓ Merci ! Tu es bien inscrit(e).
            </p>
          ) : (
            <form
              onSubmit={handleFooterSubmit}
              className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row"
              aria-label="Formulaire newsletter footer"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                disabled={footerLoading}
                className="flex-1 min-w-0 rounded-lg border border-white/15
                           bg-white/10 px-4 py-2.5 text-sm text-white
                           placeholder:text-white/35 focus:outline-none
                           focus:border-white/35 transition
                           disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={footerLoading || !footerEmail}
                className="shrink-0 rounded-lg bg-[#cc8a5f] px-5 py-2.5 text-xs
                           font-semibold text-white transition hover:bg-[#b8764e]
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {footerLoading ? "..." : "S'inscrire"}
              </button>
            </form>
          )}

          {footerError && (
            <p role="alert" className="mt-2 text-[11px] text-red-400">{footerError}</p>
          )}

          {/* Reseaux sociaux */}
          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#d8b7a4] mb-3">
              Reseaux
            </h4>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.icon ?? link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bas de footer — mentions legales */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between
                        gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NDIARAMA. Tous droits reserves.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("mentions-legales" as AppRoute)}
              className="transition hover:text-white/80"
            >
              Mentions legales
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate("politique-confidentialite" as AppRoute)}
              className="transition hover:text-white/80"
            >
              Confidentialite
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
