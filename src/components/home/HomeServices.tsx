import React from "react";
import { Show, Service } from "../../api/home";

const backendBaseUrl = "http://127.0.0.1:8000";
const resolveMediaUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${backendBaseUrl}${url}`;
};

interface Props {
  shows: Show[];
  highlighted_services: Service[];
}

export default function HomeServices({ shows, highlighted_services }: Props) {
  return (
    <section className="px-4 py-14 md:py-20">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">

        {/* Services */}
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
            <p className="text-sm text-ndiarama-ink/80">Les services seront bientôt détaillés.</p>
          ) : (
            <div className="space-y-5">
              {highlighted_services.slice(0, 3).map((service, index) => (
                <div
                  key={service.id}
                  className={`pb-5 ${index !== 2 ? "border-b border-[#eee1d8]" : ""}`}
                >
                  <h3 className="text-lg font-semibold text-ndiarama-dark">{service.title}</h3>
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

        {/* Émissions */}
        <article className="rounded-[28px] border border-[#e3d4c8] bg-[#efe4db] px-6 py-7 md:px-8 md:py-8 shadow-[0_14px_40px_rgba(120,78,52,0.05)]">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-ndiarama-ink/60 mb-2">Média</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
              Des formats qui portent les voix
            </h2>
          </div>

          {shows.length === 0 ? (
            <p className="text-sm text-ndiarama-ink/80">Les émissions seront bientôt présentées.</p>
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
                        <p className="text-[10px] uppercase tracking-[0.22em] text-ndiarama-ink/60">Émission</p>
                        <p className="text-lg font-semibold text-ndiarama-text">{show.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-ndiarama-dark">{show.title}</h3>
                    {show.tagline && (
                      <p className="mt-1 text-sm text-ndiarama-ink/80 leading-6">{show.tagline}</p>
                    )}
                    {show.episodes.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {show.episodes.slice(0, 3).map((ep, idx) => (
                          <li key={ep.id} className="flex items-start gap-2 text-sm text-ndiarama-ink/85">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-ndiarama-text shrink-0" />
                            <span>{idx + 1}. {ep.title}</span>
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
  );
}