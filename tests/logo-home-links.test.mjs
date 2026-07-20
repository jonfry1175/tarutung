import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sources = {
  landing: await readFile("src/components/home/subang-landing-page.tsx", "utf8"),
  explorer: await readFile("src/components/home/subang-360-experience.tsx", "utf8"),
  notFound: await readFile("src/components/ui/not-found-scene.tsx", "utf8"),
  loading: await readFile("src/components/ui/loading-screen.tsx", "utf8"),
};

test("every Subang 360 logo links to the homepage", () => {
  assert.match(
    sources.landing,
    /function Brand\(\)[\s\S]*?<Link[^>]+href="\/"[^>]+aria-label="Kembali ke Beranda"/,
  );
  assert.match(
    sources.explorer,
    /function LogoMark[\s\S]*?<Link[^>]+href="\/"[^>]+aria-label="Kembali ke Beranda"/,
  );
  assert.match(
    sources.notFound,
    /function Brand\(\)[\s\S]*?<Link[^>]+href="\/"[^>]+aria-label="Kembali ke Beranda"/,
  );
  assert.match(
    sources.loading,
    /<Link[^>]+className=\{styles\.brandBadge\}[^>]+href="\/"[^>]+aria-label="Kembali ke Beranda"/,
  );
  assert.match(
    sources.loading,
    /<Link[^>]+className=\{styles\.heroBrand\}[^>]+href="\/"[^>]+aria-label="Kembali ke Beranda"/,
  );
});
