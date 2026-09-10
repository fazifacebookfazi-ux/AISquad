"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { MeshField } from "@/components/mesh-field";
import { ProjectCover } from "@/components/project-cover";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const stats = [
  { value: "100+", label: "Tools in StartupAI" },
  { value: "Offline", label: "Voice pipeline" },
  { value: "9:16", label: "Clips from long video" },
];

export function Hero({ year }: { year: number }) {
  const stack = projects.slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-10">
      <MeshField className="pointer-events-none absolute inset-0 opacity-55" />

      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
              Studio · Pakistan · {year}
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,8vw,5.4rem)] leading-[0.88] tracking-[-0.04em] text-mist-100">
              Work that
              <br />
              holds up
              <br />
              <span className="italic text-brand-400">in the hand.</span>
            </h1>

            <p className="mt-8 max-w-[38ch] text-[1.05rem] leading-[1.65] text-mist-400">
              AISquadX is a small engineering studio. We typeset interfaces,
              write the code that runs them, and ship websites, SaaS and tools
              you can put in front of a customer.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/projects" size="lg" variant="secondary">
                Selected work
              </ButtonLink>
            </div>
          </div>

          <ul className="relative flex list-none flex-col gap-3 lg:block lg:min-h-[28rem]">
            {stack.map((project, i) => (
              <li
                key={project.slug}
                className={cn(
                  "relative w-full lg:absolute lg:w-[74%]",
                  i === 0 && "lg:top-0 lg:left-0 lg:-rotate-[0.6deg]",
                  i === 1 &&
                    "lg:top-[4.6rem] lg:left-[2.4rem] lg:rotate-[1.4deg]",
                  i === 2 &&
                    "lg:top-[9.2rem] lg:left-[4.8rem] lg:-rotate-[1.1deg]",
                )}
                style={{ zIndex: i + 1 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden border border-mist-100/15 bg-ink-850 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-0 lg:bg-ink-950"
                >
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <ProjectCover project={project} sizes="420px" />
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-mist-100/10 bg-ink-950 px-4 py-3">
                    <span className="font-display text-lg tracking-tight text-mist-100 italic">
                      {project.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-mist-500 uppercase">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-16 grid grid-cols-1 border-t border-mist-100/10 sm:grid-cols-3 lg:mt-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 border-mist-100/10 py-6 sm:px-8 sm:not-first:border-l first:sm:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[2rem] tracking-tight text-mist-100 italic">
                {s.value}
              </dd>
              <p className="max-w-[16ch] text-sm leading-snug text-mist-500">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
