"use client";

import { useEffect, useRef } from "react";

/** Animate the visible numerals once; assistive technology receives the exact final value. */
export function CountUpNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
    const onPreference = () => {
      if (media.matches) finish();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        if (media.matches) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 640);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = value.replace(/\d[\d,]*/g, (number) => {
            const current = Math.round(
              Number(number.replaceAll(",", "")) * eased,
            );
            return number.includes(",")
              ? current.toLocaleString("en-US")
              : String(current);
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    media.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", onPreference);
    };
  }, [value]);
  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
