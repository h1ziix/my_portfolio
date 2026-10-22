import type { Project } from "@/types/portfolio";

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.links.caseStudy, label: "Read the case study" },
    { href: project.links.demo, label: "Open the live demo" },
    { href: project.links.site, label: "Visit the site" },
    { href: project.links.source, label: "Read the source" },
    { href: project.links.access, label: "Ask for access" }
  ].filter((link) => link.href);

  return (
    <div className="project-links flex min-w-0 flex-wrap gap-x-6">
      {links.map(({ href, label }) => {
        const external = href?.startsWith("http");
        return (
          <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${project.name}: ${label}${external ? " (opens in a new tab)" : ""}`} className="text-link focus-ring inline-flex min-h-11 items-center text-base font-medium">
            {label}
            <span aria-hidden="true" className="link-arrow">↗</span>
          </a>
        );
      })}
    </div>
  );
}
