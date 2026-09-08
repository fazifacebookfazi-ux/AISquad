import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { CTA } from "@/components/home/cta";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected websites, SaaS platforms and AI products built by AISquadX.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Work we&apos;ve{" "}
            <span className="font-serif italic text-brand-300">shipped</span>
          </>
        }
        description="A growing collection of products, platforms and sites. Full case studies are on the way."
      />

      <Container className="pb-24 lg:pb-32">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>

      <CTA />
    </>
  );
}
