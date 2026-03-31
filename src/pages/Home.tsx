import React, { useEffect, useMemo, useState } from "react";
import { fetchHome, HomePayload } from "../api/home";

const backendBaseUrl = "http://127.0.0.1:8000";

const resolveMediaUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${backendBaseUrl}${url}`;
};

const chunkArray = <T,>(items: T[], size: number): T[][] => {
  if (!items.length) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

export default function Home() {
  const [data, setData] = useState<HomePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTeamSlide, setActiveTeamSlide] = useState(0);

  useEffect(() => {
    fetchHome()
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement de la page d'accueil");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data?.testimonials?.length) return;

    const interval = window.setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === data.testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [data?.testimonials]);

  const poles = useMemo(
    () => [
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
    ],
    []
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">
        Chargement…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">
        Aucune donnée
      </div>
    );
  }

  const {
    settings,
    team,
    testimonials,
    shows,
    featured_episodes,
    highlighted_services,
  } = data;

  const currentTestimonial =
    testimonials.length > 0 ? testimonials[activeTestimonial] : null;

  const teamSlides = chunkArray(team, 2);
  const currentTeamMembers =
    teamSlides.length > 0 ? teamSlides[activeTeamSlide] : [];

  const goToPrevTeamSlide = () => {
    setActiveTeamSlide((prev) =>
      prev === 0 ? teamSlides.length - 1 : prev - 1
    );
  };

  const goToNextTeamSlide = () => {
    setActiveTeamSlide((prev) =>
      prev === teamSlides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      {/* HERO */}
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
                        Inspirer, former et ouvrir l’accès aux opportunités
                        internationales.
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

                  <p className="mt-4 text-sm leading-6 text-ndiarama-ink/85">
                    {pole.text}
                  </p>

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

      {/* SERVICES + EMISSIONS */}
      <section className="px-4 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <article className="rounded-[28px] border border-[#e3d4c8] bg-white px-6 py-7 md:px-8 md:py-8 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">
                  Services
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
                  Accompagnement premium
                </h2>
              </div>
            </div>

            {highlighted_services.length === 0 ? (
              <p className="text-sm text-ndiarama-ink/80">
                Les services seront bientôt détaillés.
              </p>
            ) : (
              <div className="space-y-5">
                {highlighted_services.slice(0, 3).map((service, index) => (
                  <div
                    key={service.id}
                    className={`pb-5 ${
                      index !== highlighted_services.slice(0, 3).length - 1
                        ? "border-b border-[#eee1d8]"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-ndiarama-dark">
                      {service.title}
                    </h3>
                    {service.short_description && (
                      <p className="mt-2 text-sm leading-6 text-ndiarama-ink/85">
                        {service.short_description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-[28px] border border-[#e3d4c8] bg-[#efe4db] px-6 py-7 md:px-8 md:py-8 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">
                Média
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
                Des formats qui portent les voix
              </h2>
            </div>

            {shows.length === 0 ? (
              <p className="text-sm text-ndiarama-ink/80">
                Les émissions seront bientôt présentées.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {shows.slice(0, 4).map((show) => (
                  <article
                    key={show.id}
                    className="overflow-hidden rounded-[22px] bg-white/90 border border-white/80"
                  >
                    {show.image ? (
                      <img
                        src={resolveMediaUrl(show.image) ?? ""}
                        alt={show.title}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a] flex items-end">
                        <div className="p-4">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-ndiarama-ink/60">
                            Émission
                          </p>
                          <p className="text-lg font-semibold text-ndiarama-text">
                            {show.title}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-ndiarama-dark">
                        {show.title}
                      </h3>

                      {show.tagline && (
                        <p className="mt-1 text-sm text-ndiarama-ink/80 leading-6">
                          {show.tagline}
                        </p>
                      )}

                      {show.episodes.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {show.episodes.slice(0, 3).map((ep, idx) => (
                            <li
                              key={ep.id}
                              className="flex items-start gap-2 text-sm text-ndiarama-ink/85"
                            >
                              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-ndiarama-text shrink-0" />
                              <span>
                                {idx + 1}. {ep.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      {/* EPISODES EN VEDETTE */}
      {featured_episodes.length > 0 && (
        <section className="px-4 pb-8 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">
                À la une
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
                Épisodes mis en avant
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featured_episodes.slice(0, 6).map((ep) => (
                <article
                  key={ep.id}
                  className="rounded-[24px] border border-[#e3d4c8] bg-white px-5 py-5 shadow-[0_10px_25px_rgba(120,78,52,0.04)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex rounded-full bg-[#f2e3d8] px-3 py-1 text-[11px] uppercase tracking-wide text-ndiarama-text">
                      {ep.media_type}
                    </span>
                    {ep.duration && (
                      <span className="text-xs text-ndiarama-ink/60">
                        {ep.duration}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-ndiarama-dark leading-snug">
                    {ep.title}
                  </h3>

                  {ep.description && (
                    <p className="mt-2 text-sm leading-6 text-ndiarama-ink/80 line-clamp-4">
                      {ep.description}
                    </p>
                  )}

                  <div className="mt-4">
                    <div className="h-1.5 w-full rounded-full bg-[#eadcd1] overflow-hidden">
                      <div className="h-full w-2/5 rounded-full bg-ndiarama-text" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EQUIPE + TEMOIGNAGES */}
      <section className="px-4 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1fr,0.95fr] items-start">
          <article className="rounded-[28px] border border-[#e3d4c8] bg-white px-6 py-7 md:px-8 md:py-8 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">
                  Équipe
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
                  Des profils engagés et complémentaires
                </h2>
              </div>

              {teamSlides.length > 1 && (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevTeamSlide}
                    aria-label="Voir les membres précédents"
                    className="h-10 w-10 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text transition hover:bg-white"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={goToNextTeamSlide}
                    aria-label="Voir les membres suivants"
                    className="h-10 w-10 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text transition hover:bg-white"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {team.length === 0 ? (
              <p className="text-sm text-ndiarama-ink/80">
                L&apos;équipe sera bientôt présentée.
              </p>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentTeamMembers.map((member) => (
                    <article
                      key={member.id}
                      className="overflow-hidden rounded-[22px] bg-[#faf6f2] border border-[#efe3da]"
                    >
                      {member.photo ? (
                        <img
                          src={resolveMediaUrl(member.photo) ?? ""}
                          alt={member.name}
                          className="h-56 w-full object-cover"
                        />
                      ) : (
                        <div className="h-56 w-full bg-gradient-to-br from-[#ead7c9] via-[#f8f1eb] to-[#d7b09a] flex items-center justify-center">
                          <div className="h-20 w-20 rounded-full bg-white/80 border border-[#e3d4c8] flex items-center justify-center text-2xl font-semibold text-ndiarama-text">
                            {member.name?.charAt(0)}
                          </div>
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="text-base font-semibold text-ndiarama-dark">
                          {member.name}
                        </h3>
                        <p className="text-sm text-ndiarama-ink/75 mt-1">
                          {member.role}
                        </p>

                        {member.short_bio && (
                          <p className="mt-3 text-sm leading-6 text-ndiarama-ink/80">
                            {member.short_bio}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {teamSlides.length > 1 && (
                  <div className="mt-5 flex items-center justify-between sm:justify-center gap-3">
                    <button
                      type="button"
                      onClick={goToPrevTeamSlide}
                      aria-label="Voir les membres précédents"
                      className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-[#e3d4c8] bg-white px-4 py-2 text-sm font-medium text-ndiarama-text"
                    >
                      Précédent
                    </button>

                    <div className="flex items-center gap-2">
                      {teamSlides.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          aria-label={`Afficher le groupe ${index + 1}`}
                          onClick={() => setActiveTeamSlide(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            index === activeTeamSlide
                              ? "w-8 bg-ndiarama-text"
                              : "w-2.5 bg-[#d3b8a8]"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={goToNextTeamSlide}
                      aria-label="Voir les membres suivants"
                      className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-[#e3d4c8] bg-white px-4 py-2 text-sm font-medium text-ndiarama-text"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            )}
          </article>

          <article className="rounded-[28px] border border-[#e3d4c8] bg-[#6d4a3c] px-6 py-7 md:px-8 md:py-8 text-white shadow-[0_16px_45px_rgba(70,34,16,0.18)] self-start">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/70 mb-2">
                Témoignages
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Ce qu’on dit de nous
              </h2>
            </div>

            {currentTestimonial ? (
              <>
                <div className="flex items-start gap-4 md:gap-5">
                  {currentTestimonial.photo ? (
                    <img
                      src={resolveMediaUrl(currentTestimonial.photo) ?? ""}
                      alt={currentTestimonial.name}
                      className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border border-white/20 shrink-0"
                    />
                  ) : (
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-semibold text-white shrink-0">
                      {currentTestimonial.name?.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <blockquote className="text-lg md:text-xl leading-relaxed text-white/95">
                      “{currentTestimonial.message}”
                    </blockquote>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="font-semibold text-white">
                    {currentTestimonial.name}
                  </p>
                  {currentTestimonial.position && (
                    <p className="text-sm text-white/75">
                      {currentTestimonial.position}
                    </p>
                  )}
                </div>

                {testimonials.length > 1 && (
                  <div className="mt-6 flex items-center gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Afficher le témoignage ${index + 1}`}
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeTestimonial
                            ? "w-8 bg-white"
                            : "w-2.5 bg-white/35"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-8 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.20em] text-white/55 mb-2">
                    Pourquoi ils nous recommandent
                  </p>
                  <ul className="space-y-2 text-sm text-white/78">
                    <li className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                      <span>Un accompagnement concret et progressif.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                      <span>Une identité éditoriale mieux structurée.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                      <span>Un plan de diffusion plus clair et plus impactant.</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-sm text-white/80">
                Les témoignages clients seront bientôt disponibles.
              </p>
            )}
          </article>
        </div>
      </section>

      {/* CONTACT RAPIDE / COMMUNAUTE */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto rounded-[32px] border border-[#e3d4c8] bg-gradient-to-r from-[#f2e4da] via-[#f8f4ef] to-[#ead7c9] px-6 py-8 md:px-10 md:py-10 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
          <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">
                Communauté & opportunités
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text max-w-2xl">
                Rejoignez une plateforme qui inspire, forme et connecte.
              </h2>
              <p className="mt-3 text-sm md:text-base text-ndiarama-ink/85 max-w-2xl leading-7">
                NDIARAMA accompagne les talents et les organisations à travers
                des contenus de qualité, des formations ciblées et des
                opportunités à fort impact.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/community"
                className="flex items-center justify-center rounded-[8px] bg-ndiarama-text px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Rejoindre la communauté
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center rounded-[8px] border border-[#d9c0b1] bg-white/80 px-5 py-3 text-sm font-medium text-ndiarama-text transition hover:bg-white"
              >
                Nous contacter
              </a>

              {(settings?.email || settings?.phone) && (
                <div className="pt-2 text-sm text-ndiarama-ink/75">
                  {settings?.email && <p>{settings.email}</p>}
                  {settings?.phone && <p>{settings.phone}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}