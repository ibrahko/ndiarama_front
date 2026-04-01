import React from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS, SITE_META, SOCIAL_LINKS } from "../../utils/constants";

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#e5d7ce] bg-[#2b211d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d8b7a4]">
            NDIARAMA
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Media & Consulting
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Plateforme média, programmes, consulting et communauté dédiée au
            développement des soft skills et à l’accès aux opportunités
            internationales.
          </p>

          <div className="mt-6 space-y-2 text-sm text-white/75">
            <p>{SITE_META.address}</p>
            <p>{SITE_META.email}</p>
            <p>{SITE_META.phone}</p>
          </div>
        </div>

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
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b7a4]">
            Newsletter express
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Reçois les opportunités, programmes et nouveautés média.
          </p>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              placeholder="Votre adresse email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#cc8a5f]"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#cc8a5f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b27a54]"
            >
              S’inscrire
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white/75 transition hover:border-white/20 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/50 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 NDIARAMA Media & Consulting. Tous droits réservés.</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="transition hover:text-white"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => onNavigate("community")}
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