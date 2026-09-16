import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
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
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "display max-w-3xl text-balance-pretty text-[clamp(2rem,4.5vw,3.4rem)]",
            light ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed sm:text-lg",
              light ? "text-paper/70" : "text-ink-soft/75",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
