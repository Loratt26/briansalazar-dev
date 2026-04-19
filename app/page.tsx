import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { SideProjects } from "@/components/sections/SideProjects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
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
