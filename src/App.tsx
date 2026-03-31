import React, { useState } from "react";
import Home from "./pages/Home";
import Media from "./pages/Media";
import logo from "./assets/logo.jpg"; // ou .png selon ton fichier

const App: React.FC = () => {
  const [page, setPage] = useState<"home" | "media">("home");

  return (
    <div className="min-h-screen bg-ndiarama-bg">
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-ndiarama-light/40">
        {/* Logo + titre */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="NDIARAMA Media & Consulting"
            className="h-14 w-auto"
          />
          <span className="hidden sm:inline font-semibold text-lg tracking-[0.16em] text-ndiarama-text uppercase">
            NDIARAMA
          </span>
        </div>

        {/* Menu */}
        <nav className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setPage("home")}
            className={
              page === "home"
                ? "text-ndiarama-dark font-semibold border-b-2 border-ndiarama-medium pb-0.5"
                : "text-ndiarama-ink hover:text-ndiarama-dark"
            }
          >
            Accueil
          </button>
          <button
            onClick={() => setPage("media")}
            className={
              page === "media"
                ? "text-ndiarama-dark font-semibold border-b-2 border-ndiarama-medium pb-0.5"
                : "text-ndiarama-ink hover:text-ndiarama-dark"
            }
          >
            Media
          </button>
        </nav>
      </header>

      <main className="px-4 py-6 md:px-8 md:py-8">
        {page === "home" ? <Home /> : <Media />}
      </main>
    </div>
  );
};


export default App;
