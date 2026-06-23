import React from "react";
import type { AppRoute } from "../../types/shared";
import { useSidebar } from "../../hooks/useSidebar";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
// import Sidebar from "./Sidebar";
// NOTE : Sidebar désactivée temporairement — décommenter si le client la demande.

interface AppShellProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenNewsletter: () => void;
  children: React.ReactNode;
}

/**
 * Coquille principale de l'application.
 * Gere la sidebar desktop, le menu mobile et le layout global.
 * Utilise le hook useSidebar pour l'etat collapsed / mobileOpen.
 */
const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onNavigate,
  onOpenNewsletter,
  children,
}) => {
  const { mobileOpen, openMobile, closeMobile } = useSidebar(currentRoute);

  return (
    <div className="min-h-screen bg-[#f8f1eb] text-[#3d2a22]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-[#2b211d]"
      >
        Aller au contenu principal
      </a>

      {/*
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
      */}

      <MobileMenu
        isOpen={mobileOpen}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onClose={closeMobile}
      />

      {/* Sans sidebar : pas de padding-left dynamique */}
      <div className="min-h-screen">
        <Header
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onOpenMobileMenu={openMobile}
        />

        <main id="main-content" className="min-h-[60vh]">
          {children}
        </main>

        <Footer onNavigate={onNavigate} onOpenNewsletter={onOpenNewsletter} />
      </div>
    </div>
  );
};

export default AppShell;
