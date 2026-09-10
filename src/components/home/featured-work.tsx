import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export function FeaturedWork() {
  const [lead, ...rest] = projects.slice(0, 3);

  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-y border-mist-100/10 bg-ink-900/50 py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Three products we{" "}
                <span className="italic text-brand-400">actually run.</span>
              </>
            }
            description="Written from the code. Two of these only run on a local machine — we say so."
          />
          <Reveal delay={0.15}>
            <ButtonLink href="/projects" variant="secondary">
              All projects
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        {lead ? (
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ProjectCard project={lead} featured />
            </Reveal>
            <div className="flex flex-col gap-5 lg:col-span-5">
              {rest.map((project, i) => (
                <Reveal key={project.slug} delay={0.08 + i * 0.06}>
                  <ProjectCard project={project} compact />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
