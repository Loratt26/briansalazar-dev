"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn, focusRing } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  /** When true, renders a thin border-left divider before the switcher. */
  withDivider?: boolean;
  onNavigate?: () => void;
}

const LOCALES = ["en", "es"] as const;

export function LanguageSwitcher({
  className,
  withDivider = false,
  onNavigate,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  const switchTo = (newLocale: (typeof LOCALES)[number]) => {
    if (newLocale === locale) return;
    onNavigate?.();
    router.replace(pathname, { locale: newLocale });
  };

  const ariaFor = (code: (typeof LOCALES)[number]) => {
    if (code === "en") {
      return locale === "en" ? t("currentEn") : t("switchToEn");
    }
    return locale === "es" ? t("currentEs") : t("switchToEs");
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-xs uppercase tracking-widest",
        withDivider &&
          "relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-border",
        className
      )}
    >
      {LOCALES.map((code, idx) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center gap-2">
            {idx > 0 && (
              <span className="text-muted-strong" aria-hidden>
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(code)}
              aria-current={isActive ? "true" : undefined}
              aria-label={ariaFor(code)}
              className={cn(
                "transition-colors",
                isActive
                  ? "text-accent font-medium"
                  : "text-muted hover:text-foreground",
                focusRing
              )}
            >
              {code.toUpperCase()}
            </button>
          </span>
        );
      })}
    </div>
  );
}
