import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.links.caseStudy, label: "Case study" },
    { href: project.links.demo, label: "Open demo" },
    { href: project.links.source, label: "View source" },
    { href: project.links.access, label: "Request access" }
  ].filter((link) => link.href);

  return (
    <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-1">
      {links.map(({ href, label }) => (
        <a key={label} href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={`${project.name}: ${label}`} className="focus-ring group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
          {label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </a>
      ))}
    </div>
  );
}
