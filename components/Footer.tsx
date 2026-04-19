import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-wide px-6 md:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-muted">
        <p>{t("copyright", { year, name: profile.name })}</p>
        <p className="font-mono text-xs text-muted-strong">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
