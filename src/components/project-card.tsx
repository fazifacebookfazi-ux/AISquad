import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  priority,
  featured,
  compact,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex overflow-hidden border border-mist-100/12 bg-ink-950 transition-colors duration-300 hover:border-brand-400/50",
        compact ? "flex-row" : "h-full flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          compact ? "w-[42%] min-w-[8.5rem] self-stretch" : "aspect-16/10",
          featured && "aspect-[16/11] sm:aspect-[16/12]",
        )}
      >
        <ProjectCover
          project={project}
          priority={priority}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {project.cover ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-brand-300 uppercase">
                {project.category}
              </span>
              <span className="font-mono text-[11px] text-mist-300">
                {project.year}
              </span>
            </div>
          </>
        ) : (
          <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.16em] text-mist-100">
            {project.year}
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2",
          compact ? "justify-center p-4 sm:p-5" : "gap-3 p-6 sm:p-7",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-display tracking-tight text-mist-100 italic",
              featured ? "text-3xl sm:text-4xl" : "text-xl",
              compact && "text-lg sm:text-xl",
            )}
          >
            {project.title}
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-mist-500 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-400" />
        </div>
        <p
          className={cn(
            "leading-relaxed text-mist-400",
            compact ? "line-clamp-2 text-xs sm:text-sm" : "flex-1 text-sm",
          )}
        >
          {project.summary}
        </p>
        {compact ? null : (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-mist-100/10 px-2 py-1 font-mono text-[10px] tracking-wide text-mist-500 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
