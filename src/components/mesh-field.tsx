"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; phase: number; amp: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readCssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/**
 * Seeded nearest-neighbour field. Forty-eight points, same every load.
 * Pauses when the tab is hidden or the canvas is off-screen.
 */
export function MeshField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const host = canvas.parentElement;
    if (!host) return;

    const rand = mulberry32(0xa15cad);
    const nodes: Point[] = Array.from({ length: 48 }, () => ({
      x: rand(),
      y: rand(),
      phase: rand() * Math.PI * 2,
      amp: 0.008 + rand() * 0.018,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let inView = true;
    let pageVisible = document.visibilityState === "visible";

    const paint = (time: number) => {
      const brand = readCssColor("--brand-400", "#d4ff3a");
      const mist = readCssColor("--mist-100", "#f6f0e6");
      const t = reduced ? 0 : time * 0.00018;

      ctx.clearRect(0, 0, width, height);

      const pts = nodes.map((n) => ({
        x: (n.x + Math.sin(t + n.phase) * n.amp) * width,
        y: (n.y + Math.cos(t * 0.85 + n.phase) * n.amp) * height,
      }));

      ctx.lineWidth = 1;
      ctx.strokeStyle = brand;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          const max = Math.min(width, height) * 0.22;
          if (d > max) continue;
          ctx.globalAlpha = (1 - d / max) * 0.28;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = mist;
      for (const p of pts) {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!running) return;
      if (inView && pageVisible) paint(now);
      if (!reduced) frame = requestAnimationFrame(loop);
    };

    const fit = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(performance.now());
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    const onVis = () => {
      pageVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(fit);
    ro.observe(host);
    fit();
    if (!reduced) frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
    />
  );
}
