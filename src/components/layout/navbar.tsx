"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b-2 border-brand-400/60 bg-ink-950/92 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
            : "border-b-2 border-transparent bg-transparent",
        )}
      >
        {/* Signature lime strip */}
        <div aria-hidden className="h-1 bg-brand-400" />

        <Container className="flex h-18 items-center justify-between">
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
                  className={cn(
                    "relative font-mono text-[12px] font-bold tracking-[0.14em] uppercase transition-colors",
                    active ? "text-brand-400" : "text-mist-300 hover:text-brand-400",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-0.5 bg-brand-400 transition-all duration-300",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
              Start a project
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center border-2 border-mist-100/20 text-mist-100 transition-colors hover:border-brand-400 hover:text-brand-400 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink-950 transition-all duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div aria-hidden className="h-1 shrink-0 bg-brand-400" />
        <Container className="flex flex-1 flex-col justify-center gap-2 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={cn(
                "group flex items-baseline gap-4 border-b-2 border-mist-100/10 py-5 transition-all delay-75 duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              <span className="font-mono text-xs font-bold text-brand-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-4xl font-black tracking-tight text-mist-100 transition-colors group-hover:text-brand-400">
                {link.label}
              </span>
            </Link>
          ))}
          <ButtonLink
            href="/contact"
            size="lg"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="mt-8 w-full"
          >
            Start a project
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </Container>
      </div>
    </>
  );
}
