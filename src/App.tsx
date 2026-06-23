// src/App.tsx

import React, { useEffect, useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Media from "./pages/Media";
import Services from "./pages/Services";
import LegalNotices from "./pages/LegalNotices";
import NewsletterPopup from "./components/NewsletterPopup";
import type { AppRoute } from "./types/shared";

const VALID_ROUTES: AppRoute[] = ["home", "media", "services", "community", "contact", "legal"];

/**
 * Extrait la route depuis le pathname (History API).
 * "/" et "/home" → "home", "/media" → "media", etc.
 */
const getRouteFromPath = (): AppRoute => {
  const raw = window.location.pathname.replace(/^\//, "").toLowerCase() || "home";
  return (VALID_ROUTES.includes(raw as AppRoute) ? raw : "home") as AppRoute;
};

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(getRouteFromPath());
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    // Réécriture silencieuse de l'URL initiale si nécessaire
    const current = getRouteFromPath();
    const path = current === "home" ? "/" : `/${current}`;
    if (window.location.pathname !== path) {
      window.history.replaceState({}, "", path);
    }

    // Navigation navigateur (boutons Précédent / Suivant)
    const onPopState = () => {
      setRoute(getRouteFromPath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /**
   * Navigation interne — utilise pushState au lieu de window.location.hash.
   * Améliore l'indexation SEO par les crawlers (Google, Bing).
   */
  const handleNavigate = (nextRoute: AppRoute) => {
    if (nextRoute === route) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const path = nextRoute === "home" ? "/" : `/${nextRoute}`;
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPage = useMemo(() => {
    switch (route) {
      case "media":     return <Media />;
      case "services":  return <Services />;
      case "community": return <Community />;
      case "contact":   return <Contact />;
      case "legal":     return <LegalNotices />;
      case "home":
      default:          return <Home />;
    }
  }, [route]);

  return (
    <>
      <NewsletterPopup
        forceOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
      />
      <AppShell
        currentRoute={route}
        onNavigate={handleNavigate}
        onOpenNewsletter={() => setShowNewsletter(true)}
      >
        {currentPage}
      </AppShell>
    </>
  );
};

export default App;
