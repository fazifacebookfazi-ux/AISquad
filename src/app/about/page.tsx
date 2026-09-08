import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Story } from "@/components/about/story";
import { Principles } from "@/components/about/principles";
import { Difference } from "@/components/about/difference";
import { FounderNote } from "@/components/about/founder-note";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "AISquadX is a small, AI-native web development studio. Here's how we think, how we work, and why we're built differently.",
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
            <span className="font-serif italic text-brand-300">
              unfair advantage
            </span>
          </>
        }
        description="We pair senior craft with AI-assisted delivery, so you get agency-grade work at a pace that used to be impossible."
      />

      <Story />
      <Principles />
      <Difference />
      <FounderNote />
      <TechMarquee />
      <Testimonials />
      <CTA />
    </>
  );
}
