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

        {/* ✅ Liens plateformes du show */}
        {(show.youtube_channel_url || show.spotify_show_url || show.apple_podcast_url) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {show.youtube_channel_url && (
              <a
                href={show.youtube_channel_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-red-300
                           hover:text-red-600"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.8 12 22 12 22s4.2 0 6.8-.4c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                </svg>
                YouTube
              </a>
            )}
            {show.spotify_show_url && (
              <a
                href={show.spotify_show_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-green-400
                           hover:text-green-600"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
            )}
            {show.apple_podcast_url && (
              <a
                href={show.apple_podcast_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-purple-400
                           hover:text-purple-600"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4.8c1.6 0 2.9 1.3 2.9 2.9S13.6 10.6 12 10.6 9.1 9.3 9.1 7.7 10.4 4.8 12 4.8zm4.8 14.4H7.2c-.4 0-.8-.4-.6-.8L8.4 14c.1-.4.5-.6.9-.6h5.4c.4 0 .8.3.9.6l1.8 4.4c.2.4-.2.8-.6.8z"/>
                </svg>
                Apple
              </a>
            )}
          </div>
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