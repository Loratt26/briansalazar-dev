"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Radial glow behind the H1 — spec §6.3 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[90%] max-w-[900px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0, 210, 106, 0.08) 0%, rgba(0, 210, 106, 0) 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-wide flex-col justify-center px-6 md:px-8 py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-content"
        >
          <motion.p
            variants={item}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent"
          >
            Based in {profile.location}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 text-h1 font-semibold tracking-tight text-balance"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-h2 font-normal tracking-tight leading-snug text-muted max-w-2xl text-balance"
          >
            {profile.role}.
            <br />
            Bridge between customers and product.
            <br />
            Building prototypes when feedback demands it.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Link
              href="#contact"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Get in touch <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              View LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
