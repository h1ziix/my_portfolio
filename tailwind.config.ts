import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        muted: "var(--muted)",
        line: "var(--line)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-soft": "var(--primary-soft)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-ink": "var(--accent-ink)",
        "accent-wash": "var(--accent-wash)",
        "dark-bg": "var(--dark-bg)",
        "dark-surface": "var(--dark-surface)",
        "dark-ink": "var(--dark-ink)",
        "dark-muted": "var(--dark-muted)",
        "dark-line": "var(--dark-line)",
        "dark-accent": "var(--dark-accent)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        slate: "var(--slate)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        "control-rule": "var(--control-rule)",
        action: "var(--action)",
        "action-hover": "var(--action-hover)",
        "on-action": "var(--on-action)"
      },
      fontFamily: {
        sans: ["var(--font-text)", "Arial", "sans-serif"]
      },
      borderRadius: { control: "var(--radius-control)", surface: "var(--radius-surface)", lg: "6px", full: "6px" },
      borderColor: { DEFAULT: "var(--line)" },
      ringColor: { DEFAULT: "var(--accent)" },
      ringOffsetColor: { DEFAULT: "var(--bg)" },
      boxShadow: { DEFAULT: "none", sm: "none", md: "none", lg: "none", xl: "none", "2xl": "none", inner: "none" },
      fontSize: { hero: "var(--type-hero)", section: "var(--type-section)", name: "var(--type-name)", row: "var(--type-row)" }
    }
  },
  plugins: []
};
export default config;
