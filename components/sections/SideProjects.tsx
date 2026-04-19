import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { sideProjects } from "@/content/side-projects";
import { focusRing, cn } from "@/lib/utils";

export function SideProjects() {
  const t = useTranslations("SideProjects");

  return (
    <section
      id="side"
      aria-labelledby="side-projects-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <FadeInOnScroll>
          <h2
            id="side-projects-heading"
            className="text-h2 font-semibold tracking-tight"
          >
            {t("heading")}
          </h2>
          <p className="mt-2 text-muted">{t("subtitle")}</p>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {sideProjects.map((project) => (
              <li key={project.key} className="min-w-0">
                <Card className="h-full p-6 md:p-7 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-strong">
                      {t(`${project.key}.status`)}
                    </span>
                    {project.hasBadge && (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                        {t(`${project.key}.badge`)}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {t(`${project.key}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                    {t(`${project.key}.description`)}
                  </p>

                  {project.linkHref && (
                    <a
                      href={project.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "mt-6 inline-flex items-center gap-1.5 self-start text-sm text-muted hover:text-accent transition-colors",
                        focusRing
                      )}
                    >
                      {t(`${project.key}.linkLabel`)}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
