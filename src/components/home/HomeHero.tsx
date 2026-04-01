import React from "react";
import { SiteSettings } from "../../api/home";

interface Props {
  settings: SiteSettings | null;
}

const poles = [
  {
    title: "Média",
    eyebrow: "Podcasts & émissions",
    icon: "●",
    accent: "from-[#f5e7dc] via-white to-[#ecd7c8]",
    badge: "Formats éditoriaux",
    text: "Podcasts, émissions et capsules vidéo qui informent, inspirent et valorisent les voix à impact.",
  },
  {
    title: "Formations",
    eyebrow: "Bootcamps & ateliers",
    icon: "▲",
    accent: "from-[#efe3da] via-white to-[#f5ebe4]",
    badge: "Montée en compétences",
    text: "Bootcamps et ateliers interactifs pour développer les soft skills et les compétences clés.",
  },
  {
    title: "Consulting",
    eyebrow: "Conseil stratégique",
    icon: "◆",
    accent: "from-[#f4e7df] via-white to-[#ead8cb]",
    badge: "Accompagnement premium",
    text: "Accompagnement stratégique, modération, animation et structuration de projets à forte portée.",
  },
  {
    title: "Communauté",
    eyebrow: "Opportunités & réseau",
    icon: "✦",
    accent: "from-[#f3e6dc] via-white to-[#ead6c6]",
    badge: "Écosystème engagé",
    text: "Un écosystème tourné vers les opportunités, les programmes internationaux et la montée en réseau.",
  },
];

export default function HomeHero({ settings }: Props) {
  return (
    <section className="px-4 pt-8 md:pt-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.05fr,0.95fr] items-center">
          <div>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-ndiarama-ink/65 mb-4">
              Studio média & consulting
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.02] font-semibold tracking-tight text-ndiarama-text max-w-3xl">
              {settings?.site_name ?? "NDIARAMA Media & Consulting"}
            </h1>
            <p className="mt-5 text-base md:text-xl leading-relaxed text-ndiarama-ink max-w-2xl">
              {settings?.hero_slogan ??
                "Une plateforme média et une agence de consulting pour inspirer, former et connecter les leaders de demain."}
            </p>
            {settings?.mission_text && (
              <p className="mt-4 text-sm md:text-base text-ndiarama-ink/80 max-w-2xl leading-relaxed">
                {settings.mission_text}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/media"
                className="inline-flex items-center justify-center rounded-[10px] bg-ndiarama-text px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 hover:-translate-y-0.5"
              >
                Découvrir nos émissions
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-[10px] border border-ndiarama-light/80 px-5 py-3 text-sm font-medium text-ndiarama-text bg-white/70 transition hover:bg-white hover:-translate-y-0.5"
              >
                Explorer nos services
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[32px] bg-[#d7b09a]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-[#d8c1b4] bg-[#ede2d9] shadow-[0_20px_60px_rgba(120,78,52,0.12)]">
              {settings?.hero_video_url ? (
                <video
                  src={settings.hero_video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[280px] w-full object-cover md:h-[540px]"
                />
              ) : (
                <div className="h-[280px] md:h-[540px] w-full bg-gradient-to-br from-[#ead7c9] via-[#f4ebe4] to-[#d7b09a] flex items-end">
                  <div className="p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-ndiarama-ink/60 mb-2">
                      Vision
                    </p>
                    <p className="text-lg md:text-2xl text-ndiarama-text font-medium max-w-md">
                      Inspirer, former et ouvrir l'accès aux opportunités internationales.
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/78 backdrop-blur px-4 py-3 border border-white/60">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ndiarama-ink/60">
                    NDIARAMA
                  </p>
                  <p className="text-sm font-medium text-ndiarama-text">
                    Média, formation, consulting, communauté
                  </p>
                </div>
                <span className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-ndiarama-text text-white text-sm">
                  ▶
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 PÔLES */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {poles.map((pole) => (
            <article
              key={pole.title}
              className={`group relative overflow-hidden rounded-[26px] border border-[#e8d8cd] bg-gradient-to-br ${pole.accent} p-[1px] shadow-[0_14px_35px_rgba(120,78,52,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(120,78,52,0.10)]`}
            >
              <div className="relative h-full rounded-[25px] bg-white/88 backdrop-blur px-5 py-5">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#d8b39d]/10 blur-2xl transition duration-300 group-hover:bg-[#c99878]/20" />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-ndiarama-ink/55 mb-2">
                      {pole.eyebrow}
                    </p>
                    <h3 className="text-[22px] leading-tight font-semibold text-ndiarama-text">
                      {pole.title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ead8cc] bg-[#fbf6f2] text-lg text-ndiarama-text shadow-sm">
                    {pole.icon}
                  </div>
                </div>
                <div className="mt-4 inline-flex rounded-full bg-[#f3e4d9] px-3 py-1 text-[11px] font-medium text-ndiarama-text">
                  {pole.badge}
                </div>
                <p className="mt-4 text-sm leading-6 text-ndiarama-ink/85">{pole.text}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.20em] text-ndiarama-ink/45">
                    Découvrir
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8cc] bg-white text-ndiarama-text transition group-hover:bg-ndiarama-text group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}