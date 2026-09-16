import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectCover } from "@/components/project-cover";
import { ProjectCard } from "@/components/project-card";
import { CTA } from "@/components/home/cta";
import { Reveal } from "@/components/motion/reveal";
import { projects, getProject, getAdjacentProject } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study | AISquadX`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = getAdjacentProject(slug);

  return (
    <>
      <article className="pt-36 sm:pt-44">
        {/* Case-study header */}
        <Container>
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-mist-500 uppercase transition-colors hover:text-brand-400"
            >
              <ArrowLeft className="size-4" />
              All projects
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-8">
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{project.category}</Eyebrow>
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-mist-500 uppercase">
                  {project.year} · Case study
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] font-black tracking-[-0.03em] text-balance-pretty text-mist-100">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="max-w-2xl border-l-4 border-brand-400 pl-5 text-lg leading-relaxed text-mist-300">
                {project.intro}
              </p>
            </Reveal>

            {/* Facts strip */}
            <Reveal delay={0.2}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden border-2 border-mist-100/15 bg-mist-100/10 lg:grid-cols-4">
                <div className="bg-ink-900 p-5">
                  <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Role
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-mist-100">
                    {project.role}
                  </dd>
                </div>
                <div className="bg-ink-900 p-5">
                  <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Client
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-mist-100">
                    {project.client}
                  </dd>
                </div>
                <div className="bg-ink-900 p-5">
                  <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Duration
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-brand-400">
                    {project.duration}
                  </dd>
                </div>
                <div className="bg-ink-900 p-5">
                  <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Links
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border-2 border-mist-100/20 px-3 py-1 font-mono text-[10px] font-black tracking-[0.12em] text-mist-300 uppercase transition-colors hover:border-brand-400 hover:bg-brand-400 hover:text-ink-950"
                      >
                        Visit live
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border-2 border-mist-100/20 px-3 py-1 font-mono text-[10px] font-black tracking-[0.12em] text-mist-300 uppercase transition-colors hover:border-brand-400 hover:bg-brand-400 hover:text-ink-950"
                      >
                        Source
                      </a>
                    ) : null}
                    {!project.liveUrl && !project.repoUrl ? (
                      <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-mist-500 uppercase">
                        Runs locally
                      </span>
                    ) : null}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>

        {/* Big cover */}
        <Container className="mt-12">
          <Reveal>
            <div className="border-2 border-mist-100/15">
              <ProjectCover project={project} priority />
            </div>
          </Reveal>
        </Container>

        {/* Body */}
        <Container className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.55fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <Reveal>
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-[11px] font-black tracking-[0.2em] text-brand-400 uppercase">
                  The challenge
                </h2>
                <p className="text-base leading-relaxed text-mist-300">
                  {project.challenge}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-[11px] font-black tracking-[0.2em] text-brand-400 uppercase">
                  What we built
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.approach.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 border-l-4 border-brand-400/60 bg-ink-900 px-5 py-4 text-[15px] leading-relaxed text-mist-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="border-2 border-mist-100/12 bg-ink-900 p-7">
                <h2 className="font-mono text-[11px] font-black tracking-[0.2em] text-brand-400 uppercase">
                  Outcome
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mist-300">
                  {project.outcome}
                </p>
              </section>
            </Reveal>
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            {project.metrics.length > 0 ? (
              <Reveal>
                <section className="border-2 border-brand-400 bg-ink-900 p-7">
                  <h2 className="font-mono text-[11px] font-black tracking-[0.2em] text-brand-400 uppercase">
                    Results
                  </h2>
                  <dl className="mt-5 flex flex-col gap-5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="border-b-2 border-mist-100/10 pb-5 last:border-0 last:pb-0">
                        <dd className="font-display text-4xl font-black tracking-tight text-mist-100">
                          {metric.value}
                        </dd>
                        <dt className="mt-1 text-sm text-mist-400">{metric.label}</dt>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            ) : null}

            <Reveal delay={0.08}>
              <section className="border-2 border-mist-100/12 bg-ink-900 p-7">
                <h2 className="font-mono text-[11px] font-black tracking-[0.2em] text-mist-500 uppercase">
                  Stack
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="border border-mist-100/15 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide text-mist-300 uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </aside>
        </Container>

        {/* Prev / next */}
        <Container className="mt-20">
          <nav
            aria-label="More projects"
            className="grid gap-5 border-t-2 border-mist-100/10 pt-10 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-4 border-2 border-mist-100/12 bg-ink-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400"
              >
                <ArrowLeft className="size-6 shrink-0 text-brand-400 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>
                  <span className="block font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Previous
                  </span>
                  <span className="block font-display text-xl font-black tracking-tight text-mist-100">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center justify-end gap-4 border-2 border-mist-100/12 bg-ink-900 p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-brand-400"
              >
                <span>
                  <span className="block font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                    Next
                  </span>
                  <span className="block font-display text-xl font-black tracking-tight text-mist-100">
                    {next.title}
                  </span>
                </span>
                <ArrowRight className="size-6 shrink-0 text-brand-400 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : null}
          </nav>
        </Container>

        {/* More work */}
        <Container className="mt-16">
          <Reveal>
            <h2 className="font-display text-3xl font-black tracking-tight text-mist-100">
              More work
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects
              .filter((p) => p.slug !== project.slug)
              .slice(0, 2)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                  <ProjectCard project={p} compact className="h-full" />
                </Reveal>
              ))}
          </div>
          <Reveal className="mt-10 flex justify-center">
            <ButtonLink href="/projects" variant="secondary">
              View all projects
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </Container>

        <div className="mt-24">
          <CTA />
        </div>
      </article>
    </>
  );
}
