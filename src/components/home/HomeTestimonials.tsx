import React, { useEffect, useState } from "react";
import { Testimonial } from "../../api/home";

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
  testimonials: Testimonial[];
}

export default function HomeTestimonials({ testimonials }: Props) {
  const slides = chunkArray(testimonials, 4);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const current = slides[active] ?? [];

  return (
    <section className="px-4 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <article className="rounded-[30px] border border-[#e3d4c8] bg-[#6d4a3c] px-6 py-7 md:px-8 md:py-8 text-white shadow-[0_16px_45px_rgba(70,34,16,0.18)]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/70 mb-2">Témoignages</p>
              <h2 className="text-2xl md:text-3xl font-semibold">Ce qu'on dit de nous</h2>
            </div>
            {slides.length > 1 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActive((p) => (p === 0 ? slides.length - 1 : p - 1))}
                  className="h-10 w-10 rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Précédent"
                >←</button>
                <button
                  type="button"
                  onClick={() => setActive((p) => (p === slides.length - 1 ? 0 : p + 1))}
                  className="h-10 w-10 rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Suivant"
                >→</button>
              </div>
            )}
          </div>

          {testimonials.length === 0 ? (
            <p className="text-sm text-white/80">Les témoignages seront bientôt disponibles.</p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {current.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[22px] border border-white/10 bg-white/[0.08] p-5"
                  >
                    <div className="flex items-center gap-3">
                      {item.photo ? (
                        <img
                          src={resolveMediaUrl(item.photo) ?? ""}
                          alt={item.name}
                          className="h-14 w-14 rounded-full object-cover border border-white/20 shrink-0"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base font-semibold text-white shrink-0">
                          {item.name?.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-white leading-snug">{item.name}</p>
                        {item.position && (
                          <p className="text-xs text-white/70 mt-0.5">{item.position}</p>
                        )}
                      </div>
                    </div>
                    <blockquote className="mt-4 text-sm leading-7 text-white/88">
                      "{item.message}"
                    </blockquote>
                  </article>
                ))}
              </div>

              {slides.length > 1 && (
                <div className="mt-6 flex items-center justify-between sm:justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActive((p) => (p === 0 ? slides.length - 1 : p - 1))}
                    className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  >Précédent</button>
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Groupe ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-2.5 bg-white/35"}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive((p) => (p === slides.length - 1 ? 0 : p + 1))}
                    className="sm:hidden inline-flex items-center justify-center rounded-[8px] border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  >Suivant</button>
                </div>
              )}

              <div className="mt-8 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.20em] text-white/55 mb-2">Pourquoi ils nous recommandent</p>
                <ul className="space-y-2 text-sm text-white/78">
                  {["Un accompagnement concret et progressif.", "Une identité éditoriale mieux structurée.", "Un plan de diffusion plus clair et plus impactant."].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}