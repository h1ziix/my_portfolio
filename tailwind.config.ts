import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-subtle": "var(--accent-subtle)",
        "accent-text": "var(--accent-text)",
        "on-accent": "var(--on-accent)",
        success: "var(--success)",
        warning: "var(--warning)"
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "Consolas", "monospace"]
      },
      letterSpacing: { caps: "0.08em" },
      borderRadius: { control: "var(--radius-control)", surface: "var(--radius-surface)" },
      boxShadow: { media: "var(--shadow-media)" },
      fontSize: { display: "var(--type-display)", section: "var(--type-section)", card: "var(--type-card)" },
      spacing: { 22: "var(--space-22)" }
    }
  },
  plugins: []
};
export default config;
