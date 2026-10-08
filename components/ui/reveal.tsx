"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionPreference } from "@/lib/use-motion-preference";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div"
}: RevealProps) {
  const canAnimate = useMotionPreference();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={false}
      animate={canAnimate ? undefined : { y: 0 }}
      whileInView={canAnimate ? { y: [18, 0] } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
