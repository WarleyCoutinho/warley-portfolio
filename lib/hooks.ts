"use client";

import { useCallback, useSyncExternalStore } from "react";

/** `matchMedia` sem setState em effect (useSyncExternalStore). */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** `true` quando a página já rolou mais que `px` pixels. */
export function useScrolledPast(px: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > px,
    () => false,
  );
}
