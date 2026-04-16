import React, { useState } from "react";
import { MediaEpisode } from "../../api/media";

interface Props {
  episode: MediaEpisode;
}

export default function MediaEpisodeCard({ episode }: Props) {
  const [playing, setPlaying] = useState(false);

  const isYoutube = !!episode.youtube_embed_url;
  const isVideo = episode.media_type === "video" || episode.media_type === "both";
  const isAudio = episode.media_type === "audio" || episode.media_type === "both";

  // Miniature YouTube automatique si pas de thumbnail custom
  const thumbnail = episode.thumbnail
    ? episode.thumbnail
    : episode.youtube_video_id
    ? `https://img.youtube.com/vi/${episode.youtube_video_id}/hqdefault.jpg`
    : null;

  return (
    <article className="rounded-[20px] border border-[#e3d4c8] bg-white overflow-hidden
                        shadow-[0_8px_24px_rgba(120,78,52,0.05)] transition duration-300
                        hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(120,78,52,0.10)]">

      {/* ── Zone média ── */}
      {playing ? (
        /* ── Lecture active ── */
        <div className="relative">
          {isYoutube ? (
            /* YouTube embed */
            <iframe
              src={`${episode.youtube_embed_url}?autoplay=1&rel=0`}
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write;
                     encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video bg-black"
            />
          ) : isVideo && episode.media_url ? (
            /* Fichier vidéo direct */
            <video
              src={episode.media_url}
              controls
              autoPlay
              className="w-full aspect-video bg-black"
            />
          ) : isAudio && episode.media_url ? (
            /* Lecteur audio */
            <div className="bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a]
                            px-4 pt-5 pb-3">
              <div className="flex items-end justify-center gap-[3px] h-10 mb-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-ndiarama-text/60"
                    style={{
                      animation: `audioBar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <audio
                src={episode.media_url}
                controls
                autoPlay
                className="w-full"
              />
              <style>{`
                @keyframes audioBar {
                  from { height: 15%; }
                  to   { height: 90%; }
                }
              `}</style>
            </div>
          ) : null}

          {/* Bouton fermer */}
          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="absolute top-2 right-2 inline-flex items-center justify-center
                       h-7 w-7 rounded-full bg-black/50 text-white text-xs
                       backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      ) : (
        /* ── Thumbnail + bouton play ── */
        <div
          className="relative w-full aspect-video overflow-hidden cursor-pointer
                     bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a]"
          onClick={() => setPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
          aria-label={`Lire ${episode.title}`}
        >
          {/* Miniature */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt={episode.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition" />

          {/* Bouton play central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full
                            bg-white/90 text-ndiarama-text shadow-lg
                            transition hover:scale-110">
              {isVideo ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                </svg>
              )}
            </div>
          </div>

          {/* Badge type */}
          <span className="absolute top-3 left-3 inline-flex rounded-full
                           bg-black/35 px-2.5 py-1 text-[10px] uppercase
                           tracking-wide text-white backdrop-blur-sm">
            {isYoutube ? "YouTube" : isVideo ? "Vidéo" : "Audio"}
          </span>

          {/* Durée */}
          {episode.duration && (
            <span className="absolute bottom-3 right-3 inline-flex rounded-full
                             bg-black/35 px-2.5 py-1 text-[10px] text-white
                             backdrop-blur-sm font-medium">
              {episode.duration}
            </span>
          )}
        </div>
      )}

      {/* ── Infos ── */}
      <div className="px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-ndiarama-ink/55 mb-1">
          {episode.show_title}
        </p>
        <h3 className="text-sm font-semibold text-ndiarama-dark leading-snug">
          {episode.title}
        </h3>
        {episode.description && (
          <p className="mt-2 text-xs leading-5 text-ndiarama-ink/75 line-clamp-2">
            {episode.description}
          </p>
        )}

        {/* ✅ Boutons plateformes */}
        {(episode.spotify_url || episode.apple_podcast_url || episode.youtube_url) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {episode.youtube_url && !playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-red-300 hover:text-red-600"
              >
                ▶ YouTube
              </button>
            )}
            {episode.spotify_url && (
              <a
                href={episode.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-green-400 hover:text-green-600"
              >
                ♫ Spotify
              </a>
            )}
            {episode.apple_podcast_url && (
              <a
                href={episode.apple_podcast_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#e3d4c8]
                           bg-[#fdf9f7] px-2.5 py-1 text-[10px] font-medium
                           text-ndiarama-ink/70 transition hover:border-purple-400 hover:text-purple-600"
              >
                🎙 Apple
              </a>
            )}
          </div>
        )}

        {/* Date + bouton Lire/Fermer */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[10px] text-ndiarama-ink/45">
            {new Date(episode.published_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1 text-[10px] font-semibold
                       text-ndiarama-text transition hover:opacity-75"
          >
            {playing ? (
              "Fermer"
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Lire
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}