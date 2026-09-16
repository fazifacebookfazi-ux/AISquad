"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useGsap } from "@/components/motion/use-gsap";
import { gsap } from "@/components/motion/gsap";

const steps = [
  {
    step: "01",
    title: "Discovery call",
    duration: "Day 1",
    description:
      "We dig into the problem, the audience and what success actually looks like. You leave with a clear scope and a fixed price — no vague estimates.",
  },
  {
    step: "02",
    title: "Design direction",
    duration: "Days 2–5",
    description:
      "Typography, colour, layout and motion come together into a direction you can see and react to before a single feature is built.",
  },
  {
    step: "03",
    title: "Build sprints",
    duration: "Weeks 1–3",
    description:
      "AI-assisted sprints with a live preview link from day one. You watch the product take shape and steer it as it goes.",
  },
  {
    step: "04",
    title: "Launch & care",
    duration: "Ongoing",
    description:
      "We handle deployment, domains, analytics and performance — then stay on for iterations once real users arrive.",
  },
];

export function Process() {
  const ref = useGsap<HTMLElement>(() => {
    // As each card stacks over the last, the covered card recedes.
    const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.45,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top 35%",
          scrub: true,
        },
      });
    });
  });

  return (
    <section
      ref={ref}
      id="process"
      className="relative scroll-mt-24 py-24 lg:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Method"
          title={
            <>
              Four stages. No{" "}
              <span className="text-brand-400 italic">theatre.</span>
            </>
          }
          description="Visible progress from the first week — not a six-week discovery deck."
        />

        <ol className="mt-14 flex flex-col gap-5 lg:mt-20">
          {steps.map((item, i) => (
            <li
              key={item.step}
              data-step-card
              className="sticky"
              style={{ top: `calc(5.5rem + ${i * 2.25}rem)` }}
            >
              <Reveal y={32}>
                <article className="grid gap-6 border border-mist-100/12 bg-ink-900 p-8 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)] sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
                  <span className="font-display text-6xl font-medium tracking-[-0.03em] text-mist-100/15 lg:text-7xl">
                    {item.step}
                  </span>
                  <span className="flex flex-col gap-2">
                    <h3 className="font-display text-3xl font-medium tracking-[-0.03em] text-mist-100 italic lg:text-4xl">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-brand-400 uppercase">
                      {item.duration}
                    </span>
                  </span>
                  <p className="max-w-xl text-sm leading-relaxed text-mist-400 lg:text-[15px]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
