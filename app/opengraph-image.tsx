import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Toksoz Sultan — Full-stack development, AI and automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const palette = {
  bg: "#F2EFE8",
  ink: "#1A1714",
  muted: "#6B655C",
  accent: "#C2410C",
  line: "#D9D3C7"
};

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: palette.bg, color: palette.ink, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
        <span style={{ fontWeight: 700 }}>Toksoz Sultan</span>
        <span style={{ color: palette.muted, fontSize: 24 }}>Full-stack developer</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.1 }}>
        <span>Products, agents</span>
        <span style={{ color: palette.accent }}>& automation.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, borderTop: `1px solid ${palette.line}`, paddingTop: 24 }}>
        <div style={{ display: "flex", fontSize: 24, gap: 36 }}><span>TypeScript</span><span>JavaScript</span><span>Python</span><span>PostgreSQL</span></div>
        <div style={{ display: "flex", color: palette.muted, fontSize: 21 }}>Featuring Agentic Ops & ATU Campus</div>
      </div>
    </div>, size
  );
}
