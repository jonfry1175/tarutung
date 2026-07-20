**Comparison Target**

- Source visual truth: `/run/user/1000/codex-desktop/tmp/codex-clipboard-1dfd1872-0e53-40f1-8c33-12d49e430987.png`
- Implementation screenshot: `/home/jonfry/Desktop/work/jon/tarutung1/output/hero-clean-desktop.png`
- Mobile screenshot: `/home/jonfry/Desktop/work/jon/tarutung1/output/hero-clean-mobile.png`
- Side-by-side evidence: `/home/jonfry/Desktop/work/jon/tarutung1/output/hero-design-comparison.png`
- Viewports: 1672 × 938 desktop and 390 × 844 mobile
- State: landing hero at page top; menus closed for visual comparison

**Full-view Comparison Evidence**

- The final implementation preserves the target's full-bleed video-first composition, compact top-right utility controls, small lower-left editorial copy, restrained gold CTA, and centered scroll cue.
- The live video frame is darker than the generated source frame because the implementation uses the existing authentic moving asset. This is an expected temporal media difference rather than UI drift; the lighter overlay preserves available scene detail.

**Focused Region Comparison Evidence**

- Header: logo placement, grouped Search/Menu surface, separate ID surface, radii, and spacing align with the target.
- Hero copy: eyebrow, two-line display heading, short supporting copy, CTA size, and lower-left alignment match the target hierarchy.
- Media: embedded black side bars and watermark are removed from the visible crop without replacing the source asset.
- Mobile: the hero fits 390 × 844 without horizontal overflow; the compact menu remains reachable and exposes all navigation links.

**Required Fidelity Surfaces**

- Fonts and typography: Cormorant Garamond and Manrope match the existing Subang design system and target hierarchy; heading wraps to two lines on desktop and three intentional lines on mobile.
- Spacing and layout rhythm: desktop gutter, header spacing, lower-left content position, button dimensions, and scroll-cue placement match the target; mobile retains 20px content gutters and 44px minimum controls.
- Colors and visual tokens: existing forest, ivory, and antique-gold tokens are retained; the global media shade is reduced and contrast remains localized behind copy.
- Image quality and asset fidelity: the authentic tea-plantation MP4 and poster remain in use, rendered full-bleed with a crop that removes source letterboxing.
- Copy and content: target Indonesian headline and CTA are preserved; supporting copy is shortened to match the selected mockup.

**Findings**

- No actionable P0, P1, or P2 differences remain.

**Open Questions**

- None.

**Implementation Checklist**

- [x] Match desktop hero composition and hierarchy.
- [x] Keep video as the dominant visual.
- [x] Make Search, Menu, language, CTA, and navigation keyboard-accessible.
- [x] Verify desktop and 390 × 844 mobile states.
- [x] Check browser console errors and horizontal overflow.

**Comparison History**

- Pass 1: P1 source letterboxing remained visible and P2 display type was too large. Fixed by cropping the existing video/poster at 1.19 scale and reducing the desktop heading bounds.
- Pass 2: P2 global shade was darker than the target and the mobile icon-only menu lacked an accessible name. Fixed by reducing the overlay and adding explicit accessible labels.
- Pass 3: side-by-side comparison confirmed the layout, typography, controls, crop, and content hierarchy; browser evidence showed no console errors or horizontal overflow.

**Follow-up Polish**

- P3: video-frame brightness naturally varies from the static generated mockup.

final result: passed
