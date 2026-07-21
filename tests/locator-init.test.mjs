import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const locatorSource = await readFile("src/components/locator-init.tsx", "utf8").catch(() => "");
const layoutSource = await readFile("src/app/layout.tsx", "utf8");
const nextConfigSource = await readFile("next.config.ts", "utf8");

test("Locator runs only in development and is mounted by the root layout", () => {
  assert.match(locatorSource, /^"use client";/);
  assert.match(
    locatorSource,
    /process\.env\.NODE_ENV === "development"[\s\S]*?import\("@locator\/runtime"\)/,
  );
  assert.match(layoutSource, /import \{ LocatorInit \} from "@\/components\/locator-init";/);
  assert.match(layoutSource, /<LocatorInit \/>/);
});

test("Locator source metadata loader runs for every development bundle", () => {
  assert.match(nextConfigSource, /webpack: \(config, \{ dev \}\) =>/);
  assert.match(nextConfigSource, /if \(dev\)/);
  assert.doesNotMatch(nextConfigSource, /!isServer/);
  assert.match(nextConfigSource, /loader: "@locator\/webpack-loader"/);
  assert.match(nextConfigSource, /options: \{ env: "development" \}/);
});
