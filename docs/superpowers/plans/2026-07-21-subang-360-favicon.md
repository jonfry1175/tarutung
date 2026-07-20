# Subang 360 Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic triangle favicon with the existing gold Subang 360 Landmark mark on a transparent background.

**Architecture:** Generate a 256x256 vector master that reproduces Lucide's existing Landmark paths, then render it into a multi-resolution ICO at the existing Next.js App Router favicon path. Keep all application code and metadata unchanged.

**Tech Stack:** SVG, ImageMagick 6, Next.js 16 App Router

## Global Constraints

- Use the existing Landmark glyph without the `SUBANG 360` wordmark.
- Use gold `#e2c88f` on a transparent background.
- Modify only `src/app/favicon.ico`; temporary generation assets must not remain in the repository.
- Preserve the existing 16x16, 32x32, 48x48, and 256x256 favicon sizes.

---

### Task 1: Replace and verify the favicon asset

**Files:**
- Modify: `src/app/favicon.ico`
- Temporary generation input: `/tmp/subang-360-favicon.svg`

**Interfaces:**
- Consumes: Lucide Landmark SVG path data already used by `src/components/home/subang-landing-page.tsx`
- Produces: a multi-resolution ICO discovered automatically by Next.js at `src/app/favicon.ico`

- [x] **Step 1: Run the brand-color validation against the current favicon**

Run:

```bash
convert 'src/app/favicon.ico[3]' -format '%c' histogram:info:- | grep -Ei '#061B16|#E2C88F'
```

Expected: FAIL with no matching output because the current favicon is the generic black-and-white triangle.

- [x] **Step 2: Create the temporary vector master**

Create `/tmp/subang-360-favicon.svg` with a `256x256` dark green square, a centered Landmark glyph using the exact Lucide path geometry, gold stroke `#e2c88f`, rounded line caps and joins, and enough inset spacing for small sizes.

- [x] **Step 3: Render the multi-resolution ICO**

Run:

```bash
convert -background none /tmp/subang-360-favicon.svg -define icon:auto-resize=256,48,32,16 src/app/favicon.ico
```

Expected: `src/app/favicon.ico` is replaced with four embedded icon sizes.

- [x] **Step 4: Verify dimensions and brand colors**

Run:

```bash
identify src/app/favicon.ico
convert 'src/app/favicon.ico[3]' -format '%c' histogram:info:- | grep -Ei '#061B16|#E2C88F'
```

Expected: `identify` reports `16x16`, `32x32`, `48x48`, and `256x256`; the histogram contains the approved dark green and gold colors.

- [x] **Step 5: Visually inspect the rendered favicon**

Render the 256x256 frame to `/tmp/subang-360-favicon-preview.png` and inspect it. Expected: a centered, unclipped gold Landmark glyph on a dark green square with clear geometry at browser-tab scale.

- [x] **Step 6: Run the repository quality gate remotely**

Run serially on the configured Crabbox runner:

```bash
crabbox run --id ticketing-vps --reclaim --shell 'corepack pnpm install --frozen-lockfile && pnpm lint && pnpm typecheck && pnpm build'
```

Expected: dependency installation, lint, typecheck, and production build all pass.

- [x] **Step 7: Review the final diff**

Run:

```bash
git status --short
git diff --stat -- src/app/favicon.ico
```

Expected: the favicon is the only implementation file modified by this task; unrelated pre-existing worktree changes remain untouched.
