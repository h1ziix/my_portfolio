import assert from "node:assert/strict";
import { test } from "node:test";
import {
  FINAL_STATE_MS,
  INTRO,
  LOOP_MS,
  TEST_OUTPUT,
  TEST_OUTPUT_INTERVAL_MS,
  TEST_OUTPUT_START_MS,
  WORKFLOW_TIMELINE,
  getLoopTime,
  getStepStatus,
  getTypedLength,
  getVisibleTestLines
} from "../lib/terminal-timeline";

test("each workflow step changes at its own start and end", () => {
  for (const step of WORKFLOW_TIMELINE) {
    assert.equal(getStepStatus(step.start - 1, step), "pending", step.label);
    assert.equal(getStepStatus(step.start, step), "active", step.label);
    assert.equal(getStepStatus(step.end - 1, step), "active", step.label);
    assert.equal(getStepStatus(step.end, step), "complete", step.label);
  }
});

test("tests and review cannot complete before their actual start", () => {
  assert.equal(getStepStatus(4430, WORKFLOW_TIMELINE[5]), "pending");
  assert.equal(getStepStatus(4860, WORKFLOW_TIMELINE[6]), "pending");
  assert.equal(getStepStatus(7600, WORKFLOW_TIMELINE[5]), "complete");
  assert.equal(getStepStatus(7600, WORKFLOW_TIMELINE[6]), "active");
  assert.equal(getStepStatus(8900, WORKFLOW_TIMELINE[6]), "complete");
  assert.equal(getStepStatus(8900, WORKFLOW_TIMELINE[7]), "active");
});

test("SYSTEM READY has no active or pending steps, including deploy", () => {
  for (const time of [FINAL_STATE_MS, FINAL_STATE_MS + 1, LOOP_MS - 1]) {
    assert.deepEqual(
      WORKFLOW_TIMELINE.map((step) => getStepStatus(time, step)),
      Array(WORKFLOW_TIMELINE.length).fill("complete")
    );
  }
});

test("the static baseline is complete and the animated loop restarts", () => {
  assert.equal(getLoopTime(false, 0), FINAL_STATE_MS);
  assert.equal(getLoopTime(false, LOOP_MS + 1), FINAL_STATE_MS);
  assert.equal(getTypedLength(getLoopTime(false, 0)), INTRO.length);
  assert.equal(getVisibleTestLines(getLoopTime(false, 0)), TEST_OUTPUT.length);
  assert.equal(getLoopTime(true, LOOP_MS), 0);
  assert.equal(getStepStatus(getLoopTime(true, LOOP_MS), WORKFLOW_TIMELINE[0]), "pending");
});

test("test output appears one line at a time within the test phase", () => {
  assert.equal(getVisibleTestLines(TEST_OUTPUT_START_MS - 1), 0);
  for (let index = 0; index < TEST_OUTPUT.length; index += 1) {
    const time = TEST_OUTPUT_START_MS + index * TEST_OUTPUT_INTERVAL_MS;
    assert.equal(getVisibleTestLines(time), index + 1);
  }
  assert.equal(getVisibleTestLines(FINAL_STATE_MS), TEST_OUTPUT.length);
});
