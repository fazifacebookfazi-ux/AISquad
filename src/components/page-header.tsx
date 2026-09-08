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
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-48 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-brand-500/18 blur-[150px]" />
      </div>
      <Container className="relative flex flex-col gap-6">
        <Eyebrow className="self-start">{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1.06] font-semibold tracking-[-0.04em] text-balance-pretty text-mist-100 sm:text-5xl lg:text-[3.75rem]">
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
