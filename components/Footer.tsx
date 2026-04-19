import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn, focusRing } from "@/lib/utils";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-wide px-6 md:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <p>{t("copyright", { year, name: profile.name })}</p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedinAriaLabel")}
          className={cn(
            buttonVariants({ variant: "ghost", size: "md" }),
            focusRing
          )}
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
