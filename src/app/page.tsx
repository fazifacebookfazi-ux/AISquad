import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { StatsBand } from "@/components/home/stats-band";
import { Services } from "@/components/home/services";
import { FeaturedWork } from "@/components/home/featured-work";
import { Process } from "@/components/home/process";
import { FAQ, faqs } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";
import { FaqJsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Hero />
      <TechMarquee />
      <StatsBand />
      <Services />
      <FeaturedWork />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
