"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerGsap, prefersReducedMotion } from "./gsap-setup";
import { cn } from "@/lib/utils";

/**
 * Big statement text that illuminates word-by-word as you scroll through it.
 * Children should be plain text (markup inside words is not supported).
 */
export function Manifesto({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }
    const { gsap } = registerGsap();
    const words = el.querySelectorAll("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.6,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const words = children.split(" ");

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i} data-word className="inline-block">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Masked line reveal — each child line slides up inside its mask. */
export function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const lines = el.querySelectorAll("[data-reveal-line] > span");
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        yPercent: 110,
        duration: 1.1,
        delay,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
