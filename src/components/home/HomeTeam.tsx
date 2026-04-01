import React, { useState } from "react";
import { TeamMember } from "../../api/home";

const backendBaseUrl = "http://127.0.0.1:8000";
const resolveMediaUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${backendBaseUrl}${url}`;
};

const chunkArray = <T,>(items: T[], size: number): T[][] => {
  if (!items.length) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
};

interface Props {
  team: TeamMember[];
}

export default function HomeTeam({ team }: Props) {
  const slides = chunkArray(team, 4);
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setActive((p) => (p === slides.length - 1 ? 0 : p + 1));
  const current = slides[active] ?? [];

  return (
    <section className="px-4 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <article className="rounded-[28px] border border-[#e3d4c8] bg-white px-6 py-6 md:px-8 md:py-7 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-1.5">Équipe</p>
              <h2 className="text-xl md:text-2xl font-semibold text-ndiarama-text">
                Des profils engagés et complémentaires
              </h2>
            </div>
            {slides.length > 1 && (
              <div className="hidden sm:flex items-center gap-2">
                <button type="button" onClick={prev} aria-label="Précédent"
                  className="h-8 w-8 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text transition hover:bg-white text-sm">←</button>
                <button type="button" onClick={next} aria-label="Suivant"
                  className="h-8 w-8 rounded-full border border-[#e3d4c8] bg-[#faf6f2] text-ndiarama-text transition hover:bg-white text-sm">→</button>
              </div>
            )}
          </div>

          {team.length === 0 ? (
            <p className="text-sm text-ndiarama-ink/80">L&apos;équipe sera bientôt présentée.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {current.map((member) => (
                  <article key={member.id} className="overflow-hidden rounded-[18px] bg-[#faf6f2] border border-[#efe3da]">
                    {member.photo ? (
                      <img src={resolveMediaUrl(member.photo) ?? ""} alt={member.name}
                        className="h-36 w-full object-cover" />
                    ) : (
                      <div className="h-36 w-full bg-gradient-to-br from-[#ead7c9] via-[#f8f1eb] to-[#d7b09a] flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/80 border border-[#e3d4c8] flex items-center justify-center text-xl font-semibold text-ndiarama-text">
                          {member.name?.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="px-3 py-3">
                      <h3 className="text-sm font-semibold text-ndiarama-dark leading-snug">{member.name}</h3>
                      <p className="text-xs text-ndiarama-ink/70 mt-0.5">{member.role}</p>
                      {member.short_bio && (
                        <p className="mt-2 text-xs leading-5 text-ndiarama-ink/75 line-clamp-3">{member.short_bio}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {slides.length > 1 && (
                <div className="mt-4 flex items-center justify-between sm:justify-center gap-3">
                  <button type="button" onClick={prev}
                    className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-[#e3d4c8] bg-white px-3 py-1.5 text-xs font-medium text-ndiarama-text">
                    Précédent
                  </button>
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button key={i} type="button" onClick={() => setActive(i)}
                        aria-label={`Groupe ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${i === active ? "w-7 bg-ndiarama-text" : "w-2 bg-[#d3b8a8]"}`}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={next}
                    className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-[#e3d4c8] bg-white px-3 py-1.5 text-xs font-medium text-ndiarama-text">
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </article>
      </div>
    </section>
  );
}