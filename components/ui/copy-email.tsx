"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy() {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timeout.current = setTimeout(() => setStatus("idle"), 1500);
  }
  return (
    <div className="copy-email-control">
      <button
        type="button"
        onClick={copy}
        className="copy-email focus-ring"
        aria-label={
          status === "copied" ? "Copied email address" : "Copy email address"
        }
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="8" y="8" width="12" height="13" rx="1" />
          <path d="M16 8V3H4v13h4" />
        </svg>
        <span className="meta">{status === "copied" ? "Copied" : "Copy"}</span>
      </button>
      <span className="copy-feedback meta" role="status" aria-live="polite">
        {status === "copied"
          ? "Copied"
          : status === "error"
            ? "Copy unavailable. Select the email to copy it."
            : ""}
      </span>
    </div>
  );
}
