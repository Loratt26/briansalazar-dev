import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { HeroAssetPlaceholder } from "@/components/HeroAssetPlaceholder";
import { HeroGallery } from "@/components/HeroGallery";
import HeroIframe from "@/components/HeroIframe";
import { routing } from "@/i18n/routing";
import { cn, focusRing } from "@/lib/utils";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};

  const t = await getTranslations({
    locale: params.locale,
    namespace: `caseStudyData.${cs.slug}`,
  });
  const title = t("title");
  const oneLiner = t("oneLiner");
  const path = `/case-studies/${cs.slug}`;

  return {
    title,
    description: oneLiner,
    alternates: {
      canonical: `/${params.locale}${path}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title: `${title} — Brian Salazar`,
      description: oneLiner,
      type: "article",
      url: `https://briansalazar.dev/${params.locale}${path}`,
      siteName: "Brian Salazar",
      images: ["/images/og-image.png"],
      locale: params.locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Brian Salazar`,
      description: oneLiner,
      images: ["/images/og-image.png"],
    },
  };
}

function getLoomEmbedUrl(shareUrl: string): string {
  return shareUrl.replace("/share/", "/embed/");
}

function HeroAsset({
  asset,
  slug,
  iframeTitle,
}: {
  asset: CaseStudy["heroAsset"];
  slug: string;
  iframeTitle: string;
}) {
  if (asset.type === "loom") {
    const embedSrc = getLoomEmbedUrl(asset.src);
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-card">
        <iframe
          src={embedSrc}
          title={iframeTitle}
          allowFullScreen
          allow="autoplay; fullscreen; clipboard-write"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (asset.type === "gallery") {
    return <HeroGallery slug={slug} images={asset.images} />;
  }

  if (asset.type === "iframe") {
    return <HeroIframe src={asset.src} title={asset.title} />;
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

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6 py-3 border-b border-border last:border-b-0">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-strong pt-1">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  setRequestLocale(params.locale);
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const tDetail = await getTranslations("CaseStudyDetail");
  const tCs = await getTranslations(`caseStudyData.${cs.slug}`);

  const idx = caseStudies.findIndex((c) => c.slug === params.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const tNext = await getTranslations(`caseStudyData.${next.slug}`);

  const result = tCs.raw("result") as string[];
  const approachSteps = cs.hasApproachSteps
    ? (tCs.raw("approachSteps") as string[])
    : null;
  const solutionPoints = cs.hasSolutionPoints
    ? (tCs.raw("solutionPoints") as string[])
    : null;

  return (
    <article className="mx-auto max-w-[720px] px-6 md:px-8 pb-24 pt-8 md:pt-12">
      <Link
        href="/#work"
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors",
          focusRing
        )}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        {tDetail("backToHome")}
      </Link>

      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-strong">
          {tCs("category")} · {cs.year}
        </p>
        <h1 className="mt-4 text-h1 font-semibold tracking-tight text-balance">
          {tCs("title")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
          {tCs("oneLiner")}
        </p>
      </header>

      <div className="mt-12">
        <HeroAsset
          asset={cs.heroAsset}
          slug={cs.slug}
          iframeTitle={tDetail("iframeTitle")}
        />
      </div>

      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          {tDetail("problemHeading")}
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {tCs("problem")}
        </p>
      </section>

      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          {tDetail("approachHeading")}
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {tCs("approach")}
        </p>
        {approachSteps && (
          <ol className="mt-6 space-y-3 list-decimal list-inside marker:text-muted-strong marker:font-mono">
            {approachSteps.map((step) => (
              <li key={step} className="leading-relaxed text-foreground/90">
                {step}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          {tDetail("solutionHeading")}
        </h2>
        <p className="mb-4 leading-relaxed text-foreground/90 text-pretty">
          {tCs("solution")}
        </p>
        {solutionPoints && (
          <ul className="mt-4 space-y-3">
            {solutionPoints.map((point) => (
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

      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          {tDetail("resultHeading")}
        </h2>
        <ul className="space-y-3">
          {result.map((item) => (
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

      <section>
        <h2 className="mt-16 mb-6 text-h2 font-semibold tracking-tight">
          {tDetail("roleStackHeading")}
        </h2>
        <dl className="rounded-lg border border-border bg-card p-6 md:p-7">
          <MetaRow label={tDetail("roleLabel")}>{tCs("role")}</MetaRow>
          <MetaRow label={tDetail("stackLabel")}>
            <StackChips items={cs.stack} />
          </MetaRow>
          {cs.hasCollaborators && (
            <MetaRow label={tDetail("collaboratorsLabel")}>
              {tCs("collaborators")}
            </MetaRow>
          )}
          <MetaRow label={tDetail("statusLabel")}>{tCs("status")}</MetaRow>
        </dl>
      </section>

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
              {tDetail("nextCaseStudy")}
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight truncate">
              {tNext("title")}
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
