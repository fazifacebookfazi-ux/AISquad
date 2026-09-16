import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden border-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-50";

/** Bold fill-sweep: a solid panel sweeps up on hover, inverting the label. */
const sweep =
  "after:absolute after:inset-0 after:translate-y-[101%] after:transition-transform after:duration-300 after:ease-out-expo hover:after:translate-y-0 [&>*]:relative [&>*]:z-10";

const variants: Record<Variant, string> = {
  primary: cn(
    sweep,
    "border-brand-400 bg-brand-400 text-ink-950 after:bg-ink-950 hover:text-brand-400",
  ),
  secondary: cn(
    sweep,
    "border-mist-100/30 bg-transparent text-mist-100 after:bg-mist-100 hover:border-mist-100 hover:text-ink-950",
  ),
  ink: cn(
    sweep,
    "border-ink-950 bg-ink-950 text-brand-400 after:bg-brand-400 hover:text-ink-950",
  ),
  ghost: "border-transparent text-mist-300 hover:border-mist-100/20 hover:text-mist-100",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5",
  md: "h-13 px-7",
  lg: "h-15 px-9 text-xs",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
