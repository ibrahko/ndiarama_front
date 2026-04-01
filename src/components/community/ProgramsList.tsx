import React from "react";
import { ProgramHighlight } from "../../api/community";
import ProgramCard from "./ProgramCard";

interface Props {
  programs: ProgramHighlight[];
}

export default function ProgramsList({ programs }: Props) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-10 text-ndiarama-ink/60 text-sm">
        Les programmes seront bientôt disponibles.
      </div>
    );
  }

  return (
    <section id="programs" className="px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.26em] text-ndiarama-ink/55 mb-2">
            Programmes & initiatives
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
            {programs.length} programme{programs.length > 1 ? "s" : ""} disponible{programs.length > 1 ? "s" : ""}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}