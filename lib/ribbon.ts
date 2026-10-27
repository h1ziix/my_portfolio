export type RibbonGradient = "ember" | "ink" | "sand" | "pitch" | "cobalt";

export function projectRibbon(slug: string): RibbonGradient {
  return ({ "leadpilot-ai": "cobalt", "agentic-ops": "ink", "atu-campus": "sand", stratweb: "pitch" } as Record<string, RibbonGradient>)[slug] ?? "ember";
}
