import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Set when the heading sits on a lime/light section. */
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={dark ? "ink" : "lime"}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "max-w-4xl font-display text-[2.6rem] leading-[0.98] font-bold tracking-[-0.03em] text-balance-pretty sm:text-6xl lg:text-7xl",
            dark ? "text-ink-950" : "text-mist-100",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-lg",
              dark ? "text-ink-950/70" : "text-mist-400",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
