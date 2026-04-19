// Locale-agnostic side-project metadata. All translatable prose (title,
// description, status, badge label, link label) lives in messages/{locale}.json
// under SideProjects.{key}.
export interface SideProject {
  /** Matches messages key under SideProjects.{key}. */
  key: string;
  /** Whether the entry has a badge label in messages. */
  hasBadge?: boolean;
  /** Optional external link — label comes from messages, href stays here. */
  linkHref?: string;
}

export const sideProjects: SideProject[] = [
  {
    key: "n8n-automations",
  },
  {
    key: "hermano-mayor",
    hasBadge: true,
  },
];
