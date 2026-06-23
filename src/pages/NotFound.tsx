import React from "react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-ndiarama-text mb-4">404</p>
      <h1 className="text-xl font-semibold text-ndiarama-dark mb-2">Page introuvable</h1>
      <p className="text-sm text-ndiarama-ink/70 mb-8">
        La page que vous cherchez n'existe pas ou a ete deplacee.
      </p>
      <button
        type="button"
        onClick={() => { window.location.hash = "home"; }}
        className="rounded-lg bg-ndiarama-text px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-ndiarama-dark"
      >
        Retour a l'accueil
      </button>
    </main>
  );
}
