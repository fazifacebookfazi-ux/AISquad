import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Manifesto } from "@/components/motion/text-fx";

/** Big scroll-illuminated statement — the studio's point of view. */
export function ManifestoSection() {
  return (
    <section className="py-28 lg:py-44">
      <Container>
        <Reveal>
          <Eyebrow>The short version</Eyebrow>
        </Reveal>
        <Manifesto className="display mt-8 max-w-5xl text-[clamp(1.9rem,4.6vw,3.9rem)] text-ink">
          Most agencies are slow because of how they&rsquo;re shaped, not how hard
          they work. We&rsquo;re a small squad that designs and builds in the same
          room — AI handles the repetitive parts, so the hours go into craft.
        </Manifesto>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl leading-relaxed text-ink-soft/70">
            A site that used to take a quarter takes a few weeks, and
            it&apos;s better — because we spent that time on craft instead of
            coordination.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
