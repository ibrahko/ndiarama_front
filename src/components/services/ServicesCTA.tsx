import React from "react";

export default function ServicesCTA() {
  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-9">
          <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-2">
                Travaillons ensemble
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white max-w-xl leading-snug">
                Un projet en tête ? Décrivons-le ensemble et construisons le bon accompagnement.
              </h2>
              <p className="mt-3 text-sm text-white/70 max-w-lg leading-relaxed">
                Chaque mission commence par une conversation. Nous identifions vos besoins, vos contraintes et vos ambitions pour proposer une intervention adaptée.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] bg-white px-5 py-3 text-xs font-semibold text-[#2b211d] transition hover:bg-[#f4ece6] whitespace-nowrap"
              >
                Nous contacter →
              </a>
              <a
                href="/community"
                className="inline-flex items-center justify-center rounded-[10px] border border-white/20 bg-transparent px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10 whitespace-nowrap"
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