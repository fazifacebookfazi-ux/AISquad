"use client";

import { Container } from "@/components/ui/container";
import { useGsap } from "@/components/motion/use-gsap";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Tools live in production",
    note: "StartupAI Tools",
  },
  {
    value: 30,
    suffix: "",
    label: "Clips from a single upload",
    note: "EzClipper",
  },
  {
    value: 12,
    suffix: "",
    label: "Caption styles, AI-highlighted",
    note: "EzClipper",
  },
  {
    value: 7,
    suffix: "",
    label: "Caption languages supported",
    note: "EzClipper",
  },
];

export function StatsBand() {
  const ref = useGsap<HTMLElement>(() => {
    // Animated counters — transform/opacity-free, cheap text updates.
    const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.count || "0");
      const state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(state.v));
        },
      });
    });

    // Row entrances, batched.
    gsap.set("[data-stat]", { y: 28, opacity: 0 });
    ScrollTrigger.batch("[data-stat]", {
      start: "top 90%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
          overwrite: true,
        }),
    });
  });

  return (
    <section ref={ref} aria-label="Studio output in numbers">
      <Container>
        <dl className="grid grid-cols-2 gap-px bg-mist-100/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="flex flex-col gap-3 bg-ink-950 px-6 py-9 lg:px-8 lg:py-11"
            >
              <dd className="font-display text-5xl font-medium tracking-[-0.03em] text-mist-100 lg:text-6xl">
                <span data-count={stat.value}>{stat.value}</span>
                <span className="text-brand-400">{stat.suffix}</span>
              </dd>
              <dt className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-mist-400 uppercase">
                {stat.label}
              </dt>
              <p className="font-mono text-[10px] tracking-[0.14em] text-mist-500 uppercase">
                — {stat.note}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
