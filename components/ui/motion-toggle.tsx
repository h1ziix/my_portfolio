"use client";

import { useEffect, useRef, useState } from "react";
import {
  applyMotionPreference,
  isMotionReduced,
  motionStorageKey,
  parseMotionPreference,
  type MotionPreference,
} from "@/lib/motion-preference";

export function MotionToggle() {
  const [reduced, setReduced] = useState(true);
  const [preference, setPreference] = useState<MotionPreference>("system");
  const preferenceRef = useRef<MotionPreference>("system");

  useEffect(() => {
    const sync = (value: MotionPreference) => {
      preferenceRef.current = value;
      setPreference(value);
      applyMotionPreference(value);
      setReduced(isMotionReduced());
    };
    let saved: MotionPreference = "system";
    try {
      saved = parseMotionPreference(localStorage.getItem(motionStorageKey));
    } catch {
      // The setting remains usable when browser storage is unavailable.
    }
    sync(saved);

    const systemMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onSystemChange = () => {
      if (preferenceRef.current === "system") sync("system");
    };
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === motionStorageKey || event.key === null)
        sync(parseMotionPreference(event.newValue));
    };
    systemMotion.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorageChange);
    return () => {
      systemMotion.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  function toggleMotion() {
    const updated = isMotionReduced() ? "full" : "reduced";
    preferenceRef.current = updated;
    setPreference(updated);
    applyMotionPreference(updated);
    setReduced(isMotionReduced());
    try {
      localStorage.setItem(motionStorageKey, updated);
    } catch {
      // Keep the explicit choice for this visit even without persistent storage.
    }
  }

  const action = reduced ? "Enable animations" : "Pause animations";
  return (
    <button
      type="button"
      className="motion-toggle focus-ring"
      onClick={toggleMotion}
      aria-label={action}
      title={`${action}${preference === "system" ? " (following system setting)" : ""}`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        {reduced ? (
          <path d="m5 3 8 5-8 5z" />
        ) : (
          <path d="M4 3h3v10H4zm5 0h3v10H9z" />
        )}
      </svg>
    </button>
  );
}
