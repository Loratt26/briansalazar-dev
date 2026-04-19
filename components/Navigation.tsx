"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#side", label: "Side" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
          scrolled
            ? "bg-[rgba(10,10,10,0.8)] backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-wide items-center justify-between px-6 md:px-8 h-16"
        >
          <a
            href="#top"
            className={cn(
              "font-mono text-sm tracking-tight text-foreground hover:text-accent transition-colors",
              focusRing
            )}
          >
            briansalazar
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-muted hover:text-accent transition-colors",
                    focusRing
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "md:hidden text-foreground p-2 -mr-2 hover:text-accent transition-colors",
              focusRing
            )}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-background animate-fade-up md:hidden"
        >
          <div className="flex items-center justify-between px-6 h-16">
            <span className="font-mono text-sm tracking-tight">briansalazar</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-foreground p-2 -mr-2 hover:text-accent transition-colors",
                focusRing
              )}
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <ul className="flex flex-col items-start gap-6 px-6 pt-12 text-3xl font-semibold tracking-tight">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-foreground hover:text-accent transition-colors",
                    focusRing
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
