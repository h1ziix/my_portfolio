"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionPreference } from "@/lib/use-motion-preference";

export function ScrollProgress() {
  const canAnimate = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.18
  });

  return (
    <motion.div
      aria-hidden="true"
      className="absolute -bottom-px left-0 h-px w-full origin-left bg-accent motion-reduce:hidden"
      style={{ scaleX: canAnimate ? progress : 0 }}
    />
  );
}
