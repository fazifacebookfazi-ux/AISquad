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
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-0 left-[12%] h-full w-px bg-mist-100/8" />
      </div>
      <Container className="relative flex flex-col gap-6">
        <Eyebrow className="self-start">{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-display text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-mist-100 sm:text-6xl lg:text-[4.4rem]">
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
