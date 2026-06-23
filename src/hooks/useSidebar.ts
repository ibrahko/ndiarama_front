import { useState, useCallback, useEffect } from "react";
import type { AppRoute } from "../types/shared";

/**
 * Hook de gestion de la sidebar desktop et du menu mobile.
 *
 * - `collapsed`       : sidebar desktop réduite (icônes seules) ou étendue.
 * - `mobileOpen`      : menu mobile ouvert ou fermé.
 * - Fermeture automatique du menu mobile à chaque changement de route.
 *
 * @param currentRoute - Route active (ferme le menu mobile à chaque changement).
 * @returns            - États et fonctions de contrôle.
 *
 * @example
 * const { collapsed, toggleCollapse, mobileOpen, openMobile, closeMobile } =
 *   useSidebar(currentRoute);
 */
export function useSidebar(currentRoute: AppRoute) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = useCallback(
    () => setCollapsed((prev) => !prev),
    []
  );

  const openMobile  = useCallback(() => setMobileOpen(true),  []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /** Ferme le menu mobile à chaque changement de route. */
  useEffect(() => {
    setMobileOpen(false);
  }, [currentRoute]);

  return { collapsed, toggleCollapse, mobileOpen, openMobile, closeMobile };
}
