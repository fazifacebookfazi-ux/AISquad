"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "./gsap";

/**
 * Runs GSAP setup code inside a scoped gsap.context attached to `ref`.
 * The setup receives the root element and the context; everything created
 * inside (tweens, ScrollTriggers, matchMedia) is reverted on unmount.
 * Setup is skipped entirely when the user prefers reduced motion, so the
 * content renders in its final state with no animation.
 */
export function useGsap<T extends HTMLElement = HTMLElement>(
  setup: (root: T | null, ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) {
      // Mark the subtree so CSS can fall back to static layouts
      // (e.g. the horizontal work gallery becomes a vertical stack).
      ref.current?.setAttribute("data-reduced-motion", "");
      return;
    }
    const ctx = gsap.context((self) => {
      setup(ref.current, self);
    }, ref);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    // Re-measure once webfonts arrive — display type shifts layout.
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
    // Intentionally static: animations bind once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
