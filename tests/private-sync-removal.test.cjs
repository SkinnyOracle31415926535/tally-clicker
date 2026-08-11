const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");

const source = readFileSync(new URL("../index.html", `file://${__filename}`), "utf8");

test("Tally Clicker starts without private sync", () => {
  assert.doesNotMatch(source, /<script src="semantic-app-sync\.js"><\/script>/);
  assert.doesNotMatch(source, /<script src="tally-storage\.js"><\/script>/);
  assert.doesNotMatch(source, /window\.SemanticAppSync\.install\(/);
  assert.doesNotMatch(source, /tally-semantic-sync-remote-applied/);
});
