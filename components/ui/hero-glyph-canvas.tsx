"use client";

import { useEffect, useRef } from "react";

type GlyphSpec = {
  char: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  dx: number;
  dy: number;
  rot: number;
  alpha: number;
  mono?: boolean;
};

const GLYPHS: GlyphSpec[] = [
  { char: "F", x: 0.02, y: 0.08, size: 36, speed: 0.9, phase: 0.2, dx: 16, dy: -20, rot: 0.24, alpha: 0.38 },
  { char: "TS", x: 0.18, y: 0.03, size: 14, speed: 1.1, phase: 1.4, dx: -14, dy: 16, rot: -0.2, alpha: 0.48, mono: true },
  { char: "R", x: 0.33, y: 0.06, size: 26, speed: 0.85, phase: 2.1, dx: 14, dy: -18, rot: 0.26, alpha: 0.34 },
  { char: "I", x: 0.48, y: 0.04, size: 28, speed: 0.95, phase: 3.0, dx: 16, dy: -14, rot: 0.3, alpha: 0.36 },
  { char: "AI", x: 0.67, y: 0.02, size: 15, speed: 1.15, phase: 0.8, dx: -18, dy: 15, rot: 0.18, alpha: 0.5, mono: true },
  { char: "{ }", x: 0.85, y: 0.07, size: 17, speed: 0.9, phase: 4.1, dx: 14, dy: 18, rot: -0.25, alpha: 0.44, mono: true },
  { char: "M", x: 0.95, y: 0.13, size: 32, speed: 1.0, phase: 1.9, dx: -18, dy: 14, rot: -0.28, alpha: 0.32 },
  { char: "D", x: 0.91, y: 0.22, size: 40, speed: 0.8, phase: 1.1, dx: -16, dy: -20, rot: 0.32, alpha: 0.34 },
  { char: "λ", x: 0.75, y: 0.16, size: 24, speed: 1.2, phase: 2.8, dx: 14, dy: -16, rot: -0.3, alpha: 0.46, mono: true },
  { char: "E", x: 0.01, y: 0.26, size: 32, speed: 0.92, phase: 3.6, dx: 18, dy: 14, rot: -0.22, alpha: 0.36 },
  { char: "A", x: 0.59, y: 0.27, size: 36, speed: 1.02, phase: 0.9, dx: -14, dy: -18, rot: 0.26, alpha: 0.36 },
  { char: "/>", x: 0.83, y: 0.33, size: 16, speed: 1.08, phase: 4.7, dx: 16, dy: -12, rot: 0.2, alpha: 0.48, mono: true },
  { char: "T", x: 0.96, y: 0.37, size: 34, speed: 0.88, phase: 1.6, dx: -18, dy: 18, rot: 0.24, alpha: 0.32 },
  { char: "W", x: 0.01, y: 0.45, size: 42, speed: 0.78, phase: 2.2, dx: 20, dy: -16, rot: -0.26, alpha: 0.34 },
  { char: "O", x: 0.51, y: 0.42, size: 32, speed: 0.98, phase: 1.5, dx: -16, dy: 18, rot: 0.34, alpha: 0.38 },
  { char: "R", x: 0.71, y: 0.45, size: 38, speed: 0.86, phase: 3.3, dx: 15, dy: -20, rot: -0.3, alpha: 0.36 },
  { char: "K", x: 0.89, y: 0.48, size: 30, speed: 0.94, phase: 0.4, dx: -14, dy: 16, rot: 0.25, alpha: 0.4 },
  { char: "01", x: 0.32, y: 0.36, size: 14, speed: 1.18, phase: 2.6, dx: 12, dy: -14, rot: -0.18, alpha: 0.44, mono: true },
  { char: "N", x: 0.66, y: 0.54, size: 34, speed: 0.9, phase: 3.8, dx: 18, dy: 14, rot: -0.28, alpha: 0.34 },
  { char: "G", x: 0.85, y: 0.57, size: 36, speed: 0.84, phase: 2.3, dx: -16, dy: -18, rot: 0.3, alpha: 0.34 },
  { char: "P", x: 0.02, y: 0.64, size: 38, speed: 0.88, phase: 4.0, dx: 16, dy: 18, rot: 0.28, alpha: 0.34 },
  { char: "U", x: 0.63, y: 0.61, size: 34, speed: 0.96, phase: 1.8, dx: -18, dy: -15, rot: -0.32, alpha: 0.36 },
  { char: "C", x: 0.8, y: 0.65, size: 32, speed: 1.04, phase: 3.1, dx: 15, dy: 18, rot: 0.24, alpha: 0.38 },
  { char: "T", x: 0.93, y: 0.69, size: 40, speed: 0.82, phase: 0.7, dx: -15, dy: -18, rot: -0.26, alpha: 0.34 },
  { char: "SQL", x: 0.46, y: 0.74, size: 13, speed: 1.12, phase: 2.4, dx: 14, dy: -16, rot: 0.16, alpha: 0.46, mono: true },
  { char: "API", x: 0.73, y: 0.77, size: 14, speed: 1.0, phase: 4.4, dx: -16, dy: 14, rot: -0.18, alpha: 0.46, mono: true },
  { char: "✦", x: 0.27, y: 0.14, size: 20, speed: 1.25, phase: 1.2, dx: 12, dy: -18, rot: 0.65, alpha: 0.54 },
  { char: "✦", x: 0.56, y: 0.5, size: 22, speed: 1.15, phase: 3.7, dx: -14, dy: 16, rot: -0.6, alpha: 0.52 },
  { char: "∞", x: 0.87, y: 0.84, size: 24, speed: 0.92, phase: 2.0, dx: 16, dy: -14, rot: 0.28, alpha: 0.44, mono: true },
  { char: "ZOD", x: 0.12, y: 0.79, size: 13, speed: 1.06, phase: 3.5, dx: -12, dy: -15, rot: -0.14, alpha: 0.42, mono: true },
  { char: "S", x: 0.37, y: 0.88, size: 28, speed: 0.9, phase: 1.3, dx: 14, dy: -18, rot: 0.3, alpha: 0.34 },
  { char: "⚡", x: 0.78, y: 0.91, size: 18, speed: 1.2, phase: 0.6, dx: 12, dy: -16, rot: 0.2, alpha: 0.46 },
];

const PALETTE: [number, number, number][] = [
  [194, 65, 12],   // #c2410c ember
  [234, 88, 12],   // #ea580c orange
  [245, 158, 11],  // #f59e0b amber gold
  [236, 72, 153],  // #ec4899 rose
  [104, 123, 255], // #687bff cobalt
];

const FRAME_MS = 1000 / 30;

function sampleColor(t: number): string {
  const n = PALETTE.length;
  const scaled = ((t % 1) + 1) % 1 * n;
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const c0 = PALETTE[idx % n];
  const c1 = PALETTE[(idx + 1) % n];
  const r = Math.round(c0[0] + (c1[0] - c0[0]) * frac);
  const g = Math.round(c0[1] + (c1[1] - c0[1]) * frac);
  const b = Math.round(c0[2] + (c1[2] - c0[2]) * frac);
  return `rgb(${r},${g},${b})`;
}

export function HeroGlyphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let inView = true;
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let lastDraw = 0;
    let startTime = 0;
    let disposed = false;

    const computed = getComputedStyle(document.documentElement);
    const displayFont =
      computed.getPropertyValue("--font-display").trim() ||
      '"Arial Narrow", Arial, sans-serif';
    const monoFont =
      computed.getPropertyValue("--font-mono").trim() || "monospace";

    function canRun() {
      return !disposed && !document.hidden && inView && !scrolling;
    }

    function draw(timeSec: number) {
      if (!width || !height || !ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < GLYPHS.length; i++) {
        const g = GLYPHS[i];
        const wave = Math.sin(timeSec * g.speed + g.phase);
        const waveCos = Math.cos(timeSec * g.speed * 0.85 + g.phase);
        const x = g.x * width + g.dx * wave;
        const y = g.y * height + g.dy * waveCos;
        const angle = g.rot * wave;
        const scale = 1 + 0.08 * waveCos;
        const colorT = timeSec * 0.18 + i * 0.09;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);
        ctx.globalAlpha = g.alpha * (0.82 + 0.18 * wave);
        ctx.fillStyle = sampleColor(colorT);
        ctx.font = g.mono
          ? `500 ${g.size}px ${monoFont}`
          : `700 ${g.size}px ${displayFont}`;
        ctx.fillText(g.char, 0, 0);
        ctx.restore();
      }
    }

    function tick(now: number) {
      frame = 0;
      if (!canRun()) return;
      if (!startTime) startTime = now;
      if (now - lastDraw >= FRAME_MS) {
        lastDraw = now;
        draw((now - startTime) / 1000);
      }
      frame = requestAnimationFrame(tick);
    }

    function syncLoop() {
      if (canRun()) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    function resize() {
      if (disposed || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      draw(startTime ? (performance.now() - startTime) / 1000 : 0);
      syncLoop();
    }

    function onScroll() {
      if (!scrolling) {
        scrolling = true;
        document.documentElement.dataset.scrolling = "true";
        syncLoop();
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        delete document.documentElement.dataset.scrolling;
        syncLoop();
      }, 120);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncLoop);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(scrollTimer);
      delete document.documentElement.dataset.scrolling;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", syncLoop);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-glyph-canvas"
      aria-hidden="true"
    />
  );
}
