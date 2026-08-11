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
