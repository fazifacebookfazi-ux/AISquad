"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { registerGsap, prefersReducedMotion } from "@/components/motion/gsap-setup";
import { ProjectCover } from "@/components/project-cover";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

function WorkCard({
  slug,
  index,
}: {
  slug: string;
  index: number;
}) {
  const project = projects.find((p) => p.slug === slug)!;
  const ref = useRef<HTMLElement>(null);
  const flipped = index % 2 === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const img = el.querySelector("[data-parallax-img]");
    const ctx = gsap.context(() => {
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Reveal y={48}>
      <article ref={ref}>
        <Link
          href={`/projects/${project.slug}`}
          className="group grid gap-6 lg:grid-cols-12 lg:gap-10"
          aria-label={`${project.title} — case study`}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[28px] lg:col-span-7",
              flipped && "lg:order-2",
            )}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div data-parallax-img className="absolute inset-0">
                <ProjectCover project={project} sizes="(min-width: 1024px) 60vw, 100vw" />
              </div>
            </div>
            <span className="absolute top-5 left-5 rounded-full bg-paper/90 px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-ink uppercase backdrop-blur">
              {project.category}
            </span>
          </div>

          <div
            className={cn(
              "flex flex-col justify-center gap-5 lg:col-span-5",
              flipped && "lg:order-1",
            )}
          >
            <span className="font-mono text-xs tracking-[0.18em] text-mute">
              {String(index + 1).padStart(2, "0")} — {project.year}
            </span>
            <h3 className="display text-[clamp(1.9rem,3.5vw,2.9rem)] text-ink transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <p className="max-w-md leading-relaxed text-ink-soft/75">
              {project.summary}
            </p>
            <span className="mt-2 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
              <span className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-all duration-300 ease-out-expo group-hover:bg-accent group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
              Read the case study
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

export function Work() {
  const order = ["startupai-tools", "ezclipper", "local-voice-enhancer"];

  return (
    <section id="work" className="scroll-mt-24 py-24 lg:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">
                Proof, not <span className="text-accent">promises.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="link-sweep font-display text-base font-semibold text-ink"
            >
              All projects
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
          {order.map((slug, i) => (
            <WorkCard key={slug} slug={slug} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
