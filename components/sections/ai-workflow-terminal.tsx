"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const INTRO = "> initializing agent workflow...";

const WORKFLOW_STEPS = [
  "ANALYZE REQUEST",
  "DECOMPOSE TASK",
  "SEARCH CODEBASE",
  "DESIGN ARCHITECTURE",
  "IMPLEMENT",
  "RUN TESTS",
  "REVIEW DIFF",
  "DEPLOY"
] as const;

const TEST_OUTPUT = [
  "api routes",
  "database layer",
  "auth flow",
  "edge cases"
] as const;

const LOOP_MS = 12000;
const TYPING_END_MS = 1450;
const STEP_START_MS = 1850;
const STEP_INTERVAL_MS = 430;
const IMPLEMENT_COMPLETE_MS = 4700;
const TESTS_ACTIVE_MS = 5200;
const TEST_OUTPUT_START_MS = 5550;
const TEST_OUTPUT_INTERVAL_MS = 330;
const REVIEW_ACTIVE_MS = 7600;
const DEPLOY_ACTIVE_MS = 8900;
const FINAL_STATE_MS = 9950;

type StepStatus = "complete" | "active" | "pending";

function getLoopTime(shouldReduceMotion: boolean, elapsedMs: number) {
  if (shouldReduceMotion) {
    return FINAL_STATE_MS + 300;
  }

  return elapsedMs % LOOP_MS;
}

function getTypedLength(loopMs: number) {
  if (loopMs >= TYPING_END_MS) {
    return INTRO.length;
  }

  return Math.max(0, Math.floor(loopMs / 46));
}

function getStepStatus(loopMs: number, index: number): StepStatus {
  if (loopMs < STEP_START_MS) {
    return "pending";
  }

  const activeIndex = Math.min(
    WORKFLOW_STEPS.length - 1,
    Math.floor((loopMs - STEP_START_MS) / STEP_INTERVAL_MS)
  );

  if (index < activeIndex) {
    return "complete";
  }

  if (index === activeIndex) {
    if (index === 4 && loopMs >= IMPLEMENT_COMPLETE_MS) {
      return "complete";
    }

    if (index === 5 && loopMs < TESTS_ACTIVE_MS) {
      return "pending";
    }

    if (index === 6 && loopMs < REVIEW_ACTIVE_MS) {
      return "pending";
    }

    if (index === 7 && loopMs < DEPLOY_ACTIVE_MS) {
      return "pending";
    }

    return "active";
  }

  if (index === 5 && loopMs >= TESTS_ACTIVE_MS && loopMs < REVIEW_ACTIVE_MS) {
    return "active";
  }

  if (index === 6 && loopMs >= REVIEW_ACTIVE_MS && loopMs < DEPLOY_ACTIVE_MS) {
    return "active";
  }

  if (index === 7 && loopMs >= DEPLOY_ACTIVE_MS && loopMs < FINAL_STATE_MS) {
    return "active";
  }

  if (loopMs >= FINAL_STATE_MS) {
    return "complete";
  }

  return "pending";
}

function getVisibleTestLines(loopMs: number) {
  if (loopMs < TEST_OUTPUT_START_MS) {
    return 0;
  }

  return Math.min(
    TEST_OUTPUT.length,
    Math.floor((loopMs - TEST_OUTPUT_START_MS) / TEST_OUTPUT_INTERVAL_MS) + 1
  );
}

function StatusGlyph({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return <span className="text-zinc-100">{"\u2713"}</span>;
  }

  if (status === "active") {
    return <span className="text-signal-violet">{"\u25cf"}</span>;
  }

  return <span className="text-zinc-600">{"\u25cb"}</span>;
}

export function AIWorkflowTerminal() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const update = (now: number) => {
      setElapsedMs(now - startedAt);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  const loopMs = getLoopTime(shouldReduceMotion, elapsedMs);
  const typedIntro = INTRO.slice(0, getTypedLength(loopMs));
  const introReady = typedIntro.length === INTRO.length;
  const visibleTestLines = getVisibleTestLines(loopMs);
  const finalState = loopMs >= FINAL_STATE_MS;
  const livePulse = !shouldReduceMotion && !finalState;

  const stepStatuses = useMemo(
    () => WORKFLOW_STEPS.map((_, index) => getStepStatus(loopMs, index)),
    [loopMs]
  );

  return (
    <div className="technical-surface relative flex h-full min-h-full flex-col overflow-hidden border border-white/8 bg-black/55">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,38,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_32%,rgba(255,255,255,0.02))]" />
      <div className="absolute inset-x-0 top-[70px] h-px bg-white/8" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative z-10 grid h-full flex-1 grid-rows-[auto_1fr_auto] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <p className="font-mono text-[0.64rem] uppercase tracking-caps text-zinc-500">
            AI ENGINEERING PIPELINE
          </p>
          <div className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-caps text-zinc-300">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-signal-violet",
                livePulse && "shadow-[0_0_14px_rgba(176,38,255,0.75)]"
              )}
            />
            <span className={cn(livePulse && "text-white")}>LIVE</span>
          </div>
        </div>

        <div className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-5 pt-4">
          <div className="border border-white/8 bg-black/22 px-3 py-3 font-mono text-[0.72rem] text-zinc-300">
            <span>{typedIntro}</span>
            <span
              className={cn(
                "ml-1 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.18em] bg-signal-violet/85",
                !shouldReduceMotion && "animate-[blink_1.1s_steps(1,end)_infinite]"
              )}
            />
          </div>

          <div className="grid gap-1.5">
            {WORKFLOW_STEPS.map((step, index) => {
              const status = stepStatuses[index];
              const isActive = status === "active";

              return (
                <motion.div
                  key={step}
                  layout={false}
                  className={cn(
                    "grid grid-cols-[40px_1fr_18px] items-center gap-3 border border-transparent px-3 py-2 font-mono text-[0.67rem] uppercase tracking-caps transition-colors",
                    status === "pending" && "text-zinc-600",
                    status === "complete" && "border-white/6 bg-white/[0.02] text-zinc-200",
                    isActive &&
                      "border-signal-violet/30 bg-signal-violet/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(176,38,255,0.08),0_0_18px_rgba(176,38,255,0.1)]"
                  )}
                  animate={
                    isActive && !shouldReduceMotion
                      ? { opacity: [0.92, 1, 0.92] }
                      : { opacity: 1 }
                  }
                  transition={
                    isActive && !shouldReduceMotion
                      ? {
                          duration: 1.7,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }
                      : { duration: 0.2 }
                  }
                >
                  <span className={cn(isActive ? "text-signal-violet" : "text-zinc-500")}>
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  <span className="truncate">{step}</span>
                  <span className="justify-self-end">
                    <StatusGlyph status={status} />
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="grid min-h-0 grid-rows-[auto_auto] gap-4 border-t border-white/8 pt-4">
            <div className="grid gap-2 border border-white/8 bg-black/22 p-3 font-mono text-[0.67rem] uppercase tracking-caps">
              <div className="grid grid-cols-[62px_1fr] gap-3 text-zinc-500">
                <span>MODEL</span>
                <span className="text-zinc-300">CODEX / CLAUDE</span>
              </div>
              <div className="grid grid-cols-[62px_1fr] gap-3 text-zinc-500">
                <span>STACK</span>
                <span className="text-zinc-300">NEXT.JS / NODE.JS / TYPESCRIPT</span>
              </div>
              <div className="grid grid-cols-[62px_1fr] gap-3 text-zinc-500">
                <span>MODE</span>
                <span className="text-zinc-300">AGENTIC</span>
              </div>
              <div className="grid grid-cols-[62px_1fr] gap-3 text-zinc-500">
                <span>STATUS</span>
                <span className={cn(finalState ? "text-zinc-100" : "text-signal-violet")}>
                  {finalState ? "SYSTEM READY" : "BUILDING..."}
                </span>
              </div>
            </div>

            <div className="min-h-[112px] border border-white/8 bg-black/22 p-3 font-mono text-[0.67rem] text-zinc-300">
              {loopMs >= TESTS_ACTIVE_MS ? (
                <div className="grid gap-1.5">
                  <p className="text-zinc-300">&gt; running test suite...</p>
                  {TEST_OUTPUT.slice(0, visibleTestLines).map((line) => (
                    <p key={line} className="flex items-center gap-2 text-zinc-400">
                      <span className="text-signal-violet">{"\u2713"}</span>
                      <span>{line}</span>
                    </p>
                  ))}
                  {finalState ? (
                    <div className="pt-2 text-zinc-100">
                      <p>BUILD PASSED</p>
                      <p className="mt-1 text-signal-violet">SYSTEM READY</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-zinc-600">
                  {introReady ? "&gt; awaiting execution..." : "\u00A0"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 font-mono text-[0.64rem] uppercase tracking-caps text-zinc-500">
          AI-assisted engineering {"\u2260"} blind code generation
        </div>
      </div>
    </div>
  );
}
