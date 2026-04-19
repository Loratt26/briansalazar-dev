"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn, focusRing } from "@/lib/utils";

const COPIED_RESET_MS = 1500;

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Fallback: select the email so the user can copy manually.
      window.prompt("Copy this email:", profile.email);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <FadeInOnScroll>
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="contact-heading"
              className="text-h2 font-semibold tracking-tight"
            >
              Let&apos;s talk.
            </h2>
            <p className="mt-6 text-muted leading-relaxed text-pretty">
              Best for roles in Support Leadership, Product Operations, or
              anything at the intersection of customers and product in
              Shopify-ecosystem companies.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCopy}
                aria-live="polite"
                aria-label={
                  copied
                    ? `${profile.email} copied to clipboard`
                    : `Copy ${profile.email} to clipboard`
                }
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  focusRing
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2} />
                    Copied!
                  </>
                ) : (
                  <>
                    {profile.email}
                    <Copy className="h-4 w-4" strokeWidth={1.75} />
                  </>
                )}
              </button>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  focusRing
                )}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
