import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { SideProjects } from "@/components/sections/SideProjects";

// Empty anchor target so the Contact nav link resolves until §13 step 9 lands.
function AnchorStub({ id }: { id: string }) {
  return <section id={id} aria-hidden className="scroll-mt-16" />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <CaseStudies />
      <SideProjects />
      <AnchorStub id="contact" />
    </>
  );
}
