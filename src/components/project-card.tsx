import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl surface transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-400/30",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <ProjectCover
          project={project}
          priority={priority}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <span className="rounded-full border border-white/20 bg-ink-950/50 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-mist-100 uppercase backdrop-blur">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-mist-300">
            {project.year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight text-mist-100">
            {project.title}
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-mist-500 transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mist-100" />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-mist-400">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[10px] tracking-wide text-mist-500 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
