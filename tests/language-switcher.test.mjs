import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const landingSource = await readFile(
  new URL("../src/components/home/subang-landing-page.tsx", import.meta.url),
  "utf8",
);
const explorerSource = await readFile(
  new URL("../src/components/home/subang-360-experience.tsx", import.meta.url),
  "utf8",
);

test("language switcher is not rendered on the landing page or explorer", () => {
  assert.doesNotMatch(landingSource, /languageMenu|Pilih bahasa/);
  assert.doesNotMatch(explorerSource, /\bLanguages\b|Pilih bahasa/);
});
