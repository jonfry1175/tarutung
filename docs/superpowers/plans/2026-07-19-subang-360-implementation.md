# Subang 360 Implementation Plan

> **Status: Completed and superseded.** This plan records the first migration from the legacy city starter. The current product now uses a cinematic landing page at `/`, a video-based explorer at `/jelajahi`, Supabase authentication, saved places, and deep links. Use `README.md`, `DESIGN.md`, and the current source code for new work.

> **Historical execution note:** This plan was originally executed inline with all quality gates verified before publication. Do not execute it again.

**Historical Goal:** Replace the legacy starter landing page with a responsive, full-screen Subang 360 explorer that closely reproduces the approved visual concept.

**Architecture:** Use a single client-side experience component for the immersive scene, navigation, hotspot interactions, favorites, and detail drawer. Keep destination content in a typed local data module, render a generated Subang panorama as a Three.js texture, and use generated editorial imagery for destination details.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Three.js, Lucide React.

---

### Task 1: Create Subang visual assets and content model

**Files:**
- Create: `public/images/subang/*`
- Create: `src/lib/subang-data.ts`

Generate a wide highlands-to-coast panorama plus destination, culinary, and cultural images. Add typed categories, hotspots, descriptions, tags, and coordinates.

### Task 2: Build the immersive Subang 360 experience

**Files:**
- Create: `src/components/scene/subang-360-scene.tsx`
- Create: `src/components/home/subang-360-experience.tsx`
- Modify: `src/app/page.tsx`

Render the full-bleed Three.js panorama, overlay accurate desktop controls and markers, and implement category filters, destination details, favorites, audio ambience, and reset/zoom controls.

### Task 3: Match the approved responsive composition

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

Match the dark sidebar, restrained gold accent, typography, spacing, marker colors, translucent controls, desktop detail drawer, and mobile bottom sheet shown in the approved concept.

### Task 4: Verify and publish

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Start the local server and use Playwright screenshots plus canvas pixel checks at desktop and mobile sizes. Commit only relevant files and push the verified result directly to `main`.
