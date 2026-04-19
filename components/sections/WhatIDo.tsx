import { Users, Compass, Hammer, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

interface Pillar {
  icon: LucideIcon;
  /** Matches messages key under WhatIDo.{key}. */
  key: "supportLeadership" | "productContribution" | "building";
}

const PILLARS: Pillar[] = [
  { icon: Users, key: "supportLeadership" },
  { icon: Compass, key: "productContribution" },
  { icon: Hammer, key: "building" },
];

export function WhatIDo() {
  const t = useTranslations("WhatIDo");

  return (
    <section
      aria-labelledby="what-i-do-heading"
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <FadeInOnScroll>
          <h2
            id="what-i-do-heading"
            className="text-h2 font-semibold tracking-tight"
          >
            {t("heading")}
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {PILLARS.map(({ icon: Icon, key }) => (
              <li key={key}>
                <Card className="h-full p-6 md:p-7">
                  <Icon
                    className="h-5 w-5 text-accent"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                    {t(`${key}.description`)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
