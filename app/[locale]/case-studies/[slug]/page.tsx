import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { HeroAssetPlaceholder } from "@/components/HeroAssetPlaceholder";
import { HeroGallery } from "@/components/HeroGallery";
import { cn, focusRing } from "@/lib/utils";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.oneLiner,
    openGraph: {
      title: `${cs.title} — Brian Salazar`,
      description: cs.oneLiner,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} — Brian Salazar`,
      description: cs.oneLiner,
    },
  };
}

function getLoomEmbedUrl(shareUrl: string): string {
  return shareUrl.replace("/share/", "/embed/");
}

function HeroAsset({ asset }: { asset: CaseStudy["heroAsset"] }) {
  if (asset.type === "loom") {
    const embedSrc = getLoomEmbedUrl(asset.src);
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-card">
        <iframe
          src={embedSrc}
          title="Case study video"
          allowFullScreen
          allow="autoplay; fullscreen; clipboard-write"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (asset.type === "gallery") {
    return <HeroGallery images={asset.images} />;
  }

  // type === "image" / "video" — TODO: add hero asset (real assets arrive later)
  return <HeroAssetPlaceholder iconSize="lg" />;
}

function StackChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 font-mono text-xs text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6 py-3 border-b border-border last:border-b-0">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-strong pt-1">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  setRequestLocale(params.locale);
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === params.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="mx-auto max-w-[720px] px-6 md:px-8 pb-24 pt-8 md:pt-12">
      {/* Back link */}
      <Link
        href="/#work"
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors",
          focusRing
        )}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Back to home
      </Link>

      {/* Header */}
      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-strong">
          {cs.category} · {cs.year}
        </p>
        <h1 className="mt-4 text-h1 font-semibold tracking-tight text-balance">
          {cs.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
          {cs.oneLiner}
        </p>
      </header>

      {/* Hero visual */}
      <div className="mt-12">
        <HeroAsset asset={cs.heroAsset} />
      </div>

      {/* Problem */}
      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          Problem
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {cs.problem}
        </p>
      </section>

      {/* Approach */}
      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          Approach
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {cs.approach}
        </p>
        {cs.approachSteps && (
          <ol className="mt-6 space-y-3 list-decimal list-inside marker:text-muted-strong marker:font-mono">
            {cs.approachSteps.map((step) => (
              <li key={step} className="leading-relaxed text-foreground/90">
                {step}
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Solution */}
      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          Solution
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {cs.solution}
        </p>
        {cs.solutionPoints && (
          <ul className="mt-4 space-y-3">
            {cs.solutionPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 leading-relaxed text-foreground/90"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-strong"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Result */}
      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          Result
        </h2>
        <ul className="space-y-3">
          {cs.result.map((item) => (
            <li
              key={item}
              className="flex gap-3 leading-relaxed text-foreground/90"
            >
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-accent"
                strokeWidth={2.25}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Role & Stack */}
      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          Role &amp; Stack
        </h2>
        <dl className="rounded-lg border border-border bg-card p-6 md:p-7">
          <MetaRow label="Role">{cs.role}</MetaRow>
          <MetaRow label="Stack">
            <StackChips items={cs.stack} />
          </MetaRow>
          {cs.collaborators && (
            <MetaRow label="Collaborators">{cs.collaborators}</MetaRow>
          )}
          <MetaRow label="Status">{cs.status}</MetaRow>
        </dl>
      </section>

      {/* Next case study */}
      <div className="mt-24 pt-8 border-t border-border">
        <Link
          href={`/case-studies/${next.slug}`}
          className={cn(
            "group flex items-center justify-between gap-4 -m-2 p-2 rounded-md transition-colors hover:bg-foreground/[0.02]",
            focusRing
          )}
        >
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-strong">
              Next case study
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight truncate">
              {next.title}
            </p>
          </div>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent"
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </article>
  );
}
