import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";

// Empty anchor targets so nav links resolve until §13 steps 5, 8, 9 land.
function AnchorStub({ id }: { id: string }) {
  return <section id={id} aria-hidden className="scroll-mt-16" />;
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Hero />
        <WhatIDo />
        <AnchorStub id="work" />
        <AnchorStub id="side" />
        <AnchorStub id="contact" />
      </main>
      <Footer />
    </>
  );
}
