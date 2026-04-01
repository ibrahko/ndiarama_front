import React from "react";
import { MediaShow } from "../../api/media";
import MediaShowCard from "./MediaShowCard";

interface Props {
  shows: MediaShow[];
}

export default function MediaShowList({ shows }: Props) {
  if (shows.length === 0) {
    return (
      <div className="text-center py-16 text-ndiarama-ink/60 text-sm">
        Aucune émission disponible pour le moment.
      </div>
    );
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.26em] text-ndiarama-ink/55 mb-2">
            Nos émissions
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
            Tous les formats
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shows.map((show) => (
            <MediaShowCard key={show.id} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}