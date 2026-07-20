# Subang 360 Favicon Design

## Goal

Replace the generic triangle favicon with a favicon that matches the existing Subang 360 brand.

## Design

- Reuse the Landmark glyph already displayed in the site header.
- Render the glyph in the existing gold brand color on a transparent background.
- Use the glyph alone, without the `SUBANG 360` wordmark, to preserve clarity at small favicon sizes.
- Keep the mark centered with enough surrounding space to avoid clipping.

## Integration

Replace `src/app/favicon.ico` using Next.js App Router's existing favicon file convention. No metadata, component, or runtime behavior changes are required.

## Verification

- Confirm the ICO contains common favicon sizes, including 16x16 and 32x32.
- Confirm Next.js recognizes the favicon during a production build.
- Visually inspect the generated icon at its largest embedded size and at browser-tab scale.

## Scope

This change affects only the favicon asset. It does not alter the visible header logo, page metadata, or other branding assets.
