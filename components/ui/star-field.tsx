"use client";

import { useEffect, useRef, useState } from "react";
import { isMotionReduced, subscribeToMotionPreference } from "@/lib/motion-preference";

type Star = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
  color: number;
  vx: number;
  vy: number;
};
type Mask = {
  left: number;
  top: number;
  width: number;
  height: number;
  alpha: number;
};
type Meteor = {
  x: number;
  y: number;
  angle: number;
  distance: number;
  start: number;
};

const FRAME_MS = 1000 / 30;
const PARALLAX = [0.02, 0.04, 0.07];
const DRIFT = [0.25, 0.7, 2];
const TAU = Math.PI * 2;
const random = (min: number, max: number) => min + Math.random() * (max - min);
const wrap = (value: number, size: number) => ((value % size) + size) % size;
const textMasks =
  ".site-nav, .hero-copy, .hero-reel, .hero-proof-wrap, .section-heading, .chapter-aside, .chapter-points, .production-metrics, .film-caption, .index-row, .index-details-content, .experience-node, .process-statement, .process-step, .contact-content, .footer-bottom, .case-study .section";

function createStar(index: number): Star {
  const slot = index % 10;
  const depth = slot < 6 ? 0 : slot < 9 ? 1 : 2;
  const angle = random(0, TAU);
  return {
    x: Math.random(),
    y: Math.random(),
    depth,
    radius:
      depth === 0
        ? random(0.4, 0.9)
        : depth === 1
          ? random(0.9, 1.5)
          : random(3, 7),
    opacity:
      depth === 0
        ? random(0.25, 0.5)
        : depth === 1
          ? random(0.45, 0.75)
          : random(0.6, 1),
    phase: random(0, TAU),
    speed: random(0.4, 1.4),
    color: Math.random(),
    vx: Math.cos(angle) * DRIFT[depth],
    vy: Math.sin(angle) * DRIFT[depth],
  };
}

/** These tiny, unattached buffers cache gradients; each instance renders just one DOM canvas. */
function gradientBuffer(
  width: number,
  height: number,
  start: string,
  end: string,
) {
  const buffer = document.createElement("canvas");
  buffer.width = width;
  buffer.height = height;
  const context = buffer.getContext("2d")!;
  const gradient = context.createLinearGradient(
    0,
    0,
    width > 1 ? width : 0,
    height > 1 ? height : 0,
  );
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  return buffer;
}

export function StarField({ variant }: { variant?: "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!mounted || !canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const local = variant === "dark";
    const section = local ? canvas.parentElement : null;
    let reduced = isMotionReduced();
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const stars: Star[] = [];
    const crystals: Star[] = [];
    const masks: Mask[] = [];
    const edges = [
      gradientBuffer(32, 1, "transparent", "#000"),
      gradientBuffer(32, 1, "#000", "transparent"),
      gradientBuffer(1, 32, "transparent", "#000"),
      gradientBuffer(1, 32, "#000", "transparent"),
    ];
    let width = 0,
      height = 0,
      dpr = 1,
      canvasLeft = 0,
      canvasTop = 0;
    let scroll = window.scrollY,
      mobile = window.innerWidth < 768,
      inView = false;
    let coveredTop = Infinity,
      coveredBottom = -Infinity;
    let frame = 0,
      lastDraw = 0,
      lastTick = 0,
      elapsed = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let disposed = false;
    let sizeKey = "";
    let dark = false,
      opacity = 0.55;
    let core = "",
      tint = "",
      warm = "",
      glowColor = "";
    let dotPalette = "";
    let dots: HTMLCanvasElement[] = [];
    let glow: HTMLCanvasElement | null = null;
    let flare: Star | null = null,
      flareStart = 0;
    let nextFlare = random(mobile ? 7 : 4, mobile ? 10 : 7);
    let nextMeteor = random(14, 22);
    let meteor: Meteor | null = null;

    function readPalette() {
      const style = getComputedStyle(canvas!);
      dark = style.getPropertyValue("--star-dark").trim() === "1";
      opacity = Number(style.getPropertyValue("--star-opacity").trim());
      core = style.getPropertyValue("--star-core").trim();
      tint = style.getPropertyValue("--star-tint").trim();
      warm = style.getPropertyValue("--star-warm").trim();
      const palette = `${core}/${tint}/${warm}`;
      if (palette !== dotPalette) {
        // Avoid rebuilding hundreds of circle paths and parsing their colors per frame.
        dots = [core, tint, warm].map((color) => {
          const dot = document.createElement("canvas");
          dot.width = dot.height = 16;
          const dotContext = dot.getContext("2d")!;
          dotContext.fillStyle = color;
          dotContext.beginPath();
          dotContext.arc(8, 8, 6, 0, TAU);
          dotContext.fill();
          return dot;
        });
        dotPalette = palette;
      }
      const color = style.getPropertyValue("--star-glow").trim();
      if (dark && (!glow || color !== glowColor)) {
        glow = document.createElement("canvas");
        glow.width = glow.height = 64;
        const glowContext = glow.getContext("2d")!;
        const gradient = glowContext.createRadialGradient(
          32,
          32,
          0,
          32,
          32,
          32,
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "transparent");
        glowContext.fillStyle = gradient;
        glowContext.fillRect(0, 0, 64, 64);
        glowColor = color;
      }
      if (!dark) meteor = null;
    }

    function cacheMasks() {
      masks.length = 0;
      const scope = section ?? document;
      const selector = local
        ? ".section-heading, .stack-filters, .bento-cell"
        : textMasks;
      for (const element of Array.from(scope.querySelectorAll(selector))) {
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        masks.push({
          left: rect.left + window.scrollX,
          top: rect.top + scroll,
          width: rect.width,
          height: rect.height,
          alpha: 0.7,
        });
      }
      // The existing orange headline needs a little more protection than body ink.
      if (!local) {
        const headline = document
          .querySelector(".hero-title")
          ?.getBoundingClientRect();
        if (headline)
          masks.push({
            left: headline.left + window.scrollX,
            top: headline.top + scroll,
            width: headline.width,
            height: headline.height,
            alpha: 0.5,
          });
        const opaque = document
          .querySelector("#skills")
          ?.getBoundingClientRect();
        coveredTop = opaque ? opaque.top + scroll : Infinity;
        coveredBottom = opaque ? opaque.bottom + scroll : -Infinity;
      }
    }

    function drawMasks(still: boolean) {
      context!.save();
      context!.globalCompositeOperation = "destination-out";
      context!.fillStyle = "#000";
      // A fixed static frame cannot follow document text while scrolling. Keep its
      // whole field below the existing contrast floor without repainting on scroll.
      if (still && !local) {
        context!.globalAlpha = dark ? 0.85 : 0.7;
        context!.fillRect(0, 0, width, height);
        context!.restore();
        return;
      }
      const offsetY = local ? canvasTop : scroll;
      for (let i = 0; i < masks.length; i++) {
        const mask = masks[i];
        const x = mask.left - canvasLeft;
        const y = mask.top - offsetY;
        if (y > height + 24 || y + mask.height < -24) continue;
        context!.globalAlpha = mask.alpha;
        context!.fillRect(x, y, mask.width, mask.height);
        context!.drawImage(edges[0], x - 24, y, 24, mask.height);
        context!.drawImage(edges[1], x + mask.width, y, 24, mask.height);
        context!.drawImage(edges[2], x, y - 24, mask.width, 24);
        context!.drawImage(edges[3], x, y + mask.height, mask.width, 24);
      }
      context!.restore();
    }

    function paint(delta: number, still = reduced) {
      if (!width || !height) return;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      context!.clearRect(0, 0, width, height);
      const time = still ? 0 : elapsed;
      if (!still && elapsed >= nextFlare) {
        flare = crystals[Math.floor(Math.random() * crystals.length)] ?? null;
        flareStart = elapsed;
        nextFlare = elapsed + random(mobile ? 7 : 4, mobile ? 10 : 7);
      }
      if (flare && elapsed - flareStart > 0.9) flare = null;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!still) {
          star.x = wrap(star.x + (star.vx * delta) / width, 1);
          star.y = wrap(star.y + (star.vy * delta) / height, 1);
        }
        const x = star.x * width;
        const y = wrap(
          star.y * height - (still ? 0 : scroll * PARALLAX[star.depth]),
          height,
        );
        const burn =
          !still && star === flare
            ? Math.sin((Math.PI * (elapsed - flareStart)) / 0.9) ** 2
            : 0;
        const twinkle = still
          ? 0.55
          : 0.55 + 0.45 * Math.sin(time * star.speed + star.phase);
        context!.globalAlpha =
          (star.opacity * twinkle + (1 - star.opacity * twinkle) * burn) *
          opacity;
        const colorIndex = dark
          ? star.color < 0.7
            ? 1
            : star.color < 0.75
              ? 2
              : 0
          : star.color < 0.4
            ? 0
            : star.color < 0.75
              ? 1
              : 2;
        if (star.depth < 2) {
          const size = star.radius * (8 / 3);
          context!.drawImage(
            dots[colorIndex],
            x - size / 2,
            y - size / 2,
            size,
            size,
          );
          continue;
        }
        const color = colorIndex === 0 ? core : colorIndex === 1 ? tint : warm;
        context!.fillStyle = color;
        const scale = still
          ? 1
          : 0.975 + 0.125 * Math.sin(time * star.speed + star.phase);
        const ray = (dark ? star.radius : 1) * scale * (1 + 0.6 * burn);
        if (dark && glow)
          context!.drawImage(glow, x - ray * 3, y - ray * 3, ray * 6, ray * 6);
        context!.save();
        context!.translate(x, y);
        context!.rotate(
          still ? 0 : (Math.sin(time * 0.12 + star.phase) * Math.PI) / 22.5,
        );
        context!.strokeStyle = color;
        context!.lineWidth = dark ? 0.65 : 1;
        const diagonal = ray * 0.4 * Math.SQRT1_2;
        context!.beginPath();
        context!.moveTo(-ray, 0);
        context!.lineTo(ray, 0);
        context!.moveTo(0, -ray);
        context!.lineTo(0, ray);
        context!.moveTo(-diagonal, -diagonal);
        context!.lineTo(diagonal, diagonal);
        context!.moveTo(-diagonal, diagonal);
        context!.lineTo(diagonal, -diagonal);
        context!.stroke();
        context!.beginPath();
        context!.arc(0, 0, dark ? 0.65 : 0.4, 0, TAU);
        context!.fill();
        context!.restore();
      }
      if (!still && !local && dark && !mobile) {
        if (elapsed >= nextMeteor) {
          meteor = {
            x: random(0.08, 0.65) * width,
            y: random(0.08, 0.45) * height,
            angle: (random(20, 35) * Math.PI) / 180,
            distance: random(280, 420),
            start: elapsed,
          };
          nextMeteor = elapsed + random(14, 22);
        }
        if (meteor) {
          const progress = (elapsed - meteor.start) / 0.7;
          if (progress > 1) meteor = null;
          else {
            const dx = Math.cos(meteor.angle),
              dy = Math.sin(meteor.angle);
            const x = meteor.x + dx * meteor.distance * progress;
            const y = meteor.y + dy * meteor.distance * progress;
            context!.strokeStyle = core;
            context!.lineWidth = 1;
            for (let segment = 0; segment < 16; segment++) {
              context!.globalAlpha =
                Math.sin(progress * Math.PI) * (1 - segment / 16) * 0.7;
              context!.beginPath();
              context!.moveTo(x - dx * segment * 6, y - dy * segment * 6);
              context!.lineTo(
                x - dx * (segment + 1) * 6,
                y - dy * (segment + 1) * 6,
              );
              context!.stroke();
            }
          }
        }
      }
      drawMasks(still);
      context!.globalAlpha = 1;
    }

    function canRun() {
      const covered =
        !local && scroll >= coveredTop && scroll + height <= coveredBottom;
      return (
        !disposed && !document.hidden && inView && !reduced && !covered
      );
    }
    function tick(timestamp: number) {
      frame = 0;
      if (!canRun()) return;
      if (timestamp - lastDraw >= FRAME_MS) {
        const delta = lastTick
          ? Math.min(0.1, (timestamp - lastTick) / 1000)
          : 0;
        elapsed += delta;
        lastTick = timestamp;
        lastDraw = timestamp - ((timestamp - lastDraw) % FRAME_MS);
        paint(delta);
      }
      frame = requestAnimationFrame(tick);
    }
    function syncLoop() {
      if (canRun()) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
        frame = lastDraw = lastTick = 0;
      }
    }
    function resize() {
      if (disposed) return;
      scroll = window.scrollY;
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextTop = rect.top + scroll;
      const key = `${rect.width}/${rect.height}/${nextDpr}/${nextTop}/${document.body.offsetHeight}/${window.innerWidth}`;
      if (key === sizeKey) return;
      sizeKey = key;
      width = rect.width;
      height = rect.height;
      canvasLeft = rect.left + window.scrollX;
      canvasTop = rect.top + scroll;
      dpr = nextDpr;
      const newWidth = Math.round(width * dpr),
        newHeight = Math.round(height * dpr);
      if (canvas!.width !== newWidth) canvas!.width = newWidth;
      if (canvas!.height !== newHeight) canvas!.height = newHeight;
      const wasMobile = mobile;
      mobile = window.innerWidth < 768;
      if (wasMobile !== mobile) {
        nextFlare = elapsed + random(mobile ? 7 : 4, mobile ? 10 : 7);
        meteor = null;
      }
      const count = Math.min(
        160,
        Math.round((width * height) / (mobile ? 14000 : 9000)),
      );
      while (stars.length < count) stars.push(createStar(stars.length));
      stars.length = count;
      crystals.length = 0;
      for (let i = 0; i < stars.length; i++)
        if (stars[i].depth === 2) crystals.push(stars[i]);
      canvas!.dataset.starCount = String(count);
      scroll = window.scrollY;
      cacheMasks();
      paint(0);
      syncLoop();
    }
    function queueResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }
    function onScroll() {
      scroll = window.scrollY;
      syncLoop();
    }
    function onTheme() {
      readPalette();
      nextMeteor = elapsed + random(14, 22);
      paint(0);
    }
    function onMotion() {
      reduced = isMotionReduced();
      flare = meteor = null;
      nextFlare = elapsed + random(mobile ? 7 : 4, mobile ? 10 : 7);
      nextMeteor = elapsed + random(14, 22);
      paint(0);
      syncLoop();
    }

    readPalette();
    resize();
    const sizeObserver = new ResizeObserver(queueResize);
    sizeObserver.observe(canvas);
    sizeObserver.observe(document.body);
    if (section) sizeObserver.observe(section);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncLoop();
    });
    visibilityObserver.observe(canvas);
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", syncLoop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", queueResize, { passive: true });
    const unsubscribeMotion = subscribeToMotionPreference(onMotion);
    systemTheme.addEventListener("change", onTheme);
    if (document.fonts.status !== "loaded") {
      void document.fonts.ready.then(() => {
        if (!disposed) {
          sizeKey = "";
          queueResize();
        }
      });
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", queueResize);
      unsubscribeMotion();
      systemTheme.removeEventListener("change", onTheme);
    };
  }, [mounted, variant]);

  return mounted ? (
    <canvas
      ref={canvasRef}
      className={`star-field${variant === "dark" ? " star-field--dark" : ""}`}
      aria-hidden="true"
    />
  ) : null;
}
