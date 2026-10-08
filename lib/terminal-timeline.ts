export const INTRO = "> initializing agent workflow...";
export const LOOP_MS = 12000;
export const TYPING_END_MS = 1450;
export const TESTS_ACTIVE_MS = 5200;
export const TEST_OUTPUT_START_MS = 5550;
export const TEST_OUTPUT_INTERVAL_MS = 330;
export const FINAL_STATE_MS = 9950;

export const WORKFLOW_TIMELINE = [
  { label: "ANALYZE REQUEST", start: 1850, end: 2280 },
  { label: "DECOMPOSE TASK", start: 2280, end: 2710 },
  { label: "SEARCH CODEBASE", start: 2710, end: 3140 },
  { label: "DESIGN ARCHITECTURE", start: 3140, end: 3570 },
  { label: "IMPLEMENT", start: 3570, end: 4700 },
  { label: "RUN TESTS", start: TESTS_ACTIVE_MS, end: 7600 },
  { label: "REVIEW DIFF", start: 7600, end: 8900 },
  { label: "DEPLOY", start: 8900, end: FINAL_STATE_MS }
] as const;

export const TEST_OUTPUT = [
  "api routes",
  "database layer",
  "auth flow",
  "edge cases"
] as const;

export type StepStatus = "complete" | "active" | "pending";
type WorkflowStep = (typeof WORKFLOW_TIMELINE)[number];

export function getLoopTime(canAnimate: boolean, elapsedMs: number) {
  return canAnimate ? elapsedMs % LOOP_MS : FINAL_STATE_MS;
}

export function getTypedLength(loopMs: number) {
  if (loopMs >= TYPING_END_MS) {
    return INTRO.length;
  }

  return Math.max(0, Math.floor(loopMs / 46));
}

export function getStepStatus(loopMs: number, step: WorkflowStep): StepStatus {
  if (loopMs >= FINAL_STATE_MS || loopMs >= step.end) {
    return "complete";
  }

  return loopMs >= step.start ? "active" : "pending";
}

export function getVisibleTestLines(loopMs: number) {
  if (loopMs < TEST_OUTPUT_START_MS) {
    return 0;
  }

  return Math.min(
    TEST_OUTPUT.length,
    Math.floor((loopMs - TEST_OUTPUT_START_MS) / TEST_OUTPUT_INTERVAL_MS) + 1
  );
}
