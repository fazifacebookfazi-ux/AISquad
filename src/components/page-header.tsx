import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Bold page header — giant display headline, sticker kicker,
 * thick lime rule. One h1 per page lives here.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-mist-100/10 pt-36 pb-14 sm:pt-44 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <span className="absolute top-24 -right-6 hidden font-display text-[11rem] leading-none font-black tracking-tight text-stroke-faint select-none lg:block">
          AX
        </span>
      </div>
      <Container className="relative flex flex-col items-start gap-7">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-black tracking-[-0.03em] text-balance-pretty text-mist-100">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="max-w-2xl border-l-4 border-brand-400 pl-5 text-base leading-relaxed text-mist-300 sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
