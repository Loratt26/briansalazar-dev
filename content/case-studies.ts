// Locale-agnostic case study data. All translatable prose (title, oneLiner,
// category, status, problem, approach, solution, result, role, collaborators,
// gallery image alt/label) lives in messages/{locale}.json under caseStudyData
// keyed by slug.
export type HeroAsset =
  | { type: "loom"; src: string }
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | {
      type: "gallery";
      // `key` matches caseStudyData.{slug}.gallery.{key} in messages.
      images: Array<{ src: string; key: string }>;
    }
  | { type: "iframe"; src: string; title: string };

export interface CaseStudy {
  slug: string;
  /** Year display, locale-agnostic. */
  year: string;
  /** Path to a 16:9-ish thumbnail used on the home-page card. */
  thumbnail?: string;
  heroAsset: HeroAsset;
  /** Technical stack — kept in original English; tech terms travel. */
  stack: string[];
  /** Whether this case study has a "Collaborators" row in messages. */
  hasCollaborators?: boolean;
  /** Whether the approach prose is followed by `approachSteps` in messages. */
  hasApproachSteps?: boolean;
  /** Whether the solution prose is followed by `solutionPoints` in messages. */
  hasSolutionPoints?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "shopify-demo-store",
    year: "2025",
    thumbnail: "/images/case-studies/shopify-demo-store/thumb-webdemo.webp",
    heroAsset: {
      type: "gallery",
      images: [
        { src: "/images/case-studies/shopify-demo-store/home.webp", key: "home" },
        { src: "/images/case-studies/shopify-demo-store/how-it-works.webp", key: "how-it-works" },
        { src: "/images/case-studies/shopify-demo-store/all-offers.webp", key: "all-offers" },
        { src: "/images/case-studies/shopify-demo-store/bundle-offer.webp", key: "bundle-offer" },
        { src: "/images/case-studies/shopify-demo-store/subscription-offer.webp", key: "subscription-offer" },
      ],
    },
    stack: ["Shopify", "Liquid", "Penida.io app"],
  },
  {
    slug: "bulk-services-cowlendar",
    year: "2026",
    thumbnail: "/images/case-studies/bulk-services-cowlendar/thumb-bulk.webp",
    heroAsset: {
      type: "iframe",
      src: "https://bulk-services.briansalazar.dev",
      title: "Bulk Services prototype — Cowlendar 5-step wizard",
    },
    stack: ["Next.js 14", "TypeScript", "Shopify Admin API", "Tailwind"],
    hasCollaborators: true,
    hasApproachSteps: true,
  },
  {
    slug: "availability-editor-redesign",
    year: "2026",
    thumbnail: "/images/case-studies/availability-editor-redesign/thumb-availability.webp",
    heroAsset: {
      type: "iframe",
      src: "https://availability.briansalazar.dev",
      title: "Availability Editor prototype — Cowlendar redesign",
    },
    stack: ["React 18", "Vite", "TypeScript"],
    hasCollaborators: true,
  },
  {
    slug: "school-attendance-system",
    year: "2024",
    thumbnail: "/images/case-studies/school-attendance-system/thumb-school.webp",
    heroAsset: {
      type: "gallery",
      images: [
        { src: "/images/case-studies/school-attendance-system/home.webp", key: "home" },
        { src: "/images/case-studies/school-attendance-system/dashboard.webp", key: "dashboard" },
        { src: "/images/case-studies/school-attendance-system/manual-record.webp", key: "manual-record" },
        { src: "/images/case-studies/school-attendance-system/reports.webp", key: "reports" },
        { src: "/images/case-studies/school-attendance-system/alerts.webp", key: "alerts" },
      ],
    },
    stack: ["Python", "Django", "PostgreSQL", "Docker", "Railway"],
    hasSolutionPoints: true,
  },
];
