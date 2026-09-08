import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServiceNav } from "@/components/services/service-nav";
import { ServiceSections } from "@/components/services/service-sections";
import { AlwaysIncluded } from "@/components/services/always-included";
import { Engagement } from "@/components/services/engagement";
import { Process } from "@/components/home/process";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, SaaS product builds, vibe coding sprints, AI integration, UI/UX design and ongoing care — fixed prices, clear timelines.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Design and engineering,{" "}
            <span className="font-serif italic text-brand-300">
              under one roof
            </span>
          </>
        }
        description="Pick a single sprint or a full product partnership. The same small team handles strategy, design and code, so nothing gets lost between them."
      />

      <ServiceNav />
      <ServiceSections />
      <AlwaysIncluded />
      <Engagement />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
