import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { SideProjects } from "@/components/sections/SideProjects";
import { Contact } from "@/components/sections/Contact";

interface PageProps {
  params: { locale: string };
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
