import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080808",
          900: "#0B0B0D",
          850: "#101014",
          800: "#17171C"
        },
        signal: {
          violet: "#B026FF",
          violetSoft: "#C769FF",
          cyan: "#7DE7F2",
          mint: "#98F5CF"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "Consolas", "monospace"]
      },
      letterSpacing: {
        caps: "0.08em"
      },
      boxShadow: {
        violet: "0 0 44px rgba(176, 38, 255, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
