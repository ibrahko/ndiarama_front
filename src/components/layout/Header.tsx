import React from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS, SITE_META } from "../../utils/constants";
import logo from "../../assets/logo.jpg"; 

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e7d8cf] bg-[#f8f1eb]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8c1b5] bg-white text-[#5b4033] shadow-sm lg:hidden"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 text-left"
            aria-label="Aller à l'accueil"
          >
            {/* LOGO */}
            <img
              src={logo}
              alt="NDIARAMA logo"
              className="h-14 w-auto object-contain"
            />

            {/* TEXTE */}
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#b27a54]">
                NDIARAMA
              </p>
              <h1 className="text-sm font-semibold text-[#3d2a22] sm:text-base">
                {SITE_META.name}
              </h1>
            </div>
          </button>
        </div>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navigation secondaire">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#b27a54] text-white"
                    : "text-[#5b4033] hover:bg-white hover:text-[#3d2a22]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="hidden rounded-full bg-[#2b211d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a2c26] lg:inline-flex"
        >
          Nous contacter
        </button>
      </div>
    </header>
  );
};

export default Header;