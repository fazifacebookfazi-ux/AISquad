import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCover } from "@/components/project-cover";
import { CTA } from "@/components/home/cta";
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
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
          <div
            className="absolute -top-48 left-1/2 size-[38rem] -translate-x-1/2 rounded-full opacity-20 blur-[150px]"
            style={{ backgroundColor: project.gradient[0] }}
          />
        </div>

        <Container className="relative">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-mist-400 transition-colors hover:text-mist-100"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <span className="rounded-full border border-mist-100/10 bg-mist-100/[0.04] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-mist-300 uppercase">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-mist-500">
              {project.year}
            </span>
          </div>

          <h1 className="mt-7 max-w-3xl font-display text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.04em] text-balance-pretty text-mist-100 sm:text-5xl lg:text-[3.75rem]">
            {project.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-balance-pretty text-mist-400">
            {project.intro}
          </p>

          {project.liveUrl || project.repoUrl ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-brand-400 px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-ink-950 uppercase transition-colors hover:bg-brand-300"
                >
                  Visit live site
                  <ExternalLink className="size-4" />
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full surface px-5 py-2.5 text-sm text-mist-100 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-brand-400/40"
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
          <div className="relative aspect-16/9 overflow-hidden border border-mist-100/12">
            <ProjectCover
              project={project}
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
            />
          </div>
        </Reveal>
      </Container>

      {/* ---- Meta + metrics ---- */}
      <Container className="pt-14">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mist-100/[0.07] bg-mist-100/[0.06] lg:grid-cols-4">
            {meta.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 bg-ink-950 p-6"
              >
                <dt className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                  {item.label}
                </dt>
                <dd className="text-[15px] leading-snug font-medium text-mist-100">
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
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  The challenge
                </h2>
                <p className="text-lg leading-relaxed text-mist-300">
                  {project.challenge}
                </p>
              </Reveal>

              <Reveal className="flex flex-col gap-7">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  What we did
                </h2>
                <ol className="flex flex-col gap-7">
                  {project.approach.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="font-display text-lg font-semibold text-brand-400/60 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="flex-1 leading-relaxed text-mist-400">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  The outcome
                </h2>
                <p className="text-lg leading-relaxed text-mist-300">
                  {project.outcome}
                </p>
              </Reveal>

              <Reveal>
                <dl className="grid gap-px overflow-hidden rounded-2xl border border-mist-100/[0.07] bg-mist-100/[0.06] sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col gap-2 bg-ink-900 p-7"
                    >
                      <dd className="font-display text-2xl font-semibold tracking-[-0.03em] text-mist-100">
                        {metric.value}
                      </dd>
                      <dt className="text-xs leading-relaxed text-mist-500">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Stack sidebar */}
            <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col gap-5 rounded-2xl surface p-7">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  Built with
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-3 text-sm text-mist-300"
                    >
                      <span className="size-1.5 rounded-full bg-brand-400/70" />
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
        <section className="border-t border-mist-100/[0.07] py-20">
          <Container>
            <Reveal>
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex flex-col gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                    Next project
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-mist-100 transition-colors duration-300 group-hover:text-brand-300 sm:text-4xl">
                    {next.title}
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-mist-400">
                    {next.summary}
                  </span>
                </span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-mist-100/10 text-mist-300 transition-all duration-500 ease-out-expo group-hover:border-brand-400/40 group-hover:bg-brand-500/10 group-hover:text-mist-100">
                  <ArrowRight className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <CTA />
    </>
  );
}
