"use client";

import { Users, Compass, Hammer, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Copy per PORTFOLIO_SPEC.md §6.4 — do not rephrase.
const PILLARS: Pillar[] = [
  {
    icon: Users,
    title: "Support Leadership",
    description:
      "Leading an 11-person customer support team at Penida.io. Building processes, escalation paths, and the feedback loops that turn support into a product input.",
  },
  {
    icon: Compass,
    title: "Product Contribution",
    description:
      "Direct work with the CEO and CTO on roadmap priorities. I synthesize customer feedback into feature proposals and validate them before they reach engineering.",
  },
  {
    icon: Hammer,
    title: "Building",
    description:
      "When a design or flow needs validation, I build functional prototypes. Shipped code that's been reviewed by engineering and turned into production features.",
  },
];

export function WhatIDo() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="what-i-do-heading"
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <h2
            id="what-i-do-heading"
            className="text-h2 font-semibold tracking-tight"
          >
            What I do
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <Card className="h-full p-6 md:p-7">
                  <Icon
                    className="h-5 w-5 text-accent"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                    {description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
