import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-y border-white/[0.07] bg-ink-900/40 py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Projects we&apos;re{" "}
                <span className="font-serif italic text-brand-300">
                  proud
                </span>{" "}
                to put our name on
              </>
            }
            description="A snapshot of recent builds — full case studies live on the projects page."
          />
          <Reveal delay={0.15}>
            <ButtonLink href="/projects" variant="secondary">
              All projects
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.slice(0, 4).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
