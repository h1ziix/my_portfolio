"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";
import { useMotionPreference } from "@/lib/use-motion-preference";

/** Enhance the server markup after hydration; content is always visible. */
export function HeroEntrance() {
  const canAnimate = useMotionPreference();

  useEffect(() => {
    if (!canAnimate) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("#top [data-hero-reveal]"));
    const controls = elements.map((element, index) => animate(
      element,
      { transform: ["translateY(8px)", "translateY(0px)"] },
      { duration: index === 4 ? 0.4 : 0.22, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }
    ));

    return () => {
      controls.forEach((control) => control.stop());
      elements.forEach((element) => element.style.removeProperty("transform"));
    };
  }, [canAnimate]);

  return null;
}
