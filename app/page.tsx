import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";

// Empty anchor targets so nav links resolve until §13 steps 8, 9 land.
function AnchorStub({ id }: { id: string }) {
  return <section id={id} aria-hidden className="scroll-mt-16" />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <CaseStudies />
      <AnchorStub id="side" />
      <AnchorStub id="contact" />
    </>
  );
}
