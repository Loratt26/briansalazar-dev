// Side project content — see PORTFOLIO_SPEC.md §6.6 and §8
export interface SideProject {
  title: string;
  description: string;
  status: string;
  badge?: string;
  link?: { href: string; label: string };
}

export const sideProjects: SideProject[] = [
  {
    title: "n8n Automations",
    description:
      "A growing collection of n8n workflows — from simple triggers to multi-step integrations with APIs, AI, and internal tools. Featured workflow: an audio summarization pipeline that transforms voice recordings into structured written summaries.",
    status: "Ongoing",
  },
  {
    title: "HermanoMayor",
    description:
      "A mobile app in React delivering targeted motivational content to a specific audience. Currently in active development — launching soon.",
    status: "In development",
    badge: "Coming soon",
  },
];
