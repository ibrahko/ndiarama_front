import React from "react";

export default function ServicesHero() {
  return (
    <section className="px-4 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">
            Nos services
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">
            Consulting, production et formation pour les projets à fort impact.
          </h1>
          <p className="mt-3 text-sm text-white/70 max-w-xl leading-relaxed">
            Des accompagnements sur mesure pour structurer, produire et diffuser ce qui compte vraiment.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Consulting", "Production", "Formation"].map((label) => (
              <span
                key={label}
                className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}