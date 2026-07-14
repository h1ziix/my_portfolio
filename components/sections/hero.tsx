"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { AIWorkflowTerminal } from "@/components/sections/ai-workflow-terminal";
import { portfolio } from "@/data/portfolio";
import { ActionLink } from "@/components/ui/action-link";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="top"
      className="relative flex min-h-screen overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      <Image
        src="/technical-system-texture.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_38%,rgba(176,38,255,0.12),transparent_34rem),linear-gradient(90deg,rgba(8,8,8,0.78),rgba(8,8,8,0.42)_48%,rgba(8,8,8,0.88))]" />
      <div className="shell relative z-10 grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
        <div>
          <motion.p
            className="font-mono text-xs uppercase tracking-caps text-signal-violet"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {portfolio.person.title}
          </motion.p>
          <motion.h1
            id="hero-title"
            className="mt-6 max-w-5xl text-balance text-5xl font-semibold uppercase leading-[0.86] text-white sm:text-6xl md:text-8xl xl:text-[7.5rem] 2xl:text-[8.5rem]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            I build
            <br />
            products,
            <br />
            systems &<br />
            AI workflows.
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-300 md:text-xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            {portfolio.person.summary}
          </motion.p>

          <motion.div
            className="mt-10 grid max-w-3xl gap-3 border-y hairline py-5 sm:grid-cols-3"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
          >
            {portfolio.heroMeta.map((item) => (
              <p
                key={item}
                className="font-mono text-xs uppercase tracking-caps text-zinc-400"
              >
                {item}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
          >
            <ActionLink href="#work" variant="primary">
              View selected work
            </ActionLink>
            <ActionLink href="#contact">Contact me</ActionLink>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          onPointerMove={handlePointerMove}
          style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
          className="min-h-[380px] transform-gpu border hairline bg-black/24 p-5 shadow-violet sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AIWorkflowTerminal />
        </motion.div>
      </div>
    </section>
  );
}
