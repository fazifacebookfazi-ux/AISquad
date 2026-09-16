import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LineReveal } from "@/components/motion/text-fx";

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
    <section className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <LineReveal className="mt-6">
          <h1 className="display max-w-5xl text-balance-pretty text-[clamp(2.8rem,7vw,5.5rem)] text-ink">
            <span data-reveal-line>
              <span>{title}</span>
            </span>
          </h1>
        </LineReveal>
        {description ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft/75">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
