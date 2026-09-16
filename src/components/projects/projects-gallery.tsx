"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCover } from "@/components/project-cover";
import { projects, projectCategories } from "@/lib/projects";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = ["All", ...projectCategories];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<string>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
              filter === f
                ? "bg-ink text-paper"
                : "border border-ink/15 text-ink-soft hover:border-ink/40",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08} y={36}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block"
              aria-label={`${project.title} — case study`}
            >
              <div className="relative overflow-hidden rounded-[24px]">
                <div className="relative aspect-[4/3] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                  <ProjectCover project={project} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
                <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ink uppercase backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1 pt-5">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft/70">
                    {project.summary}
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
