/**
 * Tests du hook useSidebar.
 * Verifie les etats collapsed / mobileOpen et la fermeture automatique.
 */
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSidebar } from "../hooks/useSidebar";
import type { AppRoute } from "../types/shared";

describe("useSidebar", () => {
  it("collapsed = false par defaut", () => {
    const { result } = renderHook(() => useSidebar("home" as AppRoute));
    expect(result.current.collapsed).toBe(false);
  });

  it("toggleCollapse bascule collapsed", () => {
    const { result } = renderHook(() => useSidebar("home" as AppRoute));
    act(() => result.current.toggleCollapse());
    expect(result.current.collapsed).toBe(true);
    act(() => result.current.toggleCollapse());
    expect(result.current.collapsed).toBe(false);
  });

  it("mobileOpen = false par defaut", () => {
    const { result } = renderHook(() => useSidebar("home" as AppRoute));
    expect(result.current.mobileOpen).toBe(false);
  });

  it("openMobile / closeMobile fonctionnent", () => {
    const { result } = renderHook(() => useSidebar("home" as AppRoute));
    act(() => result.current.openMobile());
    expect(result.current.mobileOpen).toBe(true);
    act(() => result.current.closeMobile());
    expect(result.current.mobileOpen).toBe(false);
  });

  it("ferme le menu mobile lors d'un changement de route", () => {
    let route: AppRoute = "home";
    const { result, rerender } = renderHook(() => useSidebar(route));
    act(() => result.current.openMobile());
    expect(result.current.mobileOpen).toBe(true);
    route = "media";
    rerender();
    expect(result.current.mobileOpen).toBe(false);
  });
});
