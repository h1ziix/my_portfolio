export type RibbonGradient = "ember" | "ink" | "sand" | "pitch";

export function projectRibbon(slug: string): RibbonGradient {
  return ({ "agentic-ops": "ink", "atu-campus": "sand", stratweb: "pitch" } as Record<string, RibbonGradient>)[slug] ?? "ember";
}
