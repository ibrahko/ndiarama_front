import { useState, useEffect, useCallback } from "react";

/**
 * Hook générique de carrousel.
 *
 * @param length   - Nombre total de slides/groupes.
 * @param interval - Durée en ms entre chaque avance automatique (0 = désactivé).
 * @returns        - Index actif, fonctions de navigation et setter direct.
 *
 * @example
 * const { active, prev, next, goTo } = useCarousel(slides.length, 4500);
 */
export function useCarousel(length: number, interval = 0) {
  const [active, setActive] = useState(0);

  const prev = useCallback(
    () => setActive((i) => (i === 0 ? length - 1 : i - 1)),
    [length]
  );

  const next = useCallback(
    () => setActive((i) => (i === length - 1 ? 0 : i + 1)),
    [length]
  );

  const goTo = useCallback(
    (index: number) => setActive(Math.max(0, Math.min(index, length - 1))),
    [length]
  );

  /** Reset quand le nombre de slides change (ex. données chargées après coup). */
  useEffect(() => {
    setActive(0);
  }, [length]);

  /** Avance automatique — s'arrête si interval = 0 ou length <= 1. */
  useEffect(() => {
    if (!interval || length <= 1) return;
    const id = window.setInterval(next, interval);
    return () => window.clearInterval(id);
  }, [interval, length, next]);

  return { active, prev, next, goTo };
}
