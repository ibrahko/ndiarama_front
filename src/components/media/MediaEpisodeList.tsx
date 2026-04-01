import React, { useState } from "react";
import { MediaEpisode } from "../../api/media";
import MediaEpisodeCard from "./MediaEpisodeCard";

interface Props {
  episodes: MediaEpisode[];
}

const FILTERS = ["Tous", "video", "audio"] as const;
type Filter = (typeof FILTERS)[number];

const EPISODES_PER_PAGE = 9;

export default function MediaEpisodeList({ episodes }: Props) {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [page, setPage] = useState(0);

  const filtered =
    filter === "Tous"
      ? episodes
      : episodes.filter((ep) => ep.media_type === filter);

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setPage(0);
  };

  const totalPages = Math.ceil(filtered.length / EPISODES_PER_PAGE);
  const currentEpisodes = filtered.slice(
    page * EPISODES_PER_PAGE,
    page * EPISODES_PER_PAGE + EPISODES_PER_PAGE
  );

  const prev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const next = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header + filtres ── */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-ndiarama-ink/55 mb-2">
              Tous les épisodes
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
              {filtered.length} épisode{filtered.length > 1 ? "s" : ""}
            </h2>
          </div>

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => handleFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition capitalize ${
                  filter === f
                    ? "bg-ndiarama-text text-white"
                    : "border border-[#e3d4c8] bg-white text-ndiarama-ink hover:bg-[#faf6f2]"
                }`}
              >
                {f === "Tous" ? "Tous" : f === "video" ? "Vidéos" : "Audios"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grille épisodes ── */}
        {filtered.length === 0 ? (
          <p className="text-sm text-ndiarama-ink/60 text-center py-10">
            Aucun épisode pour ce filtre.
          </p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {currentEpisodes.map((ep) => (
                <MediaEpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#e3d4c8] bg-white text-ndiarama-text transition hover:bg-[#faf6f2]"
                    aria-label="Page précédente"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPage(i)}
                        aria-label={`Page ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                          i === page
                            ? "w-8 bg-ndiarama-text"
                            : "w-2.5 bg-[#d3b8a8]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#e3d4c8] bg-white text-ndiarama-text transition hover:bg-[#faf6f2]"
                    aria-label="Page suivante"
                  >
                    →
                  </button>
                </div>

                <p className="text-xs text-ndiarama-ink/50">
                  {page * EPISODES_PER_PAGE + 1}–
                  {Math.min(page * EPISODES_PER_PAGE + EPISODES_PER_PAGE, filtered.length)}{" "}
                  sur {filtered.length} épisode{filtered.length > 1 ? "s" : ""}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}