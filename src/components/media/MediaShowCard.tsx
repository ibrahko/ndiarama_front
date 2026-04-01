import React, { useState } from "react";
import { MediaShow } from "../../api/media";
import MediaEpisodeCard from "./MediaEpisodeCard";

const BASE = "http://127.0.0.1:8000";
const resolveUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BASE}${url}`;
};

interface Props {
  show: MediaShow;
}

const EPISODES_PER_SLIDE = 2;

export default function MediaShowCard({ show }: Props) {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const episodeCount = show.episodes.length;
  const totalSlides = Math.ceil(episodeCount / EPISODES_PER_SLIDE);

  const currentEpisodes = show.episodes.slice(
    slide * EPISODES_PER_SLIDE,
    slide * EPISODES_PER_SLIDE + EPISODES_PER_SLIDE
  );

  const prev = () => setSlide((p) => (p === 0 ? totalSlides - 1 : p - 1));
  const next = () => setSlide((p) => (p === totalSlides - 1 ? 0 : p + 1));

  return (
    <article className="rounded-[20px] border border-[#e3d4c8] bg-white overflow-hidden shadow-[0_6px_20px_rgba(120,78,52,0.05)] transition duration-300 hover:shadow-[0_10px_30px_rgba(120,78,52,0.08)]">

      {/* ── Cover compacte ── */}
      <div className="relative">
        {show.image ? (
          <img
            src={resolveUrl(show.image) ?? ""}
            alt={show.title}
            className="h-36 w-full object-cover"
          />
        ) : (
          <div className="h-36 w-full bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a] flex items-end">
            <div className="px-4 py-3">
              <p className="text-[9px] uppercase tracking-[0.22em] text-ndiarama-ink/60 mb-0.5">
                Émission
              </p>
              <p className="text-base font-semibold text-ndiarama-text leading-snug">
                {show.title}
              </p>
            </div>
          </div>
        )}
        <span className="absolute top-2 right-2 inline-flex rounded-full bg-ndiarama-text/85 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {episodeCount} ép.
        </span>
      </div>

      {/* ── Infos compactes ── */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-semibold text-ndiarama-dark leading-snug">
          {show.title}
        </h2>
        {show.tagline && (
          <p className="mt-0.5 text-xs text-ndiarama-ink/65 italic leading-snug">
            {show.tagline}
          </p>
        )}
        {show.description && (
          <p className="mt-1.5 text-xs leading-5 text-ndiarama-ink/75 line-clamp-2">
            {show.description}
          </p>
        )}

        {episodeCount > 0 && (
          <button
            type="button"
            onClick={() => { setOpen((p) => !p); setSlide(0); }}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ndiarama-text transition hover:opacity-75"
          >
            <span>{open ? "Masquer" : "Voir"} les épisodes</span>
            <span className={`transition-transform duration-200 text-[10px] ${open ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
        )}
      </div>

      {/* ── Épisodes carousel ── */}
      {open && (
        <div className="px-4 pb-4 border-t border-[#f0e6de] pt-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {currentEpisodes.map((ep) => (
              <MediaEpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text text-xs transition hover:bg-white"
                aria-label="Précédents"
              >
                ←
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slide ? "w-5 bg-ndiarama-text" : "w-1.5 bg-[#d3b8a8]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text text-xs transition hover:bg-white"
                aria-label="Suivants"
              >
                →
              </button>
            </div>
          )}

          <p className="mt-2 text-center text-[10px] text-ndiarama-ink/40">
            {slide * EPISODES_PER_SLIDE + 1}–
            {Math.min(slide * EPISODES_PER_SLIDE + EPISODES_PER_SLIDE, episodeCount)}{" "}
            sur {episodeCount} épisode{episodeCount > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </article>
  );
}