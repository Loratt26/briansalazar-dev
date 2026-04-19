// Case study content shape — see PORTFOLIO_SPEC.md §9
// Populated in build step 7.
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

export const caseStudies: CaseStudy[] = [];
