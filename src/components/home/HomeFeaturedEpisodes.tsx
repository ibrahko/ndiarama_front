import React from "react";
import { Episode } from "../../api/home";

interface Props {
  featured_episodes: Episode[];
}

export default function HomeFeaturedEpisodes({ featured_episodes }: Props) {
  if (featured_episodes.length === 0) return null;

  return (
    <section className="px-4 pb-8 md:pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">À la une</p>
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
                  <span className="text-xs text-ndiarama-ink/60">{ep.duration}</span>
                )}
              </div>
              <h3 className="text-base font-semibold text-ndiarama-dark leading-snug">{ep.title}</h3>
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
  );
}