// src/components/layout/Footer.tsx

import React, { useState } from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS, SITE_META, SOCIAL_LINKS } from "../../utils/constants";
import { postNewsletter } from "../../api/communication";  // ✅ ajout

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenNewsletter: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenNewsletter }) => {
  // ✅ États formulaire footer
  const [footerEmail, setFooterEmail] = useState("");
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerSent, setFooterSent] = useState(false);
  const [footerError, setFooterError] = useState<string | null>(null);

  // ✅ Soumission connectée à l'API
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
      setFooterError("Cet email est peut-être déjà inscrit.");
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
            Plateforme média, programmes, consulting et communauté dédiée au
            développement des soft skills et à l'accès aux opportunités
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
              <li>
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
        </div>

        {/* Colonne 3 — Newsletter formulaire direct */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b7a4]">
            Newsletter express
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Reçois les opportunités, programmes et nouveautés média.
          </p>

          {/* ✅ Succès */}
          {footerSent ? (
            <div className="mt-5 rounded-xl bg-white/10 border border-white/20
                            px-4 py-4 text-sm text-white/90">
              ✓ Inscription confirmée ! Merci de rejoindre NDIARAMA.
            </div>
          ) : (
            /* ✅ Formulaire connecté */
            <form className="mt-5 space-y-3" onSubmit={handleFooterSubmit}>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full rounded-xl border border-white/10 bg-white/5
                           px-4 py-3 text-sm text-white placeholder:text-white/40
                           outline-none transition focus:border-[#cc8a5f]"
              />

              {/* ✅ Message erreur */}
              {footerError && (
                <p className="text-xs text-red-400">{footerError}</p>
              )}

              <button
                type="submit"
                disabled={footerLoading || !footerEmail}
                className="w-full rounded-xl bg-[#cc8a5f] px-4 py-3 text-sm
                           font-semibold text-white transition hover:bg-[#b27a54]
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {footerLoading ? "Inscription..." : "S'inscrire"}
              </button>
            </form>
          )}

          {/* Réseaux sociaux */}
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-2 text-xs
                           font-medium text-white/75 transition hover:border-white/20
                           hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5
                        text-xs text-white/50 sm:px-6 lg:flex-row lg:items-center
                        lg:justify-between lg:px-8">
          <p>© 2026 NDIARAMA Media & Consulting. Tous droits réservés.</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="transition hover:text-white"
            >
              Contact
            </button>
            {/* ✅ Ouvre le popup au lieu de naviguer */}
            <button
              type="button"
              onClick={onOpenNewsletter}
              className="transition hover:text-white"
            >
              Newsletter
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;