const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const { test } = require("node:test");

const index = readFileSync(new URL("../index.html", `file://${__filename}`), "utf8");
const theme = readFileSync(new URL("../transfer-theme.js", `file://${__filename}`), "utf8");

test("Tally Clicker no longer ships the retired private-sync launcher or runtime", () => {
  assert.doesNotMatch(index, /semantic-app-sync\.js/);
  assert.doesNotMatch(index, /tally-storage\.js/);
  assert.doesNotMatch(index, /SemanticAppSync/);
  assert.doesNotMatch(index, /tally-semantic-sync-remote-applied/);
  assert.doesNotMatch(index, /ryan-semantic-sync/);
  assert.doesNotMatch(theme, /ryan-semantic-sync/);
  assert.equal(existsSync(new URL("../semantic-app-sync.js", `file://${__filename}`)), false);
  assert.equal(existsSync(new URL("../tally-storage.js", `file://${__filename}`)), false);
});
