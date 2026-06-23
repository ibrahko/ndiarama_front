import React from "react";

/**
 * Carte OpenStreetMap embarquee — aucune cle API requise.
 * Centree sur Sotuba ACI, Bamako, Mali (siege NDIARAMA).
 */
export default function ContactMap() {
  return (
    <div className="rounded-[22px] border border-[#e3d4c8] overflow-hidden shadow-[0_8px_24px_rgba(120,78,52,0.05)]">
      <p className="text-[10px] uppercase tracking-[0.22em] text-ndiarama-ink/50 px-4 pt-4 pb-2 bg-white">
        Localisation
      </p>

      <iframe
        title="Localisation NDIARAMA — Sotuba ACI, Bamako, Mali"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.9700%2C12.6300%2C-7.9300%2C12.6700&layer=mapnik&marker=12.6500%2C-7.9500"
        width="100%"
        height="220"
        loading="lazy"
        className="block border-0 w-full"
        aria-label="Carte de localisation NDIARAMA a Sotuba ACI, Bamako, Mali"
      />

      <div className="bg-white px-4 py-3 flex items-center gap-2">
        <span className="text-ndiarama-text text-xs" aria-hidden="true">📍</span>
        <span className="text-xs text-ndiarama-ink/70">Sotuba ACI, Bamako, Mali</span>
        <a
          href="https://www.openstreetmap.org/?mlat=12.6500&mlon=-7.9500#map=15/12.6500/-7.9500"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[10px] text-ndiarama-text underline hover:opacity-75 transition"
        >
          Agrandir
        </a>
      </div>
    </div>
  );
}
