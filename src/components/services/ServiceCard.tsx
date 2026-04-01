import React, { useState } from "react";
import { Service, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS } from "../../api/services";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[service.category] ?? CATEGORY_COLORS.consulting;
  const icon = service.icon || CATEGORY_ICONS[service.category] || "●";
  const label = CATEGORY_LABELS[service.category];

  return (
    <article className="rounded-[22px] border border-[#e3d4c8] bg-white overflow-hidden shadow-[0_8px_24px_rgba(120,78,52,0.05)] transition duration-300 hover:shadow-[0_14px_35px_rgba(120,78,52,0.09)] hover:-translate-y-0.5">

      {/* ── Header coloré ── */}
      <div className={`bg-gradient-to-br ${colors.bg} px-5 py-5`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-base text-white shrink-0">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            {service.is_highlighted && (
              <span className="inline-flex rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white">
                ★ En vedette
              </span>
            )}
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${colors.badge}`}>
              {label}
            </span>
          </div>
        </div>
        <h2 className="mt-3 text-sm font-semibold text-white leading-snug">
          {service.title}
        </h2>
      </div>

      {/* ── Contenu ── */}
      <div className="px-5 py-4">
        <p className="text-xs leading-5 text-ndiarama-ink/80">
          {service.short_description}
        </p>

        {/* Description complète dépliable */}
        {service.description && service.description !== service.short_description && (
          <>
            {expanded && (
              <p className="mt-3 text-xs leading-5 text-ndiarama-ink/70 border-t border-[#f0e6de] pt-3">
                {service.description}
              </p>
            )}
            <button
              type="button"
              onClick={() => setExpanded((p) => !p)}
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ndiarama-text transition hover:opacity-75"
            >
              <span>{expanded ? "Réduire" : "En savoir plus"}</span>
              <span className={`transition-transform duration-200 text-[10px] ${expanded ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="px-5 pb-4">
        <a
          href="/contact"
          className="inline-flex w-full items-center justify-center rounded-[10px] bg-ndiarama-text px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
        >
          Demander un accompagnement →
        </a>
      </div>
    </article>
  );
}