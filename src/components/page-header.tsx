import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

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
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>
      <Container className="relative flex flex-col gap-5">
        <Eyebrow className="self-start">{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] text-mist-100">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-mist-400 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
