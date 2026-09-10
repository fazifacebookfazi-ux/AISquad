import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Services } from "@/components/home/services";
import { FeaturedWork } from "@/components/home/featured-work";
import { Process } from "@/components/home/process";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero year={new Date().getFullYear()} />
      <TechMarquee />
      <Services />
      <FeaturedWork />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
