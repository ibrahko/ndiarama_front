import React from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS } from "../../utils/constants";

interface MobileMenuProps {
  isOpen: boolean;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentRoute,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fermer le menu mobile"
      />

      <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm border-l border-white/10 bg-[#2b211d] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#d8b7a4]">
              NDIARAMA
            </p>
            <h2 className="mt-1 text-sm font-semibold">Media & Consulting</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <nav className="px-4 py-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.key;

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.key);
                      onClose();
                    }}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-[#cc8a5f] bg-[#cc8a5f]/20 text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/60">
                      {item.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;