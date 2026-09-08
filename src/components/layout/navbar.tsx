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
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled
          ? "border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
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
                  "rounded-full px-4 py-2 text-sm tracking-tight transition-colors duration-200",
                  active
                    ? "text-mist-100"
                    : "text-mist-400 hover:text-mist-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Start a project
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-white/10 text-mist-300 transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out-expo md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 w-full"
          >
            Start a project
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
