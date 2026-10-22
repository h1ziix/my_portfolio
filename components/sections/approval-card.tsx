"use client";

import { useEffect, useRef, useState } from "react";
import { actionClasses } from "@/components/ui/action-link";

type Decision = "waiting" | "sending" | "sent" | "returned";

const STAGES = [
  "Planning",
  "Discovery",
  "Research",
  "Qualify",
  "Lead review",
  "Outreach",
  "Approval",
  "Execution"
] as const;
const SEND_MS = 1400;

/** Finished stages and the active one for each decision. */
const PROGRESS: Record<Decision, { done: number; current: number | null }> = {
  waiting: { done: 6, current: 6 },
  sending: { done: 7, current: 7 },
  sent: { done: 8, current: null },
  returned: { done: 5, current: 5 }
};

const COPY: Record<Decision, { state: string; status: string }> = {
  waiting: {
    state: "Waiting for your review",
    status: "Stage 7 of 8, approval. The agent stops here until a person decides."
  },
  sending: {
    state: "Approved, sending",
    status: "Stage 8 of 8, execution. It runs exactly what you approved."
  },
  sent: {
    state: "Sent",
    status: "All 8 stages done. This is a sample, so nothing left your browser."
  },
  returned: {
    state: "Sent back",
    status: "Back at stage 6, outreach. Nothing ran, and the agent has your decision."
  }
};

/** A working miniature of the Agentic Ops approval step. Server-rendered in its waiting state. */
export function ApprovalCard({ demoHref }: { demoHref?: string }) {
  const [decision, setDecision] = useState<Decision>("waiting");
  const cardRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const wasDecided = useRef(false);

  useEffect(() => {
    if (decision !== "sending") return;
    const timer = window.setTimeout(() => setDecision("sent"), SEND_MS);
    return () => window.clearTimeout(timer);
  }, [decision]);

  // The pressed button is replaced, so hand keyboard focus to its successor unless the reader has moved on.
  useEffect(() => {
    const active = document.activeElement;
    const focusIsOurs = active === document.body || cardRef.current?.contains(active);
    const decided = decision === "sent" || decision === "returned";

    if (decided) {
      wasDecided.current = true;
      if (focusIsOurs) resetRef.current?.focus({ preventScroll: true });
    } else if (decision === "waiting" && wasDecided.current) {
      wasDecided.current = false;
      if (focusIsOurs) approveRef.current?.focus({ preventScroll: true });
    }
  }, [decision]);

  const { done, current } = PROGRESS[decision];
  const decided = decision === "sent" || decision === "returned";
  const sending = decision === "sending";

  return (
    <div
      ref={cardRef}
      className="approval"
      data-state={decision}
      role="group"
      aria-label="Live sample from Agentic Ops: an agent action waiting for approval"
    >
      <div className="approval-head">
        <p className="approval-state">{COPY[decision].state}</p>
        <p>Sample from Agentic Ops</p>
      </div>

      <div className="approval-body">
        <p className="approval-title">Send 2 outreach emails</p>
        <dl className="approval-facts">
          <div>
            <dt>Proposed by</dt>
            <dd>Outreach agent</dd>
          </div>
          <div>
            <dt>Goal</dt>
            <dd>Support automation leads in Kazakhstan</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>3 companies researched, sources cited</dd>
          </div>
        </dl>

        <ol className="approval-stages" aria-label="Workflow stages">
          {STAGES.map((stage, index) => {
            const status = index < done ? "done" : index === current ? "current" : "pending";
            return (
              <li key={stage} className="approval-stage" data-status={status}>
                <span className="approval-stage-name">
                  {stage}
                  <span className="sr-only">, {status}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="approval-status" role="status">
          {COPY[decision].status}
        </p>

        <div className="approval-actions">
          {decided ? (
            <button
              ref={resetRef}
              type="button"
              className={`${actionClasses("secondary")} max-sm:px-4`}
              onClick={() => setDecision("waiting")}
            >
              Reset the sample
            </button>
          ) : (
            <>
              <button
                ref={approveRef}
                type="button"
                className={`${actionClasses("primary")} max-sm:px-4`}
                aria-disabled={sending}
                onClick={() => {
                  if (!sending) setDecision("sending");
                }}
              >
                {sending ? "Sending…" : "Approve and send"}
              </button>
              <button
                type="button"
                className={`${actionClasses("secondary")} max-sm:px-4`}
                aria-disabled={sending}
                onClick={() => {
                  if (!sending) setDecision("returned");
                }}
              >
                Send back
              </button>
            </>
          )}
        </div>
      </div>

      <div className="approval-foot">
        <p>Fictional records. No AI calls, emails or CRM writes.</p>
        {demoHref ? (
          <a
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link focus-ring inline-flex min-h-11 shrink-0 items-center font-medium"
          >
            Open the full demo
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
