import React from "react";

export default function CommunityHero() {
  return (
    <section className="px-4 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">
            Communauté NDIARAMA
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">
            Un écosystème pour les talents, les projets et les opportunités à fort impact.
          </h1>
          <p className="mt-3 text-sm text-white/70 max-w-xl leading-relaxed">
            Rejoins une communauté engagée de professionnels, créatifs et porteurs de projets connectés aux initiatives qui comptent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-[10px] bg-white px-5 py-2.5 text-xs font-semibold text-[#2b211d] transition hover:bg-[#f4ece6]"
            >
              Rejoindre la communauté
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/20 bg-transparent px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Voir les programmes →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}