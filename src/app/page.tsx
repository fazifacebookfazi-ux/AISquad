import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { MarqueeBand } from "@/components/home/marquee-band";
import { ManifestoSection } from "@/components/home/manifesto";
import { ServicesIndex } from "@/components/home/services-index";
import { Process } from "@/components/home/process";
import { StatsBand } from "@/components/home/stats";
import { FAQ } from "@/components/home/faq";
import { faqs } from "@/lib/faqs";
import { FaqJsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Hero />
      <Work />
      <MarqueeBand />
      <ManifestoSection />
      <ServicesIndex />
      <Process />
      <StatsBand />
      <FAQ />
    </>
  );
}
