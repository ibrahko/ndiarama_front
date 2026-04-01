import React from "react";
import type { AppRoute } from "../../types/shared";
import { NAV_ITEMS } from "../../utils/constants";

interface SidebarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 border-r border-white/10 bg-[#2b211d] text-white transition-all duration-300 ${
        collapsed ? "lg:w-24" : "lg:w-72"
      }`}
      aria-label="Navigation principale"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
          <div className={`${collapsed ? "hidden" : "block"}`}>
            <p className="text-xs uppercase tracking-[0.22em] text-[#d8b7a4]">
              NDIARAMA
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white">
              Media & Consulting
            </h2>
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={
              collapsed ? "Déplier la sidebar" : "Réduire la sidebar"
            }
          >
            <span className="text-lg">{collapsed ? "→" : "←"}</span>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.key;

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#cc8a5f] bg-[#cc8a5f]/20 text-white shadow-lg shadow-black/10"
                        : "border-transparent bg-white/0 text-white/80 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={item.label}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#cc8a5f]" />
                      <div className={`${collapsed ? "hidden" : "block"}`}>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs leading-5 text-white/60">
                          {item.description}
                        </p>
                      </div>
                      {collapsed && (
                        <span className="text-xs font-medium">
                          {item.shortLabel?.slice(0, 1)}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-4 py-5">
          <div className={`${collapsed ? "hidden" : "block"}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-[#d8b7a4]">
              Objectif
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Plateforme média, programmes, consulting et communauté engagée.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;