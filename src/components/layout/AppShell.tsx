import React, { useEffect, useState } from "react";
import type { AppRoute } from "../../types/shared";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";

interface AppShellProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenNewsletter: () => void;
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onNavigate,
  onOpenNewsletter,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  return (
    <div className="min-h-screen bg-[#f8f1eb] text-[#3d2a22]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-[#2b211d]"
      >
        Aller au contenu principal
      </a>

      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-24" : "lg:pl-72"
        }`}
      >
        <Header
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
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