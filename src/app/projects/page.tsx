import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from AISquadX — SaaS platforms, marketing sites, AI products and MVP sprints, with the problem, the approach and the outcome for each.",
  alternates: { canonical: "/projects" },
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
        description="Each one starts with a real problem and ends with something live. Open any project to read how it came together."
      />

      <Container className="pb-24 lg:pb-32">
        <ProjectsGallery />
      </Container>

      <CTA />
    </>
  );
}
