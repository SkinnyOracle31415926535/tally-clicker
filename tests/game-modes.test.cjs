const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");

const source = readFileSync(new URL("../index.html", `file://${__filename}`), "utf8");

test("Stopwatch supports both scoring directions and safely clears incompatible saved times", () => {
  assert.match(source, /bestDirectionByClass/);
  assert.match(source, /getStopwatchBestDirection\(savedClass\.id\) === "highest"/);
  assert.match(source, /isBetterStopwatchTime\(elapsed, previous, savedClass\.id\)/);
  assert.match(source, /openResetDialog\("stopwatch-direction"\)/);
  assert.match(source, /delete state\.stopwatch\.records\[classId\];/);
  assert.match(source, /function normalizeStopwatchBestDirections\(rawDirections\)/);
  assert.match(source, /id="stopwatchLowestTimeButton"/);
  assert.match(source, /id="stopwatchHighestTimeButton"/);
  assert.match(source, /stopwatchLowestTimeButton\.addEventListener\("click", \(\) => setStopwatchBestDirection\("lowest"\)\)/);
  assert.match(source, /stopwatchHighestTimeButton\.addEventListener\("click", \(\) => setStopwatchBestDirection\("highest"\)\)/);
  assert.doesNotMatch(source, /id="stopwatchBestDirection"/);
});

test("Least-outs mode ranks the fewest outs first, safely supports repeated undo, and has a read-only view", () => {
  assert.match(source, /data-mode="elimination">least outs/);
  assert.match(source, /left\.outs - right\.outs/);
  assert.match(source, /row\.addEventListener\("click", \(\) => recordEliminationOut\(entry\.name\)\)/);
  assert.match(source, /records\[key\] = previousOuts \+ 1/);
  assert.match(source, /everybody stays in/);
  assert.match(source, /leaders\.length \+ " tied for first/);
  assert.doesNotMatch(source, /id="eliminationRoster"[^>]*aria-live/);
  assert.match(source, /const ELIMINATION_HISTORY_LIMIT = 30;/);
  assert.match(source, /function rememberEliminationOut\(change\)/);
  assert.match(source, /history\.pop\(\);/);
  assert.match(source, /clearEliminationHistory\(\);\n      let hasSavedState = false;/);
  assert.match(source, /records\?\.\[previous\.key\] \|\| 0\) !== previous\.recordedOuts/);
  assert.match(source, /id="eliminationViewButton"/);
  assert.match(source, /id="eliminationViewTitle"/);
  assert.match(source, /id="exitEliminationView"/);
  assert.match(source, /document\.createElement\(isView \? "div" : "button"\)/);
  assert.match(source, /row\.setAttribute\("role", "listitem"\)/);
  assert.match(source, /if \(!isView\) row\.addEventListener\("click", \(\) => recordEliminationOut\(entry\.name\)\);/);
  assert.match(source, /body\.elimination-practice-view \.window/);
  assert.match(source, /button\.stopwatch-roster-row:hover/);
  assert.match(source, /tally-automatic-sync-before-apply/);
});
