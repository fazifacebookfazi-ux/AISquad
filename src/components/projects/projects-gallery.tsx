"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { projects, projectCategories } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | (typeof projectCategories)[number];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  // Only offer filters that actually match something.
  const filters = useMemo<Filter[]>(() => {
    const used = projectCategories.filter((category) =>
      projects.some((project) => project.category === category),
    );
    return ["All", ...used];
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <div className="flex flex-col gap-12">
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {filters.map((option) => {
          const active = option === filter;
          const count =
            option === "All"
              ? projects.length
              : projects.filter((p) => p.category === option).length;

          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(option)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300 ease-out-expo",
                active
                  ? "border-brand-400/40 bg-brand-500/12 text-mist-100"
                  : "border-mist-100/[0.08] bg-mist-100/[0.03] text-mist-400 hover:border-mist-100/20 hover:text-mist-100",
              )}
            >
              {option}
              <span
                className={cn(
                  "font-mono text-[10px]",
                  active ? "text-brand-300" : "text-mist-500",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduced}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "h-full",
                project.featured && filter === "All" && "lg:col-span-2",
              )}
            >
              <ProjectCard project={project} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="rounded-2xl surface p-10 text-center text-sm text-mist-400">
          Nothing here yet — more work coming soon.
        </p>
      ) : null}
    </div>
  );
}
