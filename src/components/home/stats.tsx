"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { registerGsap, prefersReducedMotion } from "@/components/motion/gsap-setup";

const stats = [
  { value: 100, suffix: "+", label: "Tools live in StartupAI" },
  { value: 30, suffix: "", label: "Clips from a single upload" },
  { value: 12, suffix: "", label: "Caption styles in EzClipper" },
  { value: 7, suffix: "", label: "Caption languages supported" },
];

function Stat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = el.querySelector("[data-count]");
    if (!num) return;
    if (prefersReducedMotion()) {
      num.textContent = `${value}${suffix}`;
      return;
    }
    const { gsap } = registerGsap();
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          num.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div ref={ref} className="flex flex-col gap-2 px-2 py-8 sm:py-10">
      <span data-count className="display text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
        0{suffix}
      </span>
      <span className="max-w-[18ch] text-sm leading-snug text-ink-soft/65">{label}</span>
      <span aria-hidden className="mt-3 font-mono text-[10px] text-faint">
        /{String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="border-y border-ink/12 bg-paper-deep/60">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
