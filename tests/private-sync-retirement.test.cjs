const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const { test } = require("node:test");

const index = readFileSync(new URL("../index.html", `file://${__filename}`), "utf8");
const runtime = readFileSync(new URL("../automatic-app-sync.js", `file://${__filename}`), "utf8");
const storage = readFileSync(new URL("../tally-automatic-storage.js", `file://${__filename}`), "utf8");

test("Tally Clicker uses automatic sync without a transfer or private-sync control", () => {
  assert.match(index, /automatic-app-sync\.js/);
  assert.match(index, /tally-automatic-storage\.js/);
  assert.match(index, /AutomaticAppSync\.install/);
  assert.doesNotMatch(index, /semantic-app-sync\.js|tally-storage\.js|SemanticAppSync|tally-semantic-sync-remote-applied|ryan-semantic-sync|temporary-data-transfer\.js|transfer-theme\.js/);
  assert.doesNotMatch(runtime, /createElement|showModal|<dialog|ryan-semantic-sync|private sync/i);
  assert.match(storage, /makeAdapters|attachHandles|tally-automatic-sync-applied/);
  assert.equal(existsSync(new URL("../semantic-app-sync.js", `file://${__filename}`)), false);
  assert.equal(existsSync(new URL("../tally-storage.js", `file://${__filename}`)), false);
  assert.equal(existsSync(new URL("../transfer-theme.js", `file://${__filename}`)), false);
});
