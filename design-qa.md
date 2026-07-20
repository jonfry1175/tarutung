# Design QA - Landing Page Subang 360

## Visual Truth

- Reference: `/run/user/1000/codex-desktop/tmp/codex-clipboard-8e7e3911-ccdf-46a8-8157-8d1fb1edd6fb.png`
- Desktop implementation: `output/playwright/subang-landing-desktop-final.png`
- Mobile implementation: `output/playwright/subang-landing-mobile-final.png`
- Full comparison: `output/playwright/subang-landing-comparison-final.png`
- Focused hero comparison: `output/playwright/subang-landing-hero-comparison-final.png`

## Coverage

- Desktop viewport: 1440 x 1100, full-page capture at 5987 px.
- Mobile viewport: 390 x 844, single-column layout with no horizontal overflow.
- All 14 landing images loaded successfully after scrolling through the page.
- Hero video renders for normal motion preferences.
- Reduced-motion mode removes the video and retains the Ciater poster background.
- Mobile navigation, section anchors, primary CTA, `/jelajahi`, Curug Cileat deep link, and browser back navigation were checked.
- Browser console result: 0 errors and 0 warnings.

## Comparison History

1. Pass 1 - P2: the culture heading was constrained and visually clipped. Fixed by rebalancing the culture grid, reducing panel padding, and tightening the section heading size.
2. Pass 2 - P2: the desktop hero heading wrapped to three lines instead of the reference's two lines. Fixed by widening its text measure and adjusting the maximum display size.
3. Final pass: no unresolved P0, P1, or P2 issues.

## Accepted Differences

- P3: the authentic Ciater hero video has cooler, cloudier weather than the golden-hour reference image. This preserves the selected real Subang footage.
- P3: the reference's secondary film CTA is intentionally omitted; the approved scope requires one primary hero CTA only.

## Quality Gates

- `pnpm lint`: passed on Crabbox with no warnings.
- `pnpm typecheck`: passed on Crabbox.
- `pnpm build`: passed on Crabbox using non-secret Supabase build placeholders; no local env file was synced.

final result: passed
