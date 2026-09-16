import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Bold project card — thick border, sticker category, hard hover lift. */
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
        "group relative flex overflow-hidden border-2 border-mist-100/12 bg-ink-900 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-[8px_8px_0_0_var(--color-brand-400)]",
        compact ? "flex-row" : "h-full flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b-2 border-mist-100/12",
          compact ? "w-[42%] min-w-[8.5rem] self-stretch border-r-2 border-b-0" : "aspect-16/10",
          featured && "aspect-[16/11] sm:aspect-[16/12]",
        )}
      >
        <ProjectCover
          project={project}
          priority={priority}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 -rotate-2 border-2 border-ink-950 bg-brand-400 px-2.5 py-1 font-mono text-[10px] font-black tracking-[0.14em] text-ink-950 uppercase">
          {project.category}
        </span>
        <span className="absolute top-4 right-4 bg-ink-950/85 px-2 py-1 font-mono text-[10px] font-bold text-mist-100">
          {project.year}
        </span>
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
              "font-display font-black tracking-tight text-mist-100",
              featured ? "text-3xl sm:text-4xl" : "text-xl",
              compact && "text-lg sm:text-xl",
            )}
          >
            {project.title}
          </h3>
          <span className="grid size-9 shrink-0 place-items-center border-2 border-mist-100/15 text-mist-400 transition-all duration-300 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink-950">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
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
                className="border border-mist-100/15 px-2 py-1 font-mono text-[10px] font-bold tracking-wide text-mist-500 uppercase"
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
