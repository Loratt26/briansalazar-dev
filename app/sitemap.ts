import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { routing } from "@/i18n/routing";

const SITE = "https://briansalazar.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeAlternates = {
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE}/${l}`])
    ),
  };

  const home = routing.locales.map((locale) => ({
    url: `${SITE}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1.0,
    alternates: homeAlternates,
  }));

  const cases = caseStudies.flatMap((cs) => {
    const alternates = {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE}/${l}/case-studies/${cs.slug}`])
      ),
    };
    return routing.locales.map((locale) => ({
      url: `${SITE}/${locale}/case-studies/${cs.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates,
    }));
  });

  return [...home, ...cases];
}
