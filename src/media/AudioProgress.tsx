import React, { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  src: string;
  title?: string;
  autoPlay?: boolean;
}

const fmt = (s: number): string => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

/**
 * Lecteur audio custom avec barre de progression interactive,
 * affichage du temps et animation waveform.
 * Ref CDC : "Indicateur de progression pour le contenu audio/video".
 */
export default function AudioProgress({ src, title, autoPlay = false }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]         = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [loading, setLoading]         = useState(true);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play().catch(() => {}); }
  }, [playing]);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [autoPlay]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) { audioRef.current.currentTime = time; setCurrentTime(time); }
  };

  return (
    <div className="rounded-[16px] bg-gradient-to-br from-[#ead7c9] via-[#f5ede7] to-[#d7b09a] px-4 py-4">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => { setDuration(audioRef.current?.duration ?? 0); setLoading(false); }}
      />

      {title && (
        <p className="mb-3 text-xs font-medium text-ndiarama-dark/80 line-clamp-1">{title}</p>
      )}

      {/* Waveform animee */}
      <div className="flex items-end justify-center gap-[3px] h-8 mb-3" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-ndiarama-text/60"
            style={playing
              ? { animation: `audioPulse 0.8s ease-in-out ${(i * 0.04).toFixed(2)}s infinite alternate` }
              : { height: "20%" }
            }
          />
        ))}
      </div>

      {/* Barre de progression */}
      <div className="relative mb-3 h-1.5">
        <div className="absolute inset-0 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full rounded-full bg-ndiarama-text transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.5}
          value={currentTime}
          onChange={handleSeek}
          disabled={loading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Barre de progression audio"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-valuetext={`${fmt(currentTime)} sur ${fmt(duration)}`}
        />
      </div>

      {/* Controles */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-ndiarama-dark/70 w-10 shrink-0">{fmt(currentTime)}</span>

        <button
          type="button"
          onClick={toggle}
          disabled={loading}
          className="mx-auto flex h-9 w-9 items-center justify-center rounded-full
                     bg-ndiarama-text text-white shadow-sm transition
                     hover:bg-ndiarama-dark active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={playing ? "Pause" : "Lecture"}
        >
          {loading ? (
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3"/>
              <path d="M12 3a9 9 0 0 1 9 9"/>
            </svg>
          ) : playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="4" height="18" rx="1"/>
              <rect x="15" y="3" width="4" height="18" rx="1"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>

        <span className="text-[11px] font-mono text-ndiarama-dark/70 w-10 shrink-0 text-right">{fmt(duration)}</span>
      </div>

      <style>{`
        @keyframes audioPulse { from { height: 15%; } to { height: 90%; } }
      `}</style>
    </div>
  );
}
