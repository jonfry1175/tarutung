import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const landingSource = await readFile("src/components/home/subang-landing-page.tsx", "utf8");
const culinarySource = await readFile("src/components/home/subang-culinary-section.tsx", "utf8");
const landingStyles = await readFile("src/components/home/subang-landing-page.module.css", "utf8");

test("landing intro uses editorial index and a single primary CTA", () => {
  assert.match(landingSource, /introIndex/);
  assert.match(landingSource, /data-index-number/);
  assert.doesNotMatch(landingSource, /pillarGrid/);
  assert.match(landingStyles, /grid-template-columns: 42% 58%/);
  assert.match(landingSource, /sizes="\(max-width: 800px\) 100vw, 58vw"/);
  assert.match(landingStyles, /\.indexNumber[\s\S]*color: var\(--gold-light\)/);
});

test("explorer preview is a full-bleed climax with compact interaction cues", () => {
  assert.match(landingSource, /explorerPanorama/);
  assert.match(landingSource, /Geser panorama/);
  assert.match(landingSource, /Pilih destinasi/);
  assert.match(landingStyles, /explorerStoryPanel/);
  assert.match(landingSource, /explorerHints/);
});

test("culinary section renders a featured story and filmstrip", () => {
  assert.match(culinarySource, /culinaryFilmstrip/);
  assert.match(culinarySource, /Lihat semua kuliner/);
  assert.doesNotMatch(culinarySource, /culinaryGridContainer/);
  assert.match(culinarySource, /role="group"/);
  assert.match(culinarySource, /aria-pressed/);
  assert.doesNotMatch(culinarySource, /role="tablist"|role="tab"|aria-selected/);
  assert.match(landingStyles, /\.culinaryFilmstrip \.culinaryCard\s*\{[\s\S]*padding:\s*0/);
});

test("itinerary uses numbered route chapters and mobile touch targets", () => {
  assert.match(landingSource, /journeyRoute/);
  assert.match(landingSource, /journeyTrack/);
  assert.match(landingStyles, /justify-content: space-between/);
  assert.match(landingStyles, /journeyTrack span:nth-child\(1\)[\s\S]*left: 0%/);
  assert.match(landingStyles, /journeyTrack span:nth-child\(2\)[\s\S]*left: 50%/);
  assert.match(landingStyles, /journeyTrack span:nth-child\(3\)[\s\S]*left: 100%/);
  assert.match(landingStyles, /transform: translateX\(-50%\)/);
  assert.match(landingSource, /routeMarker/);
  assert.match(landingSource, /map\(\(item, index\)/);
  assert.match(landingStyles, /\.journeyRoute \.itineraryCard:not\(:last-child\)::after/);
  assert.match(landingStyles, /min-height: 44px/);
  assert.match(landingStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*explorerPanorama/);
});
