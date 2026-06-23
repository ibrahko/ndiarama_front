/**
 * Page Mentions légales — éditeur, hébergement, propriété intellectuelle,
 * données personnelles, cookies, limitation de responsabilité.
 * Accessible depuis le footer (bouton "Mentions légales").
 */
import React from "react";
import Seo from "../common/Seo";

interface Section {
  title: string;
  content: string;
}

const SECTIONS: Section[] = [
  {
    title: "1. Éditeur du site",
    content:
      "Le site ndiarama.com est édité par NDIARAMA Media & Consulting, " +
      "agence spécialisée dans le développement des soft skills et " +
      "l'accompagnement vers les programmes internationaux. " +
      "Contact : contact@ndiarama.com",
  },
  {
    title: "2. Hébergement",
    content:
      "Le site est hébergé par Render Inc., 525 Brannan St, Suite 300, " +
      "San Francisco, CA 94107, États-Unis (https://render.com). " +
      "Le frontend est servi via CDN Vite/Render Static Sites.",
  },
  {
    title: "3. Propriété intellectuelle",
    content:
      "L'ensemble des contenus présents sur ce site (textes, images, logos, " +
      "podcasts, vidéos) sont la propriété exclusive de NDIARAMA Media & Consulting " +
      "ou de leurs auteurs respectifs. Toute reproduction, distribution ou " +
      "représentation sans autorisation préalable est interdite.",
  },
  {
    title: "4. Données personnelles",
    content:
      "Les données collectées via les formulaires (newsletter, contact) sont " +
      "utilisées uniquement pour vous contacter et vous envoyer nos communications. " +
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification " +
      "et de suppression de vos données. Pour exercer ces droits : contact@ndiarama.com.",
  },
  {
    title: "5. Cookies",
    content:
      "Ce site utilise uniquement des cookies techniques essentiels au " +
      "fonctionnement (préférence de navigation). Aucun cookie publicitaire " +
      "ou de tracking tiers n'est déposé sans votre consentement.",
  },
  {
    title: "6. Limitation de responsabilité",
    content:
      "NDIARAMA Media & Consulting s'efforce de maintenir les informations " +
      "publiées à jour et exactes. Toutefois, nous ne saurions être tenus " +
      "responsables des erreurs, omissions ou de l'indisponibilité temporaire " +
      "du site. Les liens externes sont fournis à titre informatif uniquement.",
  },
];

export default function LegalNotices() {
  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      <Seo
        title="Mentions légales"
        description="Mentions légales du site NDIARAMA Media & Consulting."
      />

      {/* Hero */}
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.28em] text-ndiarama-ink/55 mb-2">
            Informations légales
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-ndiarama-text leading-snug">
            Mentions légales
          </h1>
          <p className="mt-4 text-sm text-ndiarama-ink/70 leading-relaxed max-w-xl">
            Conformément aux dispositions légales en vigueur, voici les informations
            relatives à l'éditeur, à l'hébergement et à l'utilisation des données
            personnelles sur ce site.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-8">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-[20px] border border-[#e3d4c8] bg-white px-6 py-6 md:px-8 md:py-7
                         shadow-[0_4px_16px_rgba(120,78,52,0.04)]"
            >
              <h2 className="text-base font-semibold text-ndiarama-dark mb-3">
                {section.title}
              </h2>
              <p className="text-sm leading-7 text-ndiarama-ink/80">{section.content}</p>
            </div>
          ))}

          {/* Retour */}
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => { window.location.hash = "home"; }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#e3d4c8]
                         bg-white px-5 py-2.5 text-sm font-medium text-ndiarama-text
                         transition hover:border-ndiarama-medium hover:bg-[#f9f4f0]"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
