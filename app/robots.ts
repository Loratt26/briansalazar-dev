import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://briansalazar.dev/sitemap.xml",
    host: "https://briansalazar.dev",
  };
}
