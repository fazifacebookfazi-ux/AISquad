import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export function FeaturedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-y-2 border-mist-100/10 bg-ink-900/60 py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Three products we <span className="italic text-brand-400">actually run.</span>
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={project} priority={i === 0} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
