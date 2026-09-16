"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "./logo";
import { StudioClock } from "@/components/studio-clock";
import { getLenis } from "@/components/motion/smooth-scroll";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu when the route changes (e.g. back/forward).
  // Done during render — the officially supported way to adjust state
  // from previous renders without an effect.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Hide on scroll down, reveal on scroll up — keeps the chrome out of the way.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden((prev) => {
          if (open) return false;
          if (y <= 140) return false;
          if (y > last + 4) return true;
          if (y < last - 4) return false;
          return prev;
        });
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open ]);

  // Lock scroll (including Lenis) while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo motion-reduce:transition-none",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="border-b border-mist-100/10 bg-ink-950/70 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between lg:h-[4.5rem]">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active =
                link.href.startsWith("/") &&
                !link.href.includes("#") &&
                pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-1 text-[13px] tracking-tight transition-colors",
                    active
                      ? "text-mist-100"
                      : "text-mist-400 hover:text-mist-100",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand-400 transition-transform duration-300 ease-out-expo",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <StudioClock />
            <ThemeToggle />
            <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
              Start
            </ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center border border-mist-100/15 text-mist-300 transition-colors hover:border-brand-400 hover:text-brand-300 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-mist-100/10 bg-ink-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out-expo md:hidden",
          open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 px-1 py-3 text-mist-300 transition-colors hover:text-mist-100"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-mist-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl tracking-tight italic">
                {link.label}
              </span>
            </Link>
          ))}
          <ButtonLink
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 w-full"
          >
            Start a project
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
