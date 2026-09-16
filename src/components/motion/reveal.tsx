"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "span" | "h2" | "p";

/**
 * GSAP scroll reveal — fades/slides content in once when it enters the
 * viewport. Skips animation entirely under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
