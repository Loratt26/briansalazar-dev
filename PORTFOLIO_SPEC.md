# briansalazar.dev — Portfolio Specification

> Build spec for Claude Code. This document contains every decision already made: stack, design, structure, and content. Claude Code should follow this as the source of truth and ask before deviating.

---

## 1. Project Overview

**Owner:** Brian Salazar — Head of Support at Penida.io, product-adjacent, builder.

**Goal:** A personal portfolio that positions Brian as a **hybrid Support + Product + Builder profile**, not as a developer or a PM. The site's job is to show that Brian:

1. Leads support teams (11 people at Penida.io).
2. Contributes to product strategy (direct work with CEO/CTO on roadmap).
3. Builds functional prototypes when customer feedback demands it.

**Audience:** Startup founders, product leaders, hiring managers evaluating him for Support Leadership / Product Operations / Customer-facing Product roles — especially in the Shopify ecosystem.

**Tone:** Confident but not boastful. Product-minded. Evidence-driven. Dark and modern aesthetic.

---

## 2. Tech Stack (locked)

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Typography | Geist (Geist Sans + Geist Mono) |
| Icons | Lucide React |
| Animation | Framer Motion (subtle, only where it adds meaning) |
| Hosting | Vercel (Hobby plan) |
| Domain | briansalazar.dev |
| Repo | GitHub (private or public, Brian decides) |
| Analytics | Vercel Analytics (free) |

Do not introduce additional libraries without justification. Keep dependencies minimal.

---

## 3. Design System

### 3.1 Aesthetic reference

Linear, Vercel, Raycast. Dark, minimal, typography-forward, sharp edges or very subtle rounding. No gradients as decoration — only for meaningful depth (e.g., subtle hero glow).

### 3.2 Color tokens

Pure black base with a single green accent. Implement as CSS variables and Tailwind theme extension.

```
--background:      #0A0A0A  (near-black, not pure black — less harsh)
--foreground:      #FAFAFA  (near-white)
--muted:           #A1A1AA  (zinc-400, for secondary text)
--muted-strong:    #71717A  (zinc-500, for metadata)
--border:          rgba(255, 255, 255, 0.08)
--border-strong:   rgba(255, 255, 255, 0.14)
--card:            #111113
--accent:          #00D26A  (electric green — the only non-neutral color)
--accent-hover:    #00B85C
```

**Rule:** The accent color is used sparingly — for links on hover, the primary CTA button, active states, and maybe a single visual detail per page. Never as a background block.

### 3.3 Typography

- Headings: Geist Sans, weight 600, tight tracking (`tracking-tight`).
- Body: Geist Sans, weight 400, `leading-relaxed`.
- Code / technical labels: Geist Mono.
- Scale (mobile-first):
  - H1: 48px desktop / 36px mobile
  - H2: 32px / 28px
  - H3: 24px / 20px
  - Body: 16px
  - Small: 14px

### 3.4 Layout

- Max content width: `max-w-5xl` (1024px) for text-heavy pages, `max-w-6xl` for home.
- Vertical rhythm: generous. Sections separated by `py-24` desktop, `py-16` mobile.
- Horizontal padding: `px-6` mobile, `px-8` desktop.

### 3.5 Motion

- Subtle fade-up on scroll for sections (Framer Motion `whileInView`).
- No parallax, no scroll hijacking, no heavy animations.
- Hover states: 150ms transitions.

---

## 4. Site Map

```
/                           → Home (single-page with anchors + case study cards)
/case-studies/[slug]        → Individual case study detail pages
  /shopify-demo-store
  /bulk-services-cowlendar
  /availability-editor-redesign
  /school-attendance-system
/404                        → Custom 404
```

No blog, no `/about`, no `/resume` page for v1. About content lives inline on the home page. Keep scope tight.

---

## 5. Folder Structure

```
briansalazar-dev/
├── app/
│   ├── layout.tsx                    # Root layout, fonts, metadata
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Tailwind + CSS variables
│   ├── not-found.tsx                 # Custom 404
│   └── case-studies/
│       └── [slug]/
│           └── page.tsx              # Dynamic case study page
├── components/
│   ├── ui/                           # shadcn components
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── WhatIDo.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── SideProjects.tsx
│   │   └── Contact.tsx
│   ├── CaseStudyCard.tsx
│   ├── ProjectCard.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
├── content/
│   ├── profile.ts                    # Hero + About copy
│   ├── case-studies.ts               # Array of case study data
│   └── side-projects.ts              # Array of side project data
├── lib/
│   └── utils.ts                      # shadcn cn() helper
├── public/
│   ├── images/
│   │   ├── og-image.png              # Social share image
│   │   └── case-studies/             # Screenshots
│   └── favicon.ico
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Content as data, not markup.** All case studies and projects live in typed TypeScript files in `/content`. This makes future updates a single-file edit.

---

## 6. Page-by-Page Breakdown

### 6.1 Home (`/`)

Single scrollable page, anchored sections. Navigation is sticky and jumps to anchors.

**Order:**

1. Navigation (sticky top)
2. Hero
3. What I Do (3 cards)
4. Case Studies (4 cards linking to detail pages)
5. Side Projects (2 cards, lighter weight)
6. Contact
7. Footer

### 6.2 Navigation

Sticky, minimal. Logo wordmark on left, anchor links on right.

```
[ briansalazar ]              Work  ·  Side  ·  Contact
```

- On scroll: background becomes `rgba(10,10,10,0.8)` with `backdrop-blur-md` and a bottom border.
- Mobile: links collapse into a simple hamburger that opens a full-screen overlay.

### 6.3 Hero

Full viewport height minus nav. Centered left-aligned content.

**Content:**

```
Eyebrow (Geist Mono, accent color, small):
BASED IN LIMA, PERU

H1:
Brian Salazar

Subtitle (H2 style, muted):
Head of Support at Penida.io.
Bridge between customers and product.
Building prototypes when feedback demands it.

CTAs (two buttons side by side):
[ Get in touch → ]   (primary, accent background)
[ View LinkedIn ]    (ghost/outline)
```

A subtle radial glow behind the H1 using the accent color at very low opacity (like 5%). Nothing else.

### 6.4 What I Do

Section title: "What I do"

Three cards in a responsive grid (3 columns desktop, stacked mobile). Each card:

- Icon (Lucide, accent color, small)
- Title
- 2-3 sentence description

**Card 1 — Support Leadership**
> Icon: `Users`
> Leading an 11-person customer support team at Penida.io. Building processes, escalation paths, and the feedback loops that turn support into a product input.

**Card 2 — Product Contribution**
> Icon: `Compass`
> Direct work with the CEO and CTO on roadmap priorities. I synthesize customer feedback into feature proposals and validate them before they reach engineering.

**Card 3 — Building**
> Icon: `Hammer`
> When a design or flow needs validation, I build functional prototypes. Shipped code that's been reviewed by engineering and turned into production features.

### 6.5 Case Studies

Section title: "Selected work"
Subtitle (muted): "Real problems I've owned end-to-end."

Grid of 4 cards (2 columns desktop, 1 mobile). Each card is a link to `/case-studies/[slug]`.

**Card template:**
```
[ Category tag ]                    [ Year ]
───────────────────────────────────────────
Case study title (H3, bold)
One-sentence outcome (muted, 1 line)

[ Small screenshot or visual ]
```

On hover: border shifts to `--border-strong`, accent arrow appears in bottom-right.

### 6.6 Side Projects

Section title: "Side / Experiments"
Subtitle (muted): "Smaller builds and things in progress."

Two cards, same grid. Lighter weight than case studies — no detail pages, just external links or "Coming soon" state.

### 6.7 Contact

Simple, centered. No form — form adds friction and spam.

```
H2:
Let's talk.

Body (muted):
Best for roles in Support Leadership, Product Operations,
or anything at the intersection of customers and product
in Shopify-ecosystem companies.

[ brian@briansalazar.dev ]   ← primary button, copies on click
[ LinkedIn ]                  ← ghost button
```

### 6.8 Footer

Minimal. Single row.

```
© 2026 Brian Salazar        Built with Next.js · Deployed on Vercel
```

---

## 7. Case Study Detail Pages (`/case-studies/[slug]`)

All four case studies use the same template to keep the design system coherent.

### 7.1 Template structure

```
[ Back to home ← ]

Eyebrow: CATEGORY · YEAR
H1: Case study title
Lead paragraph (larger, muted): One-paragraph summary.

───────────────────────────────────────────

[ Hero visual: Loom embed, screenshot, or video ]

───────────────────────────────────────────

## Problem
Prose.

## Approach
Prose. Can include bullet list of steps.

## Solution
Prose. Include screenshots or video.

## Result
Prose. Metrics if available.

## Role & Stack
- Role: What Brian did
- Stack: Technologies involved
- Collaborators: If any
- Status: Shipped / Prototype / In production

───────────────────────────────────────────

[ Next case study → ]
```

### 7.2 Case study content

#### Case Study 1: Shopify Demo Store

```
Slug:      shopify-demo-store
Category:  Product Demo · Shopify
Year:      2025
Status:    Live
```

**One-liner:** Built a complete Shopify demo store from scratch to showcase a new Penida.io app for sales and onboarding.

**Problem:**
Launching a new Shopify app meant the sales and onboarding teams needed a functional environment to show merchants what the app does in context — not slides, not mockups, a real store with real product pages, real cart, real checkout. We didn't have one.

**Approach:**
I took ownership of building the demo store end-to-end. That meant Shopify theme setup, product catalog design, collection structure, page content, checkout configuration, and integrating our app so every feature it ships could be shown live. I used my five-plus years working inside Shopify stores to skip the usual ramp-up time.

**Solution:**
A complete demo store, dark-themed and polished, with the new app configured and visible across the customer journey. The store is used by the team for sales calls, onboarding sessions, and internal QA.

**Result:**
- Live asset used for sales demos and onboarding from day one.
- Reduced dependency on engineering for demo environments.
- Functions as a permanent QA playground for future app versions.

**Role & Stack:**
- **Role:** Solo build — design, theme, configuration, app integration
- **Stack:** Shopify, Liquid, the Penida.io app being demonstrated
- **Status:** Live and in use

**Hero asset:** Loom video embed → https://www.loom.com/share/75c4d6cd447f4d3490be655920940a1a

---

#### Case Study 2: Bulk Services — Cowlendar

```
Slug:      bulk-services-cowlendar
Category:  Product Design · Prototype
Year:      2026
Status:    Prototype validated with CTO
```

**One-liner:** Designed and prototyped a 5-step wizard to let merchants create multiple services at once, after identifying the pattern in months of support tickets.

**Problem:**
Merchants using Cowlendar (Penida.io's booking app for Shopify) had to create services one by one. For service businesses with larger catalogs — salons, studios, clinics — this meant dozens of repetitive actions. The pattern showed up in support tickets consistently, and it was costing us onboarding completion rates.

**Approach:**
I translated the pattern from support feedback into a concrete product proposal, then went further: I built a functional prototype in Next.js using Claude to validate the UX before proposing it to the CTO. I wanted to hand over working evidence, not a mockup.

The prototype flow:
- Step 1: Business type selection
- Step 2: Define the services (name, duration, price) in bulk
- Step 3: Set availability rules once, apply to all
- Step 4: Advanced settings (teammate assignment, capacity)
- Step 5: Confirm and create

**Solution:**
A live prototype that creates services via the Shopify Admin API, demonstrating the full wizard flow with real data and real constraints.

**Result:**
- Validated with the CTO using functional evidence, not mockups.
- The feature was accepted into the roadmap.
- Reduced the discussion loop from "can we build this?" to "how do we ship this?".

**Role & Stack:**
- **Role:** Pattern identification from support feedback, UX design, functional prototype
- **Stack:** Next.js 14, TypeScript, Shopify Admin API, Tailwind
- **Collaborators:** CTO (review and final roadmap decision)
- **Status:** Prototype validated, feature accepted

---

#### Case Study 3: Availability Editor Redesign

```
Slug:      availability-editor-redesign
Category:  Product Design · Prototype
Year:      2026
Status:    Prototype delivered
```

**One-liner:** Redesigned an existing availability editing flow after customer feedback pointed to consistent friction, and delivered a working prototype for engineering.

**Problem:**
The existing availability editor had accumulated friction over multiple iterations. Customers reported confusion about how availability rules compounded, and support tickets kept landing on the same edges. Rather than patching, a clean rework was needed.

**Approach:**
I mapped the friction points from support data, sketched a simpler mental model, then built a functional React prototype with Vite to make the redesign tangible. The prototype lets engineering see the flow work end-to-end before committing implementation time.

**Solution:**
A redesigned availability editor with a clearer rule hierarchy, better visual feedback when availability overlaps, and a simpler path for the most common use cases.

**Result:**
- Functional prototype handed to engineering as the redesign reference.
- Debate moved from "what should it look like" to "how do we migrate existing merchants".

**Role & Stack:**
- **Role:** Problem synthesis, UX redesign, functional prototype
- **Stack:** React 18, Vite, TypeScript
- **Collaborators:** Engineering team
- **Status:** Prototype delivered

---

#### Case Study 4: School Attendance System

```
Slug:      school-attendance-system
Category:  Freelance · Product Built
Year:      2024
Status:    Sold and in production
```

**One-liner:** A local attendance tracking system I built, sold, and deployed for a private school in Lima — with reporting and tardiness alerts.

**Problem:**
A private school needed a way to track staff attendance reliably, generate monthly reports for HR, and surface tardiness patterns automatically. Their existing process was manual and error-prone.

**Approach:**
Scoped the requirements directly with the school's administration, designed the data model, built the system, and handled deployment inside their local network. I owned the full cycle from commercial conversation to production handoff.

**Solution:**
A self-hosted attendance system that:
- Records staff entries and exits
- Generates automatic monthly reports
- Triggers alerts when an employee exceeds a configurable tardiness threshold
- Runs on the school's local infrastructure

**Result:**
- Sold and deployed.
- Replaced the manual process.
- Currently running in production at the school.

**Role & Stack:**
- **Role:** Sole builder — requirements, design, development, deployment
- **Stack:** (Claude Code: fill from the uploaded zip)
- **Status:** In production

---

## 8. Side Projects Content

### 8.1 n8n Automations
```
Title: n8n Automations
Status: Ongoing
```
A growing collection of n8n workflows — from simple triggers to multi-step integrations with APIs, AI, and internal tools. Featured workflow: an audio summarization pipeline that transforms voice recordings into structured written summaries.

**Link behavior:** Opens a modal or small detail showing the audio-resumen workflow description. No external link needed unless Brian wants to host the JSON on GitHub Gist.

### 8.2 HermanoMayor
```
Title: HermanoMayor
Status: In development
Badge: Coming soon
```
A mobile app in React delivering targeted motivational content to a specific audience. Currently in active development — launching soon.

**Link behavior:** Non-clickable card with "Coming soon" badge. No external link yet.

---

## 9. Content Data Shape

Implement content as typed TypeScript so Brian can update without touching layout code.

```typescript
// content/case-studies.ts
export interface CaseStudy {
  slug: string;
  title: string;
  oneLiner: string;
  category: string;
  year: string;
  status: "Live" | "Prototype" | "In production" | "Shipped";
  heroAsset: {
    type: "loom" | "image" | "video";
    src: string;
  };
  problem: string;
  approach: string;
  solution: string;
  result: string[];
  role: string;
  stack: string[];
  collaborators?: string;
}

export const caseStudies: CaseStudy[] = [
  // ... four entries
];
```

```typescript
// content/profile.ts
export const profile = {
  name: "Brian Salazar",
  location: "Lima, Peru",
  role: "Head of Support at Penida.io",
  tagline: "Bridge between customers and product. Building prototypes when feedback demands it.",
  email: "brian@briansalazar.dev",
  linkedin: "https://www.linkedin.com/in/briansalazarhos/",
};
```

---

## 10. Metadata & SEO

```
Title:       Brian Salazar — Support, Product, and Building
Description: Head of Support at Penida.io. Bridge between customers
             and product. Portfolio of shipped work and prototypes.
OG Image:    /images/og-image.png (1200x630, dark theme, name + tagline)
Favicon:     Simple wordmark "b" on dark background
Twitter:     summary_large_image card
```

Implement per-page metadata for case study pages using Next.js 14 `generateMetadata`.

---

## 11. Accessibility

- All interactive elements keyboard-accessible.
- `prefers-reduced-motion` respected — disable Framer Motion transitions when set.
- Color contrast: the green accent on near-black passes WCAG AA for large text but not body text — never use accent for body copy.
- Alt text on every image.
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`.

---

## 12. Deployment

1. Push repo to GitHub.
2. Import into Vercel (connect GitHub account).
3. Deploy with default Next.js settings.
4. Connect `briansalazar.dev` in Vercel → Domains:
   - Add `briansalazar.dev` and `www.briansalazar.dev`
   - Update nameservers at domain registrar OR add A/CNAME records (Vercel provides exact values)
5. Enable Vercel Analytics (free tier).
6. Every `git push` to `main` auto-deploys.

---

## 13. Build Order (for Claude Code)

Ship incrementally. Deploy after every step so the site is live from day one.

1. **Scaffolding** — Next.js, Tailwind, shadcn, Geist, design tokens, folder structure.
2. **Navigation + Footer** — sticky nav, anchors, footer.
3. **Hero** — pixel-perfect to the spec, including radial glow.
4. **What I Do** — 3 cards.
5. **Case Studies grid** — 4 cards, link to detail pages.
6. **Case study detail template** — one dynamic route, reads from `content/case-studies.ts`.
7. **Populate all 4 case studies** using the content in section 7.
8. **Side Projects** — 2 cards.
9. **Contact + 404** — final polish.
10. **Deploy** to Vercel, connect domain.
11. **OG image + favicon** — generate and wire up.

---

## 14. Explicit Non-Goals (v1)

Do not build these. They are for future iterations only.

- Blog / writing section
- Light mode toggle (dark only is the design)
- CMS integration
- Contact form
- Multi-language (English-only v1)
- Testimonials section
- Resume PDF download (LinkedIn covers this)

---

## 15. Open Decisions for Brian

Items Claude Code should confirm before coding:

1. **Email address** — `brian@briansalazar.dev` vs existing personal email?
2. **Accent color** — electric green (#00D26A) as specified, or a different single accent?
3. **Bulk Services prototype link** — should the case study link to a live deployed prototype, or only show screenshots?
4. **Availability Editor before/after** — are there screenshots of the "before" state available, or should the case study skip that comparison?
5. **n8n workflow visibility** — show the JSON/description inline, or link to a GitHub Gist?

---

End of spec.
