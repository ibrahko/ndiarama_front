import { useState, useEffect } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook de détection du breakpoint actif (mobile-first).
 *
 * Retourne true si la largeur d'écran est >= au breakpoint demandé.
 * Utilise ResizeObserver pour une mise à jour réactive sans dépendance externe.
 *
 * @example
 * const isDesktop = useBreakpoint("lg"); // true si width >= 1024 px
 *
 * @param bp - Breakpoint Tailwind : "sm" | "md" | "lg" | "xl"
 */
export function useBreakpoint(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(
    () => window.innerWidth >= BREAKPOINTS[bp]
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [bp]);

  return matches;
}

/**
 * Retourne true si le viewport est mobile (< 1024 px).
 *
 * @example
 * const isMobile = useIsMobile();
 */
export function useIsMobile(): boolean {
  return !useBreakpoint("lg");
}
