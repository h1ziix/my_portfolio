"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { RibbonGradient } from "@/lib/ribbon";

type RibbonProps = {
  variant: "band" | "edge" | "underline" | "rail" | "cross";
  gradient?: RibbonGradient;
  children?: ReactNode;
  className?: string;
  steps?: number;
  accessibleText?: string;
};
const variantClasses = {
  band: "ribbon--band",
  edge: "ribbon--edge",
  underline: "ribbon--underline",
  rail: "ribbon--rail",
  cross: "ribbon--cross",
};

function TapeTrack({ children }: { children: ReactNode }) {
  return (
    <div className="ribbon-marquee" aria-hidden="true">
      {[0, 1].map((group) => (
        <div className="ribbon-marquee-group" key={group}>
          {[0, 1, 2, 3].map((item) => (
            <span className="ribbon-tape-text" key={item}>
              {children}
              <span className="ribbon-separator">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Repeated tape is decorative; accessibleText exposes its message once. */
export function Ribbon({
  variant,
  gradient = "ember",
  children,
  className = "",
  steps = 0,
  accessibleText,
}: RibbonProps) {
  const elementRef = useRef<HTMLDivElement | HTMLSpanElement | null>(null);
  const Root = variant === "underline" ? "span" : "div";
  useEffect(() => {
    const element = elementRef.current;
    if (!element || className.includes("hero-underline")) return;
    let frame = 0;
    let visible = false;
    const drawRail = () => {
      frame = 0;
      const container = element.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const raw = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.7 - rect.top) / rect.height),
      );
      // Scroll positions round to CSS pixels; allow one pixel at a step boundary.
      const stepped = steps
        ? Math.min(
            1,
            Math.floor((raw + 1 / Math.max(1, rect.height)) * steps) / steps,
          )
        : raw;
      element.style.setProperty("--rail-progress", String(stepped));
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(drawRail);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        element.dataset.visible = String(visible);
        if (visible) {
          element.dataset.drawn = "true";
          if (variant === "rail") onScroll();
        }
      },
      {
        rootMargin: variant === "band" || variant === "cross"
          ? "0px"
          : "0px 0px -8% 0px",
        threshold: variant === "band" || variant === "cross" ? 0 : 0.05,
      },
    );
    observer.observe(
      variant === "rail" ? (element.parentElement ?? element) : element,
    );
    if (variant === "rail") {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      drawRail();
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [variant, steps, className]);
  return (
    <Root
      ref={(node) => {
        elementRef.current = node;
      }}
      className={`ribbon ${variantClasses[variant]} ${className}`}
      data-gradient={gradient}
    >
      {accessibleText ? (
        <span className="sr-only">{accessibleText}</span>
      ) : null}
      {variant === "band" ? (
        <TapeTrack>{children}</TapeTrack>
      ) : variant === "cross" ? (
        <div aria-hidden="true" className="ribbon-cross-bands">
          <div className="ribbon-cross-band" data-gradient="ember">
            {children ? <TapeTrack>{children}</TapeTrack> : null}
          </div>
          <div className="ribbon-cross-band" data-gradient="ink">
            {children ? <TapeTrack>{children}</TapeTrack> : null}
          </div>
        </div>
      ) : (
        <span aria-hidden="true" className="ribbon-fill" />
      )}
    </Root>
  );
}
