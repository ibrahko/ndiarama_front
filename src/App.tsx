// src/App.tsx

import React, { useEffect, useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Media from "./pages/Media";
import Services from "./pages/Services";
import NewsletterPopup from "./components/NewsletterPopup"; // ✅ ajout
import type { AppRoute } from "./types/shared";

const getRouteFromHash = (): AppRoute => {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (["home", "media", "services", "community", "contact"].includes(hash)) {
    return hash as AppRoute;
  }
  return "home";
};

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(getRouteFromHash());
  const [showNewsletter, setShowNewsletter] = useState(false); // ✅ ajout

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHashChange);

    if (!window.location.hash) {
      window.location.hash = "home";
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = (nextRoute: AppRoute) => {
    if (nextRoute === route) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = nextRoute;
  };

  const currentPage = useMemo(() => {
    switch (route) {
      case "media":     return <Media />;
      case "services":  return <Services />;
      case "community": return <Community />;
      case "contact":   return <Contact />;
      case "home":
      default:          return <Home />;
    }
  }, [route]);

  return (
    <>
      {/* ✅ Popup newsletter — en dehors de AppShell, persiste partout */}
      <NewsletterPopup
        forceOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
      />

      <AppShell
        currentRoute={route}
        onNavigate={handleNavigate}
        onOpenNewsletter={() => setShowNewsletter(true)} // ✅ passer au shell
      >
        {currentPage}
      </AppShell>
    </>
  );
};

export default App;