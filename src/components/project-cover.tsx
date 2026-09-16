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
 * Renders a real screenshot when the project has one. Without one, builds a
 * light, editorial product card in the new identity — paper browser window
 * on the project's gradient. Sizes in `cqw` so it reads at any scale.
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(140deg, ${from} 0%, ${to} 100%)`,
        }}
      />
      <div
        className="absolute -top-1/4 -right-1/4 size-[60cqw] rounded-full opacity-40 blur-[10cqw]"
        style={{ backgroundColor: "#ffffff" }}
      />
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Paper product window */}
      <div className="absolute inset-x-[6cqw] top-[10cqw] bottom-0">
        <div className="flex h-full flex-col overflow-hidden rounded-t-[2cqw] border border-black/10 bg-[#fffdf9] shadow-[0_4cqw_8cqw_-2cqw_rgba(20,20,18,0.35)]">
          <div className="flex shrink-0 items-center gap-[1.4cqw] border-b border-black/10 px-[2.4cqw] py-[1.8cqw]">
            <span className="flex gap-[0.8cqw]">
              <span className="size-[1.2cqw] rounded-full bg-[#141412]/15" />
              <span className="size-[1.2cqw] rounded-full bg-[#141412]/10" />
              <span className="size-[1.2cqw] rounded-full bg-[#141412]/10" />
            </span>
            <span className="ml-[1cqw] flex-1 truncate rounded-full bg-[#141412]/[0.06] px-[2cqw] py-[0.8cqw] font-mono text-[1.5cqw] text-[#141412]/55">
              {displayUrl(project)}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center gap-[1.6cqw] px-[3.2cqw] py-[2.4cqw]">
            <span className="w-fit rounded-full bg-[#2e3bff] px-[1.8cqw] py-[0.7cqw] font-mono text-[1.4cqw] tracking-[0.16em] text-white uppercase">
              {project.category}
            </span>

            {/* Decorative — the card and case study page own the real headings. */}
            <span className="font-display text-[6.4cqw] leading-[0.98] font-bold tracking-[-0.04em] text-[#141412]">
              {project.title}
            </span>

            {metrics.length > 0 ? (
              <dl className="mt-[1cqw] flex flex-wrap gap-[3.6cqw] border-t border-black/10 pt-[2.4cqw]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-[0.4cqw]">
                    <dd className="font-display text-[3cqw] leading-none font-bold tracking-[-0.02em] text-[#141412]">
                      {metric.value}
                    </dd>
                    <dt className="text-[1.4cqw] leading-tight text-[#141412]/55">
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
