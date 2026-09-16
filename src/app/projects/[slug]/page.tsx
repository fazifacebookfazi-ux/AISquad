import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { LineReveal } from "@/components/motion/text-fx";
import { ProjectCover } from "@/components/project-cover";
import {
  getAdjacentProject,
  getProject,
  projects,
} from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Our role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Year", value: project.year },
  ];

  return (
    <>
      {/* ---- Header ---- */}
      <section className="relative overflow-hidden pt-36 pb-12 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        </div>
        <Container className="relative">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink-soft/70 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Eyebrow>{project.category}</Eyebrow>
            <span className="font-mono text-xs text-mute">{project.year}</span>
          </div>

          <LineReveal className="mt-6">
            <h1 className="display max-w-4xl text-balance-pretty text-[clamp(2.6rem,6.5vw,5rem)] text-ink">
              <span data-reveal-line>
                <span>{project.title}</span>
              </span>
            </h1>
          </LineReveal>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft/80">
            {project.intro}
          </p>

          {project.liveUrl || project.repoUrl ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
                >
                  Visit live site
                  <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-display text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Code2 className="size-4" />
                  Source code
                </a>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      {/* ---- Cover ---- */}
      <Container>
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px]">
            <ProjectCover
              project={project}
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
            />
          </div>
        </Reveal>
      </Container>

      {/* ---- Meta facts ---- */}
      <Container className="pt-12">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-2 bg-paper p-6">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                  {item.label}
                </dt>
                <dd className="text-[15px] leading-snug font-medium text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* ---- Narrative ---- */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.5fr_0.7fr] lg:gap-20">
            <div className="flex flex-col gap-16">
              <Reveal className="flex flex-col gap-5">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  The challenge
                </h2>
                <p className="text-xl leading-relaxed text-ink-soft/90">
                  {project.challenge}
                </p>
              </Reveal>

              <Reveal className="flex flex-col gap-7">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  What we did
                </h2>
                <ol className="flex flex-col gap-6">
                  {project.approach.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="display text-xl text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="flex-1 leading-relaxed text-ink-soft/80">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  The outcome
                </h2>
                <p className="text-xl leading-relaxed text-ink-soft/90">
                  {project.outcome}
                </p>
              </Reveal>

              <Reveal>
                <dl className="grid gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-2 bg-paper p-7">
                      <dd className="display text-3xl text-ink">
                        {metric.value}
                      </dd>
                      <dt className="text-sm leading-relaxed text-ink-soft/65">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
              <div className="card flex flex-col gap-5 p-7">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  Built with
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-3 text-[15px] text-ink-soft/85"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Next project ---- */}
      {next ? (
        <section className="border-t border-ink/12 py-16 lg:py-20">
          <Container>
            <Reveal>
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex flex-col gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                    Next project
                  </span>
                  <span className="display text-3xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {next.title}
                  </span>
                  <span className="max-w-md text-[15px] leading-relaxed text-ink-soft/70">
                    {next.summary}
                  </span>
                </span>
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-ink text-paper transition-all duration-300 group-hover:bg-accent group-hover:rotate-45">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}
    </>
  );
}
