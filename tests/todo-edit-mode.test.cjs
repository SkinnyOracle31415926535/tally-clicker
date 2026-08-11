const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");

const source = readFileSync(new URL("../index.html", `file://${__filename}`), "utf8");

test("Todo edit mode opens the existing skill editor", () => {
  assert.match(source, /function appendSkillEditRow\(/);
  assert.match(source, /editButton\.textContent = "edit"/);
  assert.match(source, /editButton\.addEventListener\("click", \(\) => openSkillEditDialog\(skill\.id\)\)/);
  assert.match(source, /actions\.append\(editButton, visibilityButton, orderActions\)/);
});

test("hidden Todo skills remain visible but clearly marked in edit mode", () => {
  assert.match(source, /row\.classList\.toggle\("is-hidden", skill\.hidden\)/);
  assert.match(source, /\.list-table \.is-hidden td:not\(\.skill-edit-actions\) \{\s+text-decoration-line: line-through;/);
  assert.match(source, /skill\.hidden = !skill\.hidden;\s+saveState\(\);\s+renderList\(\);/);
});
