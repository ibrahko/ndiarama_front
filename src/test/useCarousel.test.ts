/**
 * Tests du hook useCarousel.
 * Verifie la navigation (next, prev, goTo), le reset et l'auto-avance.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "../hooks/useCarousel";

describe("useCarousel", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(()  => { vi.useRealTimers(); });

  it("demarre a l'index 0", () => {
    const { result } = renderHook(() => useCarousel(5));
    expect(result.current.active).toBe(0);
  });

  it("avance avec next()", () => {
    const { result } = renderHook(() => useCarousel(5));
    act(() => result.current.next());
    expect(result.current.active).toBe(1);
  });

  it("boucle en fin de liste avec next()", () => {
    const { result } = renderHook(() => useCarousel(3));
    act(() => { result.current.next(); result.current.next(); result.current.next(); });
    expect(result.current.active).toBe(0);
  });

  it("recule avec prev()", () => {
    const { result } = renderHook(() => useCarousel(5));
    act(() => { result.current.next(); result.current.next(); result.current.prev(); });
    expect(result.current.active).toBe(1);
  });

  it("boucle en debut de liste avec prev()", () => {
    const { result } = renderHook(() => useCarousel(3));
    act(() => result.current.prev());
    expect(result.current.active).toBe(2);
  });

  it("goTo() navigue vers l'index donne", () => {
    const { result } = renderHook(() => useCarousel(5));
    act(() => result.current.goTo(3));
    expect(result.current.active).toBe(3);
  });

  it("goTo() clamp les valeurs hors limites", () => {
    const { result } = renderHook(() => useCarousel(5));
    act(() => result.current.goTo(99));
    expect(result.current.active).toBe(4);
    act(() => result.current.goTo(-1));
    expect(result.current.active).toBe(0);
  });

  it("avance automatiquement avec l'intervalle", () => {
    const { result } = renderHook(() => useCarousel(4, 1000));
    expect(result.current.active).toBe(0);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.active).toBe(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.active).toBe(2);
  });

  it("ne demarre pas l'auto-avance si interval = 0", () => {
    const { result } = renderHook(() => useCarousel(4, 0));
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.active).toBe(0);
  });
});
