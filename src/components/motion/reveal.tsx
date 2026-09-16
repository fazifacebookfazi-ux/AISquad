"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerGsap, prefersReducedMotion } from "./gsap-setup";
import { cn } from "@/lib/utils";

/** Fade-and-rise on scroll. Renders visible by default; JS animates in. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
