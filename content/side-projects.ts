// Side project content shape — see PORTFOLIO_SPEC.md §8
// Populated in build step 8.
export interface SideProject {
  title: string;
  status: string;
  description: string;
  badge?: string;
  href?: string;
}

export const sideProjects: SideProject[] = [];
