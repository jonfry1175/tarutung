# Subang 360 Design System

This document is the canonical visual contract for Subang 360. Read it before creating or changing any page, component, image treatment, animation, or responsive behavior.

`AGENTS.md` defines how to build the project. `DESIGN.md` defines how the product must look, feel, and behave visually. Existing production UI is the implementation reference; this document prevents future work from drifting into a generic tourism template.

## 1. Visual Theme and Atmosphere

Subang 360 is cinematic Indonesian destination storytelling with a quiet luxury character. It should feel rooted in real Subang: cool highlands, dense tropical vegetation, warm local hospitality, food, living traditions, and the north-coast landscape.

The visual language combines:

- Cinematic, full-bleed photography and video.
- Deep forest-green surfaces instead of generic black or blue.
- Restrained antique-gold accents for hierarchy and action.
- Elegant serif display typography paired with precise sans-serif UI text.
- Editorial landing-page composition and a functional immersive explorer.
- Minimal interface decoration; visual richness comes from authentic media.

The experience has two related modes:

1. **Landing page (`/`)**: editorial, spacious, emotional, and narrative.
2. **Explorer (`/jelajahi`)**: immersive, compact, operational, and interaction-first.

Both modes must look like one product. The landing page invites exploration; the explorer delivers it.

### Key Characteristics

- Dark forest canvas with ivory text and warm gold accents.
- Full-viewport or wide media is the first visual signal.
- Headings are elegant and high-contrast, never loud or gimmicky.
- Cards are image-led, sharp, and minimally framed.
- Controls float over media using translucent dark surfaces and thin borders.
- Indonesian content is concise, warm, and specific to Subang.
- No decorative gradients, blobs, glass ornaments, or generic travel illustrations.

## 2. Color Palette and Roles

### Core Brand Colors

| Token | Value | Role |
| --- | --- | --- |
| Forest | `#061B16` | Primary landing-page canvas |
| Forest Deep | `#061713` | Footer and deepest surface |
| Forest Editorial | `#071E18` | Narrative sections |
| Forest Soft | `#0B2820` | Elevated dark surfaces and hover states |
| Forest Light | `#18382D` | Active or interactive dark state |
| Explorer Ink | `#0C1514` | Explorer shell and near-black UI |
| Gold | `#C7A25B` | Eyebrows, icons, borders, restrained emphasis |
| Gold Explorer | `#D2AE66` | Explorer brand and progress accent |
| Gold Light | `#E2C88F` | Primary CTA fill and high-priority accent text |
| Paper | `#F4EFE3` | Primary text on dark surfaces |
| Paper Bright | `#FFFAF0` | Hero display text |
| Muted | `#B9C3BC` | Supporting copy and metadata |

### Category Colors

Category colors are functional, not decorative. Use them only for markers, category icons, and compact category states.

| Category | Value | Meaning |
| --- | --- | --- |
| Wisata | `#16855B` | Nature and destinations |
| Kuliner | `#D55B2A` | Food and culinary places |
| Budaya | `#9B3F65` | Culture and traditions |

### Overlay and Border Rules

- Hero media overlay: approximately `rgba(3, 12, 10, 0.42)`.
- Explorer floating surface: approximately `rgba(8, 16, 15, 0.78-0.92)`.
- Gold border: use gold at `24-66%` opacity depending on hierarchy.
- White border over media: use white at `20-76%` opacity.
- Body copy over media: use white at `75-86%` opacity.
- Do not add new chromatic accents without updating this document.
- Do not use gradients as decorative UI fills. Natural light transitions inside photography are encouraged.

## 3. Typography Rules

### Font Families

- **Display and editorial headings**: `Cormorant Garamond`, with `Georgia, serif` fallback.
- **Body, navigation, labels, and controls**: `Manrope`, with `Segoe UI, sans-serif` fallback.
- Use the `next/font` variables `--font-subang-display` and `--font-subang-body`.
- Do not introduce a third display family.

### Hierarchy

| Role | Desktop | Mobile | Weight | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| Hero display | `62-96px` | `48-72px` | 500 | `0.84-0.90` | Maximum two to three intentional lines |
| Section display | `42-72px` | `38-54px` | 500 | `0.98` | Editorial serif |
| Explorer title | `42-66px` | `32-38px` | 400-500 | `0.95` | Centered over media |
| Card title | `21-27px` | `18-27px` | 500 | `1.1-1.2` | Serif, mixed case |
| Body large | `15-19px` | `14px` | 400 | `1.65-1.70` | Hero and key introductions |
| Body | `13-14px` | `12-14px` | 400 | `1.65-1.80` | Keep line length under 65 characters where practical |
| Navigation | `14px` | `13px` | 500 | `1.2` | Sans-serif |
| Eyebrow | `11px` | `11px` | 700 | `1.2` | Uppercase, gold, `0.12em` tracking |
| Micro UI | `9-12px` | `9-11px` | 500-700 | `1.2-1.4` | Chapters, metadata, progress |

### Typography Principles

- Use serif typography to create place, memory, and editorial value.
- Use sans-serif typography for clarity in navigation and interactive UI.
- Keep normal letter spacing for headings and body text. Tracking is reserved for uppercase eyebrows and micro labels.
- Use sentence case for headings; do not turn the brand voice into all-caps luxury advertising.
- Avoid bold body text. Hierarchy should come from scale, family, spacing, and color.
- Do not scale font size directly with viewport width; use bounded `clamp()` values.

## 4. Component Styling

### Brand and Navigation

- The brand mark combines a thin-line landmark icon with `SUBANG` and `360`.
- Landing navigation is transparent over hero media with one subtle gold divider.
- Desktop navigation is centered and sparse: Wisata, Kuliner, Budaya, Rencana.
- Mobile navigation uses a 44px icon button and a compact dark menu.
- Explorer desktop navigation uses a fixed left rail. Mobile uses top actions plus bottom category and chapter docks.

### Primary CTA

- Fill: Gold Light `#E2C88F`.
- Text: dark forest `#17261F`.
- Border: 1px Gold `#C7A25B`.
- Minimum height: 52px on landing pages, 44px elsewhere.
- Horizontal padding: 23-24px.
- Radius: 3-4px, never a large pill.
- Pair command text with a Lucide arrow icon.
- Hover/focus: Forest Light background, Paper text, optional 2px upward movement.
- Use one primary CTA per decision area.

### Text Links

- Gold Light text with a short gold underline.
- Use a small chevron or arrow.
- On hover/focus, move only the icon by approximately 3px.

### Content Cards

- Cards are unframed content units, not floating containers.
- Image aspect ratios: `4:3` for destinations and food, `3:2` for itineraries.
- Radius: 3-4px.
- No card shadow on standard grids.
- Title follows the image; supporting copy remains muted and compact.
- Never nest cards inside cards.

### Explorer Markers

- Marker color comes from the category token.
- Desktop marker: circular icon, optional label, thin white stem, and precise anchor point.
- Mobile marker: 40px icon-only target; hide labels to preserve the scene.
- Marker position must be derived from the scene track and playback time, not guessed with static CSS.
- If the camera or scene composition changes, update marker tracks as part of the same change.
- Opening place detail pauses the scene so the marker and content relationship remains stable.

### Explorer Controls

- Use familiar Lucide symbols with accessible labels and tooltips where needed.
- Controls use translucent Explorer Ink, a thin warm border, and 4-8px radius.
- Icon controls are 40-48px square with stable dimensions.
- Chapters are compact segmented controls. Active state uses a lighter forest surface and gold micro label.
- Do not use text buttons when a familiar icon communicates the command.

### Detail Panels and Modals

- Desktop place detail is a light-paper panel over the dark scene.
- Mobile place detail is a bottom sheet with an 8px radius and a visible handle.
- Authentication may use a paper-like elevated modal, but it must retain forest and gold brand cues.
- Do not place a modal inside another framed card.

## 5. Layout Principles

### Grid and Container

- Landing maximum content width: `1420-1460px`.
- Desktop page gutters: at least 36px, increasing naturally on wide screens.
- Mobile gutters: 20-24px; hero/header may use 16-20px.
- Full-bleed media sections may break out of the content grid.
- Standard content grids collapse `3 -> 1` columns; culinary grids collapse `5 -> 3 -> 2`.
- Use stable aspect ratios for all media slots to prevent layout shift.

### Spacing Scale

Use an 8px-centered scale:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 104`

- Landing section padding: `78-104px` vertical.
- Mobile section padding: `60-80px` vertical.
- Card grid gap: `14-24px`, with larger row gaps on mobile.
- Heading-to-content spacing: `15-24px`.
- Major section heading-to-grid spacing: `32-44px`.

### Page Composition

- Treat page sections as full-width narrative bands, not floating cards.
- Alternate editorial split sections, media grids, and immersive full-width moments.
- Maintain a clear visual rhythm: reveal, explain, compare, immerse, then act.
- Keep the explorer itself full-bleed and unframed.

## 6. Depth and Elevation

- Depth comes primarily from photography, overlays, and surface contrast.
- Avoid decorative drop shadows on ordinary cards and buttons.
- The explorer preview may use a stronger shadow (`0 28px 70px rgba(0,0,0,0.4)`) because it represents an elevated interactive product surface.
- Floating explorer controls may use subtle shadow or backdrop blur for legibility.
- Use thin borders before adding shadows.
- Avoid glow, neon, bokeh, or ornamental blur.

## 7. Media and Motion

### Photography and Video

- Prefer real Subang imagery. AI-generated imagery is acceptable only for missing content and must remain geographically and culturally plausible.
- Show the actual place, dish, tradition, or experience; avoid generic stock atmosphere.
- Preserve architecture, vegetation, traditional costumes, faces, and cultural objects.
- Do not invent fantasy resorts, foreign landscapes, or implausible luxury facilities.
- Heroes use wide `16:9` or full-viewport media with clear focal points.
- Apply a restrained dark overlay for text contrast; do not destroy scene detail.

### Explorer Video Stability

- Camera movement must remain locked or extremely subtle when location markers overlay the video.
- Prefer natural motion: mist, clouds, foliage, water, light, and subtle human movement.
- Avoid orbit, shake, aggressive zoom, reframing, or major parallax.
- Marker alignment is a functional requirement, not a decorative preference.

### Motion Rules

- Control feedback: `160-180ms ease`.
- Image hover: up to `700ms` with maximum scale `1.035`.
- Detail sheets may enter with a short opacity and 24px vertical transition.
- Motion must explain state or preserve atmosphere; do not add decorative continuous animation.
- Respect `prefers-reduced-motion`: remove autoplay motion, preserve poster imagery, and reduce transitions to near zero.

## 8. Responsive Behavior

### Breakpoints

| Range | Required behavior |
| --- | --- |
| `>1000px` | Full landing navigation, wide editorial layouts, 3-5 column grids |
| `860-1000px` | Reduced gutters, simplified grids, full explorer sidebar remains where space allows |
| `761-859px` | Landing may retain intermediate grids; explorer switches to mobile controls |
| `421-760px` | Single-column narrative layout, mobile menu, stacked CTA and content |
| `<=420px` | Tightest type bounds, single-column footer, compact explorer labels |

### Mobile Requirements

- No horizontal page scroll.
- Minimum interactive target: 44x44px.
- Hero remains immersive at approximately `92svh` with a safe minimum height.
- Split editorial sections become one column; media should appear before text when it improves comprehension.
- Explorer chapter and category docks must stay above safe-area insets.
- Hide lower-priority marker labels or markers when density would obscure the scene.
- Detail content must fit within the viewport without covering every navigation exit.

## 9. Accessibility and Content

- Maintain WCAG AA contrast for body text and controls.
- Every icon-only button requires an accessible name.
- Use visible `:focus-visible` states; do not rely only on color.
- Provide descriptive Indonesian alt text for meaningful images.
- Decorative overlays and icons must be hidden from assistive technology.
- Video must be muted for autoplay and include a poster fallback.
- Navigation, details, and feedback states must remain keyboard accessible.
- Content should address domestic visitors in clear Indonesian, avoiding exaggerated claims such as "the most luxurious" unless verifiable.

## 10. Do and Don't

### Do

- Use authentic Subang media as the main visual material.
- Use forest, paper, and gold consistently across landing and explorer.
- Use Cormorant Garamond for emotional display type and Manrope for functional UI.
- Let sections breathe and keep content hierarchy obvious.
- Use category colors only to communicate category meaning.
- Keep controls predictable, compact, and accessible.
- Verify desktop and 390x844 mobile screenshots for every meaningful UI change.

### Don't

- Do not turn pages into generic collections of rounded cards.
- Do not introduce purple, bright blue, beige-dominant, or one-note monochrome themes.
- Do not use large pill buttons for standard commands.
- Do not add gradients, floating orbs, SVG decoration, or glass effects for visual filler.
- Do not use oversized marketing headings inside compact panels.
- Do not place text where it obscures a destination focal point or explorer marker.
- Do not animate the explorer camera independently from marker tracking.
- Do not use AI imagery that misrepresents Subang's geography, food, or culture.

## 11. Page Recipes

### Landing Page

1. Transparent navigation over authentic full-bleed media.
2. One literal destination headline, short supporting copy, and one primary CTA.
3. Editorial introduction with a strong real-place image.
4. Image-led destination, culinary, and itinerary sections.
5. A dedicated Subang 360 preview that links to `/jelajahi`.
6. Cultural storytelling with respectful, inspectable imagery.
7. A restrained final CTA and information-dense footer.

### Explorer

1. Full-viewport scene as the primary interface.
2. Desktop sidebar or mobile navigation dock.
3. Scene title and minimal contextual copy.
4. Time-tracked category markers aligned to real objects.
5. Compact video and chapter controls.
6. Place detail panel that pauses the video and preserves an obvious exit.

## 12. Agent Prompt Guide

Use this condensed direction when delegating UI work:

> Build for Subang 360 using a cinematic forest-and-gold Indonesian destination system. Use authentic full-bleed Subang photography, Cormorant Garamond display headings, Manrope UI text, deep forest surfaces, ivory copy, and restrained antique-gold actions. Keep page sections editorial and unframed, cards image-led with 3-4px radii, and controls compact and functional. Preserve explorer video-marker alignment, mobile safe areas, reduced motion, and 44px touch targets. Avoid generic rounded-card layouts, decorative gradients, fantasy travel imagery, and unrelated accent colors.

## 13. Implementation Map and Change Protocol

Current implementation references:

- Landing composition: `src/components/home/subang-landing-page.tsx`
- Landing styles and core tokens: `src/components/home/subang-landing-page.module.css`
- Explorer composition: `src/components/home/subang-360-experience.tsx`
- Explorer styles: `src/app/globals.css`
- Fonts: `src/app/layout.tsx`
- Places, category colors, and scene metadata: `src/lib/subang-data.ts`
- Scene/video renderer: `src/components/scene/subang-360-scene.tsx`

When changing the visual system:

1. Update `DESIGN.md` when a reusable rule or token changes.
2. Reuse existing tokens and components before introducing variants.
3. Validate landing and explorer independently; they serve different interaction densities.
4. Capture desktop and 390x844 mobile screenshots.
5. Check overflow, crop/focal points, text wrapping, keyboard focus, console output, and reduced motion.

## References

This document follows the plain-text DESIGN.md approach and extended section structure described by:

- [Google Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification/)
- [getdesign.md](https://getdesign.md/)
- [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

The Subang 360 values and rules above are derived from this repository's current implementation and approved visual direction, not copied from a third-party brand system.
