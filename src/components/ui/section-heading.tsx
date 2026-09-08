import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-display text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance-pretty text-mist-100 sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-mist-400 sm:text-[1.0625rem]">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
