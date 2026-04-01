import React from "react";
import { SiteSettings } from "../../api/home";

interface Props {
  settings: SiteSettings | null;
}

export default function HomeCommunity({ settings }: Props) {
  return (
    <section className="px-4 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto rounded-[42px] border border-[#4b3329]/10 bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-6 py-7 md:px-10 md:py-9 shadow-[0_20px_60px_rgba(70,34,16,0.16)]">
        <div className="grid gap-6 md:grid-cols-[1.15fr,0.85fr] md:items-center">

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">
              Communauté & opportunités
            </p>
            <h2 className="max-w-2xl text-xl sm:text-2xl md:text-[26px] leading-[1.3] font-semibold tracking-tight text-white">
              NDIARAMA accompagne les talents et les organisations à travers
              des contenus de qualité, des formations ciblées et des
              opportunités à fort impact.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
              Rejoins l'écosystème NDIARAMA pour rester connecté aux
              programmes, aux contenus et aux initiatives qui comptent.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/12 bg-white/10 px-5 py-5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/60 mb-4">
              Contact direct
            </p>

            <div className="space-y-2 text-white">
              {settings?.email && (
                <p className="text-sm font-medium leading-snug">
                  {settings.email}
                </p>
              )}
              {settings?.phone && (
                <p className="text-sm font-medium leading-snug text-white/85">
                  {settings.phone}
                </p>
              )}
              {settings?.address && (
                <p className="text-sm font-medium leading-snug text-white/75">
                  {settings.address}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] bg-white px-4 py-2.5 text-xs font-semibold text-[#2b211d] transition hover:bg-[#f4ece6]"
              >
                Nous contacter
              </a>
              <a
                href="/community"
                className="inline-flex items-center justify-center rounded-[10px] border border-white/18 bg-transparent px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Explorer la communauté
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}