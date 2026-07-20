# Authentication Modal Redesign

## Goal

Improve the visual quality and clarity of the saved-place authentication modal while preserving its existing Google authentication behavior, error handling, and dismissal interactions.

## Visual Direction

Use a refined nature-luxury aesthetic that belongs to the existing explorer experience. The modal should feel editorial and locally grounded rather than like a generic authentication widget.

## Composition

- Present the dialog as a warm ivory card with a subtle paper-like texture.
- Use a restrained muted-gold border and a deep forest shadow to separate it from the darkened explorer view.
- Place the bookmark icon inside a dark-green medallion that slightly overlaps the top edge of the card.
- Add a short decorative gold accent to strengthen the vertical hierarchy without adding illustrative clutter.
- Retain a centered headline and supporting copy, with more deliberate spacing and a narrower readable measure.

## Typography and Color

- Continue the experience's editorial serif voice for the headline, with controlled size and line height on small screens.
- Use dark forest green for primary text and muted sage-gray for supporting text.
- Use warm ivory, antique gold, and forest green as the dominant palette.
- Keep body and button text highly legible against their surfaces.

## Controls and Feedback

- Keep one primary action: `Lanjutkan dengan Google`.
- Replace the letter-in-a-circle placeholder with an accurate multicolor Google mark rendered locally in the component.
- Give the button clear default, hover, active, keyboard-focus, and disabled states.
- Keep the close control in the top-right corner with an explicit accessible label and a visible focus style.
- Show authentication errors beneath the primary action without changing the current error data flow.
- Add a brief reassurance below the action explaining that saved destinations remain available across devices. Do not make unsupported security or privacy claims.

## Motion and Responsiveness

- Animate the backdrop with a soft fade and the card with a brief fade-and-rise entrance.
- Honor `prefers-reduced-motion` by effectively disabling those transitions.
- Preserve comfortable touch targets and reduce card padding and headline size on narrow phones.
- Prevent decorative overlap from clipping at small viewport heights.

## Behavior and Scope

- Preserve backdrop-click dismissal, close-button dismissal, dialog semantics, busy state, and Google authentication logic.
- Do not change saved-place behavior, authentication APIs, state management, or page structure.
- Limit implementation changes to the modal markup needed for the Google mark and reassurance copy, plus its CSS.

## Verification

- Run lint, typecheck, and production build.
- Manually verify desktop and mobile layouts.
- Verify hover, focus-visible, disabled/busy, close, backdrop-dismissal, error, and reduced-motion states.
- Capture updated desktop and mobile screenshots because the change is visual.
