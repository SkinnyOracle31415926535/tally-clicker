const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");

const source = readFileSync(new URL("../transfer-theme.js", `file://${__filename}`), "utf8");

test("Tally Clicker utility theme retains native sync styling", () => {
  assert.match(source, /styleMarkers/);
  assert.match(source, /style\.remove\(\)/);
  assert.doesNotMatch(source, /Tahoma/);
  assert.match(source, /ryan-semantic-sync/);
  assert.match(source, /counter-dialog/);
});
