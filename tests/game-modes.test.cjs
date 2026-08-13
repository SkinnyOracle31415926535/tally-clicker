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
});

test("Least-outs mode ranks the fewest outs first and keeps every student selectable", () => {
  assert.match(source, /data-mode="elimination">least outs/);
  assert.match(source, /left\.outs - right\.outs/);
  assert.match(source, /row\.addEventListener\("click", \(\) => recordEliminationOut\(entry\.name\)\)/);
  assert.match(source, /records\[key\] = previousOuts \+ 1/);
  assert.match(source, /everybody stays in/);
  assert.match(source, /leaders\.length \+ " tied for first/);
  assert.doesNotMatch(source, /id="eliminationRoster"[^>]*aria-live/);
  assert.match(source, /eliminationLastOut = null;\n      let hasSavedState = false;/);
  assert.match(source, /records\[previous\.key\] \|\| 0\) !== previous\.recordedOuts/);
});
