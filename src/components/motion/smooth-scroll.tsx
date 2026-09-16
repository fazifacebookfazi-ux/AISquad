"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "./gsap";

let singleton: Lenis | null = null;

/** Access the active Lenis instance (null when reduced-motion or not mounted). */
export function getLenis(): Lenis | null {
  return singleton;
}

function scrollToHash(hash: string, immediate: boolean) {
  let el: Element | null = null;
  try {
    el = document.querySelector(hash);
  } catch {
    return;
  }
  if (!el || !(el instanceof HTMLElement)) return;

  const reduced = prefersReducedMotion();
  if (singleton && !reduced) {
    singleton.scrollTo(el, {
      offset: -72,
      immediate,
      duration: immediate ? 0 : 1.4,
    });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }

  // Move keyboard focus along for skip links and in-page anchors.
  if (!/^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}

/**
 * Client-side smooth scrolling (Lenis) wired into GSAP's ticker and
 * ScrollTrigger, plus same-page / cross-page hash-link handling.
 * Renders nothing — mount once inside the root layout's body.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const router = useRouter();
  const pendingHash = useRef<string | null>(null);

  // Boot Lenis once.
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    singleton = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      singleton = null;
    };
  }, []);

  // Intercept hash links so they glide through Lenis instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.hash) return;

      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        e.preventDefault();
        scrollToHash(url.hash, false);
      } else {
        // Cross-page: navigate first, scroll once the new route renders.
        e.preventDefault();
        pendingHash.current = url.hash;
        router.push(url.pathname + url.search + url.hash, { scroll: false });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // After every route change: honour a pending hash, otherwise start at top.
  useEffect(() => {
    const hash = pendingHash.current || window.location.hash;
    pendingHash.current = null;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (hash) {
          let target: Element | null = null;
          try {
            target = document.querySelector(hash);
          } catch {
            target = null;
          }
          if (target) {
            scrollToHash(hash, true);
            return;
          }
        }
        if (singleton) singleton.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }),
    );
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
