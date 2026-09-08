import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Renders a real screenshot when the project has one, and a generated
 * gradient placeholder when it doesn't — so the grid never looks unfinished.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} — project cover`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          />
          <div className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center"
          >
            <span className="font-display text-[clamp(2rem,6vw,4rem)] font-semibold tracking-[-0.04em] text-white/15">
              {project.title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
