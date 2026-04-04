# Repository Guidelines

## Project Structure & Module Organization

This repository is a `Next.js 16` App Router project for the Tarutung city site starter. Keep app entrypoints in `src/app/`, shared logic in `src/lib/`, and reusable UI in `src/components/`.

- `src/app/page.tsx`: landing page and section composition
- `src/app/api/places/route.ts`: JSON endpoint for place data
- `src/lib/notion.ts`: server-side Notion adapter
- `src/lib/tarutung-data.ts`: local fallback data and content metadata
- `src/components/map/` and `src/components/scene/`: Leaflet and Three.js integrations
- `src/components/ui/`: shadcn-style primitives
- `public/`: static assets
- `output/`: manual QA artifacts; do not treat as source code

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

The existing history uses Conventional Commit style, e.g. `feat: add interactive showcase for Tarutung...`. Continue with prefixes like `feat:`, `fix:`, and `docs:`.

PRs should include:

- a short description of the change
- impacted paths or features
- env or Notion schema changes, if any
- screenshots or short clips for UI updates

## Security & Configuration Tips

Keep secrets in `.env.local`; only commit `.env.example`. For Notion, prefer `NOTION_DATA_SOURCE_ID`; `NOTION_DATABASE_ID` is supported as a fallback alias.
