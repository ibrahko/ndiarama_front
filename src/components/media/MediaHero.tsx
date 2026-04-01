import React from "react";

export default function MediaHero() {
  return (
    <section className="px-4 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">
            Studio média
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">
            Podcasts, émissions et capsules qui portent les voix à impact.
          </h1>
          <p className="mt-3 text-sm text-white/70 max-w-xl leading-relaxed">
            Retrouve tous nos formats audio et vidéo — écoute, regarde et partage.
          </p>
        </div>
      </div>
    </section>
  );
}