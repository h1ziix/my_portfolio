export type MotionPreference = "system" | "full" | "reduced";

export const motionStorageKey = "toksoz-motion";
const motionEvent = "toksoz-motion-change";

export function parseMotionPreference(value: string | null): MotionPreference {
  return value === "full" || value === "reduced" ? value : "system";
}

export function isMotionReduced() {
  const preference = document.documentElement.dataset.motionPreference;
  if (preference === "full") return false;
  if (preference === "reduced") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function applyMotionPreference(preference: MotionPreference) {
  const root = document.documentElement;
  root.dataset.motionPreference = preference;
  root.dataset.motion = isMotionReduced() ? "reduced" : "full";
  window.dispatchEvent(new Event(motionEvent));
}

/** CSS and canvas effects share the same explicit choice, including live changes. */
export function subscribeToMotionPreference(callback: () => void) {
  window.addEventListener(motionEvent, callback);
  return () => window.removeEventListener(motionEvent, callback);
}
