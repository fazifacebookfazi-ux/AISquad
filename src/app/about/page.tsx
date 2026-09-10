import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Story } from "@/components/about/story";
import { Principles } from "@/components/about/principles";
import { Difference } from "@/components/about/difference";
import { FounderNote } from "@/components/about/founder-note";
import { TechMarquee } from "@/components/home/tech-marquee";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "AISquadX is a small engineering studio in Pakistan. Design and code from the same desk, AI-assisted delivery without invented case studies.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A small studio with an{" "}
            <span className="italic text-brand-400">unfair advantage</span>
          </>
        }
        description="We pair senior craft with AI-assisted delivery, so you get considered work at a pace that used to be impossible."
      />

      <Story />
      <Principles />
      <Difference />
      <FounderNote />
      <TechMarquee />
      <CTA />
    </>
  );
}
