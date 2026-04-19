import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HeroAssetPlaceholder } from "@/components/HeroAssetPlaceholder";
import type { CaseStudy } from "@/content/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { slug, title, oneLiner, category, year } = caseStudy;

  return (
    <Link
      href={`/case-studies/${slug}`}
      aria-label={`${title} — ${oneLiner}`}
      className="group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
    >
      <Card className="relative h-full p-6 md:p-7">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-strong">
          <span>{category}</span>
          <span>{year}</span>
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <p className="mt-2 truncate text-sm text-muted">{oneLiner}</p>

        <HeroAssetPlaceholder className="mt-6" />

        <ArrowUpRight
          aria-hidden
          className="absolute bottom-6 right-6 h-4 w-4 text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          strokeWidth={2}
        />
      </Card>
    </Link>
  );
}
