import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServiceQuickNav, ServiceSections } from "@/components/services/service-sections";
import { AlwaysIncluded } from "@/components/services/always-included";
import { Engagement } from "@/components/services/engagement";
import { Process } from "@/components/home/process";
import { FAQ } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Web Development, SaaS & AI Services",
  description:
    "Custom web development, SaaS product builds, AI integration, vibe coding sprints and UI/UX design for clients in the USA and Pakistan — fixed prices, clear timelines.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Design and engineering, <span className="text-accent">under one roof.</span>
          </>
        }
        description="Pick a single sprint or a full product partnership. The same small team handles strategy, design and code, so nothing gets lost between them."
      />

      <ServiceQuickNav />
      <ServiceSections />
      <AlwaysIncluded />
      <Engagement />
      <Process />
      <FAQ />
    </>
  );
}
