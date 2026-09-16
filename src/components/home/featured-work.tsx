"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCover } from "@/components/project-cover";
import { useGsap } from "@/components/motion/use-gsap";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { projects } from "@/lib/projects";

/**
 * Selected work as a pinned horizontal-scroll gallery on desktop,
 * falling back to a calm vertical stack on mobile / reduced motion.
 */
export function FeaturedWork() {
  const sectionRef = useGsap<HTMLElement>((root) => {
    const section = root;
    if (!section) return;
    const track = section.querySelector<HTMLElement>("[data-work-track]");
    const bar = section.querySelector<HTMLElement>("[data-work-progress]");
    if (!track) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scrub the track horizontally.
    mm.add("(min-width: 768px)", () => {
      const getAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
        if (bar) gsap.set(bar, { scaleX: 0 });
      };
    });

    // Mobile: simple batched entrances, no pinning.
    mm.add("(max-width: 767px)", () => {
      gsap.set("[data-work-panel]", { y: 44, opacity: 0 });
      ScrollTrigger.batch("[data-work-panel]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative scroll-mt-24 border-y border-mist-100/10 bg-ink-900/40"
    >
      <div
        data-work-viewport
        className="overflow-hidden py-24 md:flex md:h-svh md:flex-col md:justify-center md:py-0 lg:py-0"
      >
        <Container className="mb-12 md:mb-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Three products we{" "}
                  <span className="text-brand-400 italic">actually run.</span>
                </>
              }
              description="Written from the code. Two of these only run on a local machine — we say so."
            />
            <div className="hidden shrink-0 flex-col items-end gap-3 md:flex">
              <span className="font-mono text-[10px] tracking-[0.24em] text-mist-500 uppercase">
                Scroll to explore
              </span>
              <span className="block h-px w-44 overflow-hidden bg-mist-100/15">
                <span
                  data-work-progress
                  className="block h-full origin-left scale-x-0 bg-brand-400"
                />
              </span>
            </div>
          </div>
        </Container>

        <div
          data-work-track
          className="flex flex-col gap-14 px-6 md:w-max md:flex-row md:items-start md:gap-10 md:px-10 lg:gap-14"
        >
          {projects.map((project, i) => (
            <article
              key={project.slug}
              data-work-panel
              className="md:w-[62vw] md:shrink-0 lg:w-[48vw] xl:w-[42vw]"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
                aria-label={`${project.title} — read the case study`}
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-mist-100/12 bg-ink-950">
                  <ProjectCover
                    project={project}
                    className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.24em] text-brand-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-mist-500 uppercase">
                    {project.category} — {project.year}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-mist-100 italic lg:text-[2.5rem] lg:leading-[1.05]">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-mist-400 lg:text-[15px]">
                  {project.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-mist-300 uppercase transition-colors duration-300 group-hover:text-brand-300">
                  Read the case study
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </article>
          ))}

          <div
            data-work-panel
            className="flex md:w-[26vw] md:shrink-0 md:items-center lg:w-[22vw]"
          >
            <Link
              href="/projects"
              className="group flex w-full flex-col justify-between gap-8 border border-mist-100/12 p-8 transition-colors duration-300 hover:border-brand-400/60 md:min-h-[24rem] lg:p-10"
            >
              <span className="font-mono text-[11px] tracking-[0.24em] text-mist-500 uppercase">
                Archive
              </span>
              <span>
                <span className="block font-display text-3xl font-medium tracking-[-0.03em] text-mist-100 italic lg:text-4xl">
                  Every build,
                  <br />
                  documented.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-brand-400 uppercase">
                  All projects
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
