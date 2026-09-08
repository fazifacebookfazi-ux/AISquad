import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function displayUrl(project: Project) {
  if (project.liveUrl) {
    try {
      return new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      // Fall through to the internal path below.
    }
  }
  return `aisquadx.tech/projects/${project.slug}`;
}

/**
 * Renders a real screenshot when the project has one. Without one, it builds a
 * product showcase card instead — a browser mockup carrying the project name,
 * category and headline metrics. Sizes are in `cqw` so the same markup reads
 * correctly in a small grid card and a full-width case study hero.
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
  if (project.cover) {
    return (
      <div className={cn("absolute inset-0", className)}>
        <Image
          src={project.cover}
          alt={`${project.title} — project cover`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const [from, to] = project.gradient;
  const metrics = project.metrics.slice(0, 3);

  return (
    <div
      aria-hidden
      className={cn("@container absolute inset-0 overflow-hidden", className)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(150deg, ${from} 0%, ${to} 100%)`,
        }}
      />
      <div
        className="absolute -top-1/3 -right-1/4 size-[70cqw] rounded-full opacity-50 blur-[12cqw]"
        style={{ backgroundColor: to }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 size-[60cqw] rounded-full opacity-40 blur-[12cqw]"
        style={{ backgroundColor: from }}
      />
      <div className="absolute inset-0 bg-grid opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/25" />

      {/* Product window */}
      <div className="absolute inset-x-[6cqw] top-[9cqw] bottom-0">
        <div className="flex h-full flex-col overflow-hidden rounded-t-[2cqw] border border-white/20 bg-ink-950/75 shadow-[0_4cqw_8cqw_-2cqw_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Chrome */}
          <div className="flex shrink-0 items-center gap-[1.4cqw] border-b border-white/10 px-[2.4cqw] py-[1.8cqw]">
            <span className="flex gap-[0.8cqw]">
              <span className="size-[1.2cqw] rounded-full bg-white/25" />
              <span className="size-[1.2cqw] rounded-full bg-white/20" />
              <span className="size-[1.2cqw] rounded-full bg-white/15" />
            </span>
            <span className="ml-[1cqw] flex-1 truncate rounded-full bg-white/[0.07] px-[2cqw] py-[0.8cqw] font-mono text-[1.5cqw] text-white/55">
              {displayUrl(project)}
            </span>
          </div>

          {/* Content */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-[1.6cqw] px-[3.2cqw] py-[2.4cqw]">
            <span className="w-fit rounded-full border border-white/20 bg-white/[0.08] px-[1.8cqw] py-[0.7cqw] font-mono text-[1.4cqw] tracking-[0.16em] text-white/75 uppercase">
              {project.category}
            </span>

            {/* Not a heading element — the card and case study page own the
                real <h1>/<h3>, so this stays purely decorative. */}
            <span className="font-display text-[6.2cqw] leading-[1.02] font-semibold tracking-[-0.04em] text-white">
              {project.title}
            </span>

            {metrics.length > 0 ? (
              <dl className="mt-[1cqw] flex flex-wrap gap-[3.6cqw] border-t border-white/12 pt-[2.4cqw]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-[0.4cqw]">
                    <dd className="font-display text-[3cqw] leading-none font-semibold tracking-[-0.02em] text-white">
                      {metric.value}
                    </dd>
                    <dt className="text-[1.4cqw] leading-tight text-white/50">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
