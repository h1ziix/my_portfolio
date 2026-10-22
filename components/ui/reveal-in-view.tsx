"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { isMotionReduced, subscribeToMotionPreference } from "@/lib/motion-preference";

/** Content remains visible with JS disabled. Only off-screen content is prepared to enter. */
export function RevealInView({
  children,
  className = "",
  order = 0,
  dimmed = false,
}: {
  children: ReactNode;
  className?: string;
  order?: number;
  dimmed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!isMotionReduced() && element.getBoundingClientRect().top > window.innerHeight)
      element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    const unsubscribe = subscribeToMotionPreference(() => {
      if (!isMotionReduced() && element.dataset.reveal !== "visible") {
        if (element.getBoundingClientRect().top > window.innerHeight)
          element.dataset.reveal = "pending";
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal-in-view ${className}`}
      data-dimmed={dimmed}
      style={{ "--reveal-delay": `${order * 60}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
