import React, { useRef, useState } from "react";
import { MediaEpisode } from "../../api/media";

interface Props {
  episode: MediaEpisode;
}

const cleanUrl = (url: string): string => {
  const match = url.match(/\[.*?\]\((.*?)\)/);
  if (match) return match[1];
  return url.trim();
};

export default function MediaEpisodeCard({ episode }: Props) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = episode.media_type === "video";
  const mediaUrl = cleanUrl(episode.media_url);

  // Aperçu vidéo au survol (muet, sans contrôles)
  const handleMouseEnter = () => {
    setHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Clic → lecture complète avec contrôles
  const handlePlay = () => setPlaying(true);

  return (
    <article className="rounded-[20px] border border-[#e3d4c8] bg-white overflow-hidden shadow-[0_8px_24px_rgba(120,78,52,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(120,78,52,0.10)]">

      {/* ── Zone média ── */}
      {playing ? (
        /* ── Lecture complète ── */
        isVideo ? (
          <div className="relative">
            <video
              src={mediaUrl}
              controls
              autoPlay
              className="w-full aspect-video bg-black"
              onError={(e) => console.error("Erreur vidéo :", mediaUrl, e)}
            />
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute top-2 right-2 inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm transition hover:bg-black/70"
              aria-label="Fermer le lecteur"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a] px-4 pt-5 pb-3">
            {/* Visualiseur audio animé */}
            <div className="flex items-end justify-center gap-[3px] h-10 mb-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-ndiarama-text/60"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animation: `audioBar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <audio
              src={mediaUrl}
              controls
              autoPlay
              className="w-full"
              onError={(e) => console.error("Erreur audio :", mediaUrl, e)}
            />
            <style>{`
              @keyframes audioBar {
                from { height: 15%; }
                to   { height: 90%; }
              }
            `}</style>
          </div>
        )
      ) : (
        /* ── Thumbnail + aperçu hover ── */
        <div
          className="relative w-full aspect-video bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a] overflow-hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePlay}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handlePlay()}
          aria-label={`Lire ${episode.title}`}
        >
          {/* Aperçu vidéo muet au survol */}
          {isVideo && (
            <video
              ref={videoRef}
              src={mediaUrl}
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Overlay sombre au survol */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`} />

          {/* Icône centrale play/audio */}
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${
            hovered ? "scale-110" : "scale-100"
          }`}>
            <div className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 ${
              hovered
                ? "bg-white text-ndiarama-text scale-105"
                : "bg-ndiarama-text/85 text-white"
            }`}>
              {isVideo ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              )}
            </div>
          </div>

          {/* Badge type */}
          <span className="absolute top-3 left-3 inline-flex rounded-full bg-black/35 px-2.5 py-1 text-[10px] uppercase tracking-wide text-white backdrop-blur-sm">
            {isVideo ? "Vidéo" : "Audio"}
          </span>

          {/* Durée */}
          {episode.duration && (
            <span className="absolute bottom-3 right-3 inline-flex rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm font-medium">
              {episode.duration} min
            </span>
          )}

          {/* Barre de progression simulée au survol */}
          <div className={`absolute bottom-0 left-0 h-[3px] bg-ndiarama-text transition-all duration-[3000ms] ${
            hovered ? "w-1/3" : "w-0"
          }`} />
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
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[10px] text-ndiarama-ink/45">
            {new Date(episode.published_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-ndiarama-text transition hover:opacity-75"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Lire
            </button>
          )}
          {playing && (
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="text-[10px] text-ndiarama-ink/50 underline underline-offset-2 transition hover:text-ndiarama-text"
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </article>
  );
}