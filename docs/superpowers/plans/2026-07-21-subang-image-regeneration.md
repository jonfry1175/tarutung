# Subang Image Regeneration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 19 active Subang website image assets with more natural, reference-grounded generated photography.

**Architecture:** Use the approved per-file prompts and factual sources in `docs/subang-image-regeneration-guide.md`. Download temporary reference images outside the repository, generate one final bitmap per asset with the built-in image generation tool, copy it onto the existing stable asset path, then normalize dimensions and formats locally.

**Tech Stack:** Built-in image generation, ImageMagick, Next.js static assets.

## Global Constraints

- Preserve all 19 existing asset paths and file formats.
- Preserve the dimensions documented in `docs/subang-image-regeneration-guide.md`.
- Do not change UI code, content data, or the user's existing CSS modification.
- Use real-photo references only for factual grounding; do not reproduce watermarks, logos, or readable source text.
- Verify every output decodes successfully and passes repository quality gates.

---

### Task 1: Prepare reference inputs

**Files:**
- Read: `docs/subang-image-regeneration-guide.md`
- Create temporarily: `/tmp/subang-imagegen-references/*`

- [x] Download one local factual reference for each distinct subject.
- [x] Validate that every downloaded reference decodes as an image.
- [x] Record baseline dimensions and formats for all 19 target assets.

### Task 2: Generate destination and panorama assets

**Files:**
- Modify: `public/images/subang/ciater-waterfall.png`
- Modify: `public/images/subang/expanded/curug-cibareubeuy.webp`
- Modify: `public/images/subang/expanded/museum-subang.webp`
- Modify: `public/images/subang/hero-panorama.png`
- Modify: `public/images/subang/landing/ciater-hot-spring.webp`
- Modify: `public/images/subang/landing/family-coast-itinerary.webp`
- Modify: `public/images/subang/landing/subang-360-preview.webp`
- Modify: `public/images/subang/video-posters/ciater-tea-plantation.webp`
- Modify: `public/images/subang/video-posters/curug-cileat-waterfall.webp`
- Modify: `public/images/subang/video-posters/subang-hero-montage.webp`
- Modify: `public/images/subang/video-posters/subang-north-coast.webp`

- [x] Generate each asset with its approved prompt, current image, and factual reference.
- [x] Inspect each generated composition before installation.
- [x] Copy selected outputs onto the stable paths and restore documented format/dimensions.

### Task 3: Generate culinary and cultural assets

**Files:**
- Modify: `public/images/subang/landing/nasi-liwet.webp`
- Modify: `public/images/subang/landing/sate-maranggi.webp`
- Modify: `public/images/subang/landing/sop-kikil-subang.webp`
- Modify: `public/images/subang/landing/tahu-susu.webp`
- Modify: `public/images/subang/sisingaan.png`
- Modify: `public/images/subang/subang-culinary.png`
- Modify: `public/images/subang/video-posters/sisingaan-performance.webp`
- Modify: `public/images/subang/video-posters/subang-pineapple.webp`

- [x] Generate each asset with its approved prompt, current image, and factual reference.
- [x] Inspect cultural anatomy and food realism before installation.
- [x] Copy selected outputs onto the stable paths and restore documented format/dimensions.

### Task 4: Verify the complete replacement

**Files:**
- Verify: `public/images/subang/**/*.{png,webp}`

- [x] Confirm exactly 19 targets exist and decode successfully.
- [x] Confirm dimensions and formats match the baseline.
- [x] Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` serially through Crabbox.
- [x] Review `git diff --stat`, `git diff --check`, and repository status without altering unrelated changes.
