"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  /** 0-1 portion of element that must be visible to trigger. */
  amount?: number;
}

/**
 * Section-level fade-up on scroll. Respects prefers-reduced-motion.
 * Pure CSS transition driven by IntersectionObserver — no framer dependency
 * here so it works in any browser environment.
 * Use once per section — never on individual cards.
 */
export function FadeInOnScroll({
  children,
  className,
  amount = 0.15,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: amount }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      data-in-view={inView ? "true" : "false"}
      className={cn(
        "opacity-0 translate-y-4 transition-[opacity,transform] duration-500 ease-out",
        "data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0",
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  );
}
