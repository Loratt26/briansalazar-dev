"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn, focusRing } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", labelKey: "work" as const },
  { href: "#side", labelKey: "side" as const },
  { href: "#contact", labelKey: "contact" as const },
];

export function Navigation() {
  const t = useTranslations("Navigation");
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
          aria-label={t("ariaPrimary")}
          className="mx-auto flex max-w-wide items-center justify-between px-6 md:px-8 h-16"
        >
          <Link
            href="/"
            className={cn(
              "font-mono text-sm tracking-tight text-foreground hover:text-accent transition-colors",
              focusRing
            )}
          >
            BrianSalazar
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-8 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-muted hover:text-accent transition-colors",
                      focusRing
                    )}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher withDivider />
          </div>

          <button
            type="button"
            aria-label={t("openMenu")}
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
          aria-label={t("menuTitle")}
          className="fixed inset-0 z-50 bg-background animate-fade-up md:hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-16">
            <span className="font-mono text-sm tracking-tight">BrianSalazar</span>
            <button
              type="button"
              aria-label={t("closeMenu")}
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
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto mb-12 flex justify-center">
            <LanguageSwitcher onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
