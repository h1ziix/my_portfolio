import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { portfolio } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl.href, priority: 1 },
    ...portfolio.projects.flatMap((project) => project.links.caseStudy ? [{
      url: new URL(project.links.caseStudy, siteUrl).href,
      priority: 0.8
    }] : [])
  ];
}
