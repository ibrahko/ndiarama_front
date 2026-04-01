import React from "react";
import { ProgramHighlight } from "../../api/community";

const PROGRAM_ICONS = ["🌍", "⚡", "🏛️"];

interface Props {
  program: ProgramHighlight;
  index: number;
}

export default function ProgramCard({ program, index }: Props) {
  const icon = PROGRAM_ICONS[index % PROGRAM_ICONS.length];

  return (
    <article className="group relative rounded-[22px] border border-[#e3d4c8] bg-white overflow-hidden shadow-[0_8px_24px_rgba(120,78,52,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(120,78,52,0.09)]">

      {/* Accent top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8c543b] via-[#4b3027] to-[#2a1b17]" />

      <div className="px-5 py-5">
        {/* Icône + numéro */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-[10px] font-medium text-ndiarama-ink/40 uppercase tracking-wide">
            Programme {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Nom */}
        <h3 className="text-sm font-semibold text-ndiarama-dark leading-snug mb-2">
          {program.name}
        </h3>

        {/* Description */}
        <p className="text-xs leading-5 text-ndiarama-ink/80 line-clamp-3">
          {program.short_description}
        </p>

        {/* CTA */}
        {program.external_link && (
          <a
            href={program.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ndiarama-text transition hover:opacity-75 group-hover:gap-2.5"
          >
            En savoir plus
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        )}
      </div>
    </article>
  );
}