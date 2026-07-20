# Repository Guidelines

## Project Structure & Module Organization

This repository is a `Next.js 16` App Router project for the Subang 360 tourism experience. Keep app entrypoints in `src/app/`, shared logic in `src/lib/`, and reusable UI in `src/components/`.

- `src/app/page.tsx`: cinematic landing page entrypoint
- `src/app/jelajahi/page.tsx`: interactive Subang 360 explorer entrypoint
- `src/lib/subang-data.ts`: active scenes, places, marker tracks, and content metadata
- `src/components/home/subang-landing-page.tsx`: landing section composition
- `src/components/home/subang-360-experience.tsx`: explorer state and interactions
- `src/components/scene/subang-360-scene.tsx`: interactive scene renderer
- `src/lib/supabase/`: authentication and saved-place persistence
- `src/components/ui/`: shadcn-style primitives
- `public/`: static assets
- `output/`: manual QA artifacts; do not treat as source code

The `tarutung-*` modules, Notion adapter, Leaflet map, and `/api/places` route are legacy starter code. Do not use them for new Subang features; remove or migrate them only in a separately scoped change.

## Design System

Read `DESIGN.md` before any UI, layout, media, motion, or responsive work. Treat it as the canonical visual contract for both the landing page and the `/jelajahi` explorer; update it whenever a reusable design token or rule changes.

## Build, Test, and Development Commands

- `pnpm dev`: start the app locally with webpack
- `pnpm lint`: run ESLint
- `pnpm typecheck`: generate Next route types, then run TypeScript checks
- `pnpm build`: production build
- `pnpm start`: serve the built app

Run `pnpm lint && pnpm typecheck && pnpm build` before opening a PR.

## Coding Style & Naming Conventions

Use TypeScript with strict types. Prefer server components by default; move browser-only logic into client components. Follow existing naming:

- components: `kebab-case.tsx`
- utility/data files: `kebab-case.ts`
- exported React components: `PascalCase`

Use the `@/*` alias, Tailwind utility classes, and shared helpers from `src/lib/utils.ts`. Keep Notion and env access on the server side unless a variable is explicitly `NEXT_PUBLIC_...`.

## Testing Guidelines

There is no dedicated unit test suite yet. The current quality gate is:

- lint passes
- typecheck passes
- production build passes

When changing map, scene, or UI behavior, include a manual verification note and screenshots if the visual output changed.

## Commit & Pull Request Guidelines

The existing history uses Conventional Commit style, e.g. `feat(ui): add Subang landing experience`. Continue with prefixes like `feat:`, `fix:`, and `docs:`.

PRs should include:

- a short description of the change
- impacted paths or features
- env or Notion schema changes, if any
- screenshots or short clips for UI updates

## Security & Configuration Tips

Keep secrets in `.env.local`; only commit `.env.example`. Supabase browser configuration uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Notion variables belong to the legacy adapter only.
