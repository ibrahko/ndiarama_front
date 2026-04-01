import React, { useEffect, useState } from "react";
import { fetchSiteSettings, SiteSettings } from "../../api/core";

export default function ContactHero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSiteSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <section className="px-4 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">
            Nous contacter
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">
            Une idée, un projet, une question ? Parlons-en.
          </h1>
          <p className="mt-3 text-sm text-white/70 max-w-xl leading-relaxed">
            L'équipe NDIARAMA répond à toutes les demandes sérieuses dans un délai de 48h ouvrées.
          </p>
          {settings && (
            <div className="mt-6 flex flex-wrap gap-4">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2"
                >
                  <span className="text-white/60 text-xs">✉</span>
                  <span className="text-xs text-white/80">{settings.email}</span>
                </a>
              )}
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2"
                >
                  <span className="text-white/60 text-xs">📞</span>
                  <span className="text-xs text-white/80">{settings.phone}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}