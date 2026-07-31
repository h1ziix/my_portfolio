"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.18
  });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="absolute -bottom-px left-0 h-px w-full origin-left bg-signal-violet shadow-[0_0_10px_rgba(176,38,255,0.85)]"
      style={{ scaleX: progress }}
    />
  );
}
