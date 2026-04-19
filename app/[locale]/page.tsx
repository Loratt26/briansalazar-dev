import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { SideProjects } from "@/components/sections/SideProjects";
import { Contact } from "@/components/sections/Contact";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
  };
}

export default function HomePage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <WhatIDo />
      <CaseStudies />
      <SideProjects />
      <Contact />
    </>
  );
}
