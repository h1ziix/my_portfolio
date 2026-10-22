"use client";

import { useEffect, useRef, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const storageKey = "toksoz-theme";
const nextPreference: Record<ThemePreference, ThemePreference> = {
  system: "light",
  light: "dark",
  dark: "system"
};

function parsePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

function applyPreference(preference: ThemePreference) {
  const theme = preference === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  // A fixed initial value keeps server markup and the first client render identical.
  const [preference, setPreference] = useState<ThemePreference>("system");
  const preferenceRef = useRef<ThemePreference>("system");

  useEffect(() => {
    let saved: ThemePreference = "system";
    try {
      saved = parsePreference(window.localStorage.getItem(storageKey));
    } catch {
      // The theme still works for this visit when browser storage is unavailable.
    }

    preferenceRef.current = saved;
    setPreference(saved);
    applyPreference(saved);

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (preferenceRef.current === "system") applyPreference("system");
    };
    const onStorageChange = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      const updated = parsePreference(event.newValue);
      preferenceRef.current = updated;
      setPreference(updated);
      applyPreference(updated);
    };

    systemTheme.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorageChange);
    return () => {
      systemTheme.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  function changeTheme() {
    const updated = nextPreference[preferenceRef.current];
    preferenceRef.current = updated;
    setPreference(updated);
    applyPreference(updated);
    try {
      window.localStorage.setItem(storageKey, updated);
    } catch {
      // Keep the selected theme active even when it cannot be persisted.
    }
  }

  return (
    <button
      type="button"
      onClick={changeTheme}
      aria-label={`Color theme: ${preference}. Switch to ${nextPreference[preference]} theme`}
      title={`Theme: ${preference}`}
      data-preference={preference}
      className="theme-toggle focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-ink bg-surface text-ink transition-colors hover:bg-bg"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {preference === "system" ? (
          <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>
        ) : preference === "light" ? (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>
        ) : (
          <path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z" />
        )}
      </svg>
    </button>
  );
}
