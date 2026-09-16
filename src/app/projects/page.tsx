import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies",
  description:
    "Selected work from AISquadX — web apps, SaaS products and AI-powered tools designed and engineered in Pakistan, shipped for clients worldwide.",
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
            <span className="italic text-brand-400">shipped</span>
          </>
        }
        description="Each one starts with a real problem. Two run locally; StartupAI Tools is live."
      />

      <Container className="pb-24 lg:pb-32">
        <ProjectsGallery />
      </Container>

      <CTA />
    </>
  );
}
