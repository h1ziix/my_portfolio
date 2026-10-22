"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Ribbon } from "@/components/ui/ribbon";
import { RevealInView } from "@/components/ui/reveal-in-view";
import { projectRibbon } from "@/lib/ribbon";
import { StarField } from "@/components/ui/star-field";

const filterSlugs = ["agentic-ops", "atu-campus", "stratweb", "kazecofood"];
export function TechnicalSkills() {
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const active = preview ?? selected;
  const project = portfolio.projects.find((item) => item.slug === active);
  const tools = new Set(
    project?.technologies.map((tool) => tool.toLowerCase()),
  );
  return (
    <section
      id="skills"
      className="skills-section section"
      aria-labelledby="skills-title"
    >
      <StarField variant="dark" />
      <div className="shell">
        <div className="section-heading">
          <div className="section-heading-title">
            <span className="section-index meta" aria-hidden="true">
              02 /
            </span>
            <h2 id="skills-title" className="display text-section">
              The stack
              <br />
              behind the work
            </h2>
          </div>
          <p className="section-kicker">
            I work across the whole product. Here’s what I use and where it
            shows up.
          </p>
        </div>
        <div
          className="stack-filters"
          role="group"
          aria-label="Highlight tools by project"
          onMouseLeave={() => setPreview(null)}
        >
          <button
            type="button"
            className="stack-filter focus-ring meta"
            aria-pressed={selected === null}
            onMouseEnter={() => setPreview(null)}
            onFocus={() => setPreview(null)}
            onClick={() => {
              setSelected(null);
              setPreview(null);
            }}
          >
            All
          </button>
          {filterSlugs.map((slug) => {
            const item = portfolio.projects.find(
              (candidate) => candidate.slug === slug,
            )!;
            return (
              <button
                type="button"
                key={slug}
                className="stack-filter focus-ring meta"
                data-preview={active === slug}
                aria-pressed={selected === slug}
                onMouseEnter={() => setPreview(slug)}
                onFocus={() => setPreview(slug)}
                onBlur={() => setPreview(null)}
                onClick={() => {
                  setSelected(selected === slug ? null : slug);
                  setPreview(null);
                }}
              >
                <Ribbon variant="edge" gradient={projectRibbon(slug)} />
                {item.name}
              </button>
            );
          })}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {selected
            ? `${portfolio.projects.find((item) => item.slug === selected)?.name} tools highlighted.`
            : "All tools visible."}
        </p>
        <dl className="stack-bento">
          {portfolio.skills.map((group, index) => {
            const highlighted =
              !active ||
              group.projects?.includes(active) ||
              group.items.some((tool) => tools.has(tool.toLowerCase()));
            return (
              <RevealInView
                key={group.area}
                className="bento-cell"
                order={index}
                dimmed={!highlighted}
              >
                <dt>
                  <span className="meta bento-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="display">{group.area}</span>
                </dt>
                <dd>
                  <p className="bento-tools">
                    {group.items.map((tool, toolIndex) => (
                      <span
                        key={tool}
                        data-tool={tool}
                        data-dimmed={
                          Boolean(active) && !tools.has(tool.toLowerCase())
                        }
                      >
                        {tool}
                        {toolIndex < group.items.length - 1 ? (
                          <span aria-hidden="true"> / </span>
                        ) : null}
                      </span>
                    ))}
                  </p>
                  {group.description ? (
                    <p className="bento-description">{group.description}</p>
                  ) : null}
                  <div className="skill-projects">
                    {group.projects?.map((slug) => {
                      const item = portfolio.projects.find(
                        (candidate) => candidate.slug === slug,
                      );
                      return item ? (
                        <a
                          key={slug}
                          href={`#${slug}`}
                          className="text-link focus-ring meta"
                        >
                          {item.name}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null;
                    })}
                  </div>
                </dd>
              </RevealInView>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
