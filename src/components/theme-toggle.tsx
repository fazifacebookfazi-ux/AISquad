"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Which icon shows is decided in CSS via the `dark` variant rather than React
 * state, so the button renders correctly on the server and never flashes the
 * wrong icon during hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle between light and dark theme"
      title="Toggle theme"
      className={cn(
        "group relative grid size-10 place-items-center border border-mist-100/15 text-mist-400 transition-colors duration-300 hover:border-brand-400 hover:text-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none",
        className,
      )}
    >
      <Sun
        className="hidden size-4.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45 dark:block"
        strokeWidth={1.7}
      />
      <Moon
        className="size-4.5 transition-transform duration-500 ease-out-expo group-hover:-rotate-12 dark:hidden"
        strokeWidth={1.7}
      />
    </button>
  );
}
