import React, { useState } from "react";
import { Service, ServiceCategory, CATEGORY_LABELS } from "../../api/services";
import ServiceCard from "./ServiceCard";

interface Props {
  services: Service[];
}

const ALL = "all" as const;
type FilterValue = typeof ALL | ServiceCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all",        label: "Tous" },
  { value: "consulting", label: CATEGORY_LABELS.consulting },
  { value: "program",    label: CATEGORY_LABELS.program },
  { value: "formation",  label: CATEGORY_LABELS.formation },
];

export default function ServicesList({ services }: Props) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all"
      ? services
      : services.filter((s) => s.category === filter);

  // Highlighted en premier
  const sorted = [...filtered].sort((a, b) =>
    a.is_highlighted === b.is_highlighted ? 0 : a.is_highlighted ? -1 : 1
  );

  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header + filtres ── */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-ndiarama-ink/55 mb-2">
              Nos services
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
              {filtered.length} service{filtered.length > 1 ? "s" : ""}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              // Masquer les filtres si aucun service dans cette catégorie
              const count =
                f.value === "all"
                  ? services.length
                  : services.filter((s) => s.category === f.value).length;
              if (f.value !== "all" && count === 0) return null;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    filter === f.value
                      ? "bg-ndiarama-text text-white"
                      : "border border-[#e3d4c8] bg-white text-ndiarama-ink hover:bg-[#faf6f2]"
                  }`}
                >
                  {f.label}
                  {f.value !== "all" && (
                    <span className={`ml-1.5 ${filter === f.value ? "text-white/70" : "text-ndiarama-ink/50"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grille ── */}
        {sorted.length === 0 ? (
          <p className="text-sm text-ndiarama-ink/60 text-center py-10">
            Aucun service pour cette catégorie.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}