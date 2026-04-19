// Case study content — see PORTFOLIO_SPEC.md §7.2 (content) and §9 (shape).
// Status uses free-form strings to match the descriptive values in the spec.
export type HeroAsset =
  | { type: "loom"; src: string }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string }
  | {
      type: "gallery";
      images: Array<{ src: string; alt: string; label: string }>;
    };

export interface CaseStudy {
  slug: string;
  title: string;
  oneLiner: string;
  category: string;
  year: string;
  status: string;
  /** Path to a 16:9-ish thumbnail used on the home-page card. */
  thumbnail?: string;
  heroAsset: HeroAsset;
  problem: string;
  approach: string;
  /** Optional bulleted steps that follow the approach prose. */
  approachSteps?: string[];
  solution: string;
  /** Optional bulleted points that follow the solution prose. */
  solutionPoints?: string[];
  result: string[];
  role: string;
  stack: string[];
  collaborators?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "shopify-demo-store",
    title: "Shopify Demo Store",
    oneLiner:
      "Built a complete Shopify demo store from scratch to showcase a new Penida.io app for sales and onboarding.",
    category: "Product Demo · Shopify",
    year: "2025",
    status: "Live",
    thumbnail: "/images/case-studies/shopify-demo-store/thumb-webdemo.webp",
    heroAsset: {
      type: "gallery",
      images: [
        {
          src: "/images/case-studies/shopify-demo-store/home.webp",
          alt: "Subscribee App home page",
          label: "Home",
        },
        {
          src: "/images/case-studies/shopify-demo-store/how-it-works.webp",
          alt: "How It Works section",
          label: "How It Works",
        },
        {
          src: "/images/case-studies/shopify-demo-store/all-offers.webp",
          alt: "All subscription and bundle offers",
          label: "All Offers",
        },
        {
          src: "/images/case-studies/shopify-demo-store/bundle-offer.webp",
          alt: "Bundle offer detail page",
          label: "Bundle Offer",
        },
        {
          src: "/images/case-studies/shopify-demo-store/subscription-offer.webp",
          alt: "Subscription offer detail page",
          label: "Subscription Offer",
        },
      ],
    },
    problem:
      "Launching a new Shopify app meant the sales and onboarding teams needed a functional environment to show merchants what the app does in context — not slides, not mockups, a real store with real product pages, real cart, real checkout. We didn't have one.",
    approach:
      "I took ownership of building the demo store end-to-end. That meant Shopify theme setup, product catalog design, collection structure, page content, checkout configuration, and integrating our app so every feature it ships could be shown live. I used my five-plus years working inside Shopify stores to skip the usual ramp-up time.",
    solution:
      "A complete demo store, dark-themed and polished, with the new app configured and visible across the customer journey. The store is used by the team for sales calls, onboarding sessions, and internal QA.",
    result: [
      "Live asset used for sales demos and onboarding from day one.",
      "Reduced dependency on engineering for demo environments.",
      "Functions as a permanent QA playground for future app versions.",
    ],
    role: "Solo build — design, theme, configuration, app integration",
    stack: ["Shopify", "Liquid", "The Penida.io app being demonstrated"],
  },
  {
    slug: "bulk-services-cowlendar",
    title: "Bulk Services — Cowlendar",
    oneLiner:
      "Designed and prototyped a 5-step wizard to let merchants create multiple services at once, after identifying the pattern in months of support tickets.",
    category: "Product Design · Prototype",
    year: "2026",
    status: "Prototype validated with CTO",
    thumbnail: "/images/case-studies/bulk-services-cowlendar/thumb.png",
    heroAsset: {
      type: "image",
      src: "/images/case-studies/bulk-services-cowlendar.png",
      alt: "Bulk Services prototype screenshot",
    },
    problem:
      "Merchants using Cowlendar (Penida.io's booking app for Shopify) had to create services one by one. For service businesses with larger catalogs — salons, studios, clinics — this meant dozens of repetitive actions. The pattern showed up in support tickets consistently, and it was costing us onboarding completion rates.",
    approach:
      "I translated the pattern from support feedback into a concrete product proposal, then went further: I built a functional prototype in Next.js using Claude to validate the UX before proposing it to the CTO. I wanted to hand over working evidence, not a mockup.",
    approachSteps: [
      "Step 1: Business type selection",
      "Step 2: Define the services (name, duration, price) in bulk",
      "Step 3: Set availability rules once, apply to all",
      "Step 4: Advanced settings (teammate assignment, capacity)",
      "Step 5: Confirm and create",
    ],
    solution:
      "A live prototype that creates services via the Shopify Admin API, demonstrating the full wizard flow with real data and real constraints.",
    result: [
      "Validated with the CTO using functional evidence, not mockups.",
      "The feature was accepted into the roadmap.",
      'Reduced the discussion loop from "can we build this?" to "how do we ship this?".',
    ],
    role: "Pattern identification from support feedback, UX design, functional prototype",
    stack: ["Next.js 14", "TypeScript", "Shopify Admin API", "Tailwind"],
    collaborators: "CTO (review and final roadmap decision)",
  },
  {
    slug: "availability-editor-redesign",
    title: "Availability Editor Redesign",
    oneLiner:
      "Redesigned an existing availability editing flow after customer feedback pointed to consistent friction, and delivered a working prototype for engineering.",
    category: "Product Design · Prototype",
    year: "2026",
    status: "Prototype delivered",
    thumbnail: "/images/case-studies/availability-editor-redesign/thumb.png",
    heroAsset: {
      type: "image",
      src: "/images/case-studies/availability-editor-redesign.png",
      alt: "Availability editor prototype screenshot",
    },
    problem:
      "The existing availability editor had accumulated friction over multiple iterations. Customers reported confusion about how availability rules compounded, and support tickets kept landing on the same edges. Rather than patching, a clean rework was needed.",
    approach:
      "I mapped the friction points from support data, sketched a simpler mental model, then built a functional React prototype with Vite to make the redesign tangible. The prototype lets engineering see the flow work end-to-end before committing implementation time.",
    solution:
      "A redesigned availability editor with a clearer rule hierarchy, better visual feedback when availability overlaps, and a simpler path for the most common use cases.",
    result: [
      "Functional prototype handed to engineering as the redesign reference.",
      'Debate moved from "what should it look like" to "how do we migrate existing merchants".',
    ],
    role: "Problem synthesis, UX redesign, functional prototype",
    stack: ["React 18", "Vite", "TypeScript"],
    collaborators: "Engineering team",
  },
  {
    slug: "school-attendance-system",
    title: "School Attendance System",
    oneLiner:
      "A local attendance tracking system I built, sold, and deployed for a private school in Lima — with reporting and tardiness alerts.",
    category: "Freelance · Product Built",
    year: "2024",
    status: "Sold and in production",
    thumbnail: "/images/case-studies/school-attendance-system/thumb.png",
    heroAsset: {
      type: "image",
      src: "/images/case-studies/school-attendance-system.png",
      alt: "School attendance system screenshot",
    },
    problem:
      "A private school needed a way to track staff attendance reliably, generate monthly reports for HR, and surface tardiness patterns automatically. Their existing process was manual and error-prone.",
    approach:
      "Scoped the requirements directly with the school's administration, designed the data model, built the system, and handled deployment inside their local network. I owned the full cycle from commercial conversation to production handoff.",
    solution: "A self-hosted attendance system that:",
    solutionPoints: [
      "Records staff entries and exits",
      "Generates automatic monthly reports",
      "Triggers alerts when an employee exceeds a configurable tardiness threshold",
      "Runs on the school's local infrastructure",
    ],
    result: [
      "Sold and deployed.",
      "Replaced the manual process.",
      "Currently running in production at the school.",
    ],
    role: "Sole builder — requirements, design, development, deployment",
    stack: ["Python", "Django", "PostgreSQL", "Docker", "Railway"],
  },
];
