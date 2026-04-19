import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn, focusRing } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-wide flex-col items-center justify-center px-6 md:px-8 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {t("eyebrow")}
      </p>
      <h1 className="mt-6 text-h1 font-semibold tracking-tight text-balance">
        {t("heading")}
      </h1>
      <p className="mt-6 max-w-md text-muted leading-relaxed text-pretty">
        {t("body")}
      </p>
      <Link
        href="/"
        className={cn(
          "mt-10",
          buttonVariants({ variant: "primary", size: "lg" }),
          focusRing
        )}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        {t("cta")}
      </Link>
    </section>
  );
}
