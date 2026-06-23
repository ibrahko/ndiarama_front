import React, { useRef, useState } from "react";
import { SiteSettings } from "../../api/home";

interface Props {
  settings: SiteSettings | null;
}

const poles = [
  { title: "Média",       eyebrow: "Podcasts & émissions",  icon: "●", href: "/media"     },
  { title: "Formations",  eyebrow: "Bootcamps & ateliers",  icon: "▲", href: "/services"  },
  { title: "Consulting",  eyebrow: "Conseil stratégique",   icon: "◆", href: "/services"  },
  { title: "Communauté",  eyebrow: "Réseau & opportunités", icon: "✦", href: "/community" },
];

export default function HomeHero({ settings }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else                         { videoRef.current.pause(); setPlaying(false); }
  };

  return (
    <section className="w-full bg-[#1a0d08]" aria-label="Accueil NDIARAMA">

      {/* ── Vidéo plein écran ── */}
      <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden">

        {settings?.hero_video_url ? (
          <video
            ref={videoRef}
            src={settings.hero_video_url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Vidéo de présentation NDIARAMA"
          />
        ) : (
          /* Placeholder waveform si pas de vidéo configurée */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#2a1a12" }}
            aria-hidden="true"
          >
            <div className="flex items-center gap-[3px] h-24 opacity-20">
              {[35,60,80,50,95,65,45,85,55,75,38,68,90,52,73,44,82,57,40,70].map((h, i) => (
                <span key={i} className="w-1 rounded-sm bg-ndiarama-text" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        )}

        {/* Overlay dégradé vers le bas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #1a0d08 0%, #1a0d0899 45%, transparent 100%)" }}
        />

        {/* Badge haut gauche */}
        <div className="absolute top-5 left-5 flex items-center gap-2 rounded-lg border border-ndiarama-text/20 bg-ndiarama-text/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ndiarama-medium animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-ndiarama-light">
            Studio média &amp; consulting
          </span>
        </div>

        {/* Bouton play/pause centré — affiché uniquement si vidéo présente */}
        {settings?.hero_video_url && (
          <button
            onClick={togglePlay}
            aria-label={playing ? "Mettre en pause" : "Lire la vidéo"}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ndiarama-text/40 bg-black/20 text-ndiarama-text transition group-hover:bg-black/40">
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginLeft: 3 }}>
                  <path d="M6 4l16 8-16 8z" />
                </svg>
              )}
            </span>
          </button>
        )}

        {/* ── Bloc texte en bas de la vidéo (données backend) ── */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-12 md:pb-10">

          {/* Eyebrow */}
          <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ndiarama-light/55">
            Studio média &amp; consulting · Bamako
          </p>

          {/* H1 — site_name depuis le backend (comme l'ancienne version) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-white">
            {settings?.site_name ?? "NDIARAMA Media & Consulting"}
          </h1>

          {/* Slogan — hero_slogan depuis le backend */}
          {(settings?.hero_slogan || !settings) && (
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ndiarama-light/80">
              {settings?.hero_slogan ??
                "Une plateforme média et une agence de consulting pour inspirer, former et connecter les leaders de demain."}
            </p>
          )}

          {/* Mission — mission_text depuis le backend (conditionnel) */}
          {settings?.mission_text && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              {settings.mission_text}
            </p>
          )}

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/media"
              className="inline-flex items-center justify-center rounded-lg bg-ndiarama-text px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 hover:-translate-y-0.5"
            >
              Découvrir nos émissions
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-ndiarama-text/30 bg-transparent px-5 py-3 text-sm font-medium text-ndiarama-light transition hover:bg-ndiarama-text/10"
            >
              Explorer nos services
            </a>
            {settings?.hero_video_url && (
              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/10"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 4l16 8-16 8z" />
                </svg>
                {playing ? "Pause" : "Play"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Barre 4 pôles ── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ borderTop: "1px solid rgba(233,193,164,0.12)" }}
      >
        {poles.map((pole, i) => (
          <a
            key={pole.title}
            href={pole.href}
            className="group flex items-center gap-3 px-5 py-4 transition hover:bg-ndiarama-text/8"
            style={{
              borderRight:
                i < poles.length - 1 ? "1px solid rgba(233,193,164,0.12)" : undefined,
            }}
          >
            <span
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm text-ndiarama-text"
              style={{ background: "rgba(198,148,112,0.12)" }}
            >
              {pole.icon}
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-[.14em] text-ndiarama-light/40">
                {pole.eyebrow}
              </p>
              <p className="text-sm font-semibold text-ndiarama-light">
                {pole.title}
              </p>
            </div>
            <span className="ml-auto text-[11px] text-ndiarama-text/30 transition group-hover:text-ndiarama-text">
              →
            </span>
          </a>
        ))}
      </div>

      {/* ── Mini bande info site ── */}
      <div
        className="flex items-center justify-between px-6 py-3 md:px-12"
        style={{
          background: "rgba(198,148,112,0.06)",
          borderTop: "1px solid rgba(233,193,164,0.10)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[.2em] text-ndiarama-light/35">
            NDIARAMA
          </span>
          <span className="text-ndiarama-text/20 text-xs">·</span>
          <span className="text-xs font-medium text-ndiarama-text/60">
            {settings?.site_name ?? "Media & Consulting"}
          </span>
        </div>
        <a
          href="/community"
          className="text-[10px] uppercase tracking-[.14em] text-ndiarama-text/45 transition hover:text-ndiarama-text"
        >
          Rejoindre la communauté →
        </a>
      </div>

    </section>
  );
}
