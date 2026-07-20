# Subang 360 Separate Soundtrack Design

## Goal

Replace the `/jelajahi` scene-video audio with one dedicated Subang 360 soundtrack while keeping the change narrow and preserving the current controls and video behavior.

## Audio Direction

Use a licensed modern cinematic Sundanese instrumental: kacapi and suling or toleat over restrained ambient pads, with light kendang or dog-dog percussion. Prefer a seamless 90-120 second loop without vocals so repeated playback remains comfortable.

The final audio master is an external prerequisite and will be stored at:

`public/sounds/subang-360-soundtrack.mp3`

## Behavior

- Every scene video remains permanently muted.
- A single page-level audio element plays the soundtrack, loops continuously, and does not restart when the visitor changes scenes.
- Audio starts disabled to comply with browser autoplay restrictions.
- The existing speaker button toggles only the dedicated soundtrack and retains its current labels and visual states.
- Pausing, restarting, changing, or opening details for a video does not change soundtrack playback.
- If the browser rejects audio playback, the interface remains in the disabled state without showing a disruptive error.
- Use a moderate fixed soundtrack volume so it functions as ambience rather than foreground content.

## Minimal Implementation Scope

- Update `src/components/home/subang-360-experience.tsx` to own and control the soundtrack.
- Update `src/components/scene/subang-360-scene.tsx` so scene video is always muted and no longer accepts audio state from its parent.
- Add only the final licensed MP3 under `public/sounds/`.
- Do not change layouts, styling, scene metadata, video assets, video timing, markers, or chapter controls.
- No reusable design token or visual rule changes are required, so `DESIGN.md` remains unchanged.

## Verification

- Confirm videos stay silent when soundtrack audio is enabled.
- Confirm the soundtrack starts only after the speaker control is activated.
- Confirm it continues without restarting across all five scenes and while place details are open.
- Confirm the speaker control can stop and resume playback.
- Confirm rejected playback leaves the control in a truthful disabled state.
- Run lint, typecheck, and production build serially through the configured Crabbox runner.
- Perform a local browser check on desktop and 390x844 mobile.

## Out of Scope

- Per-scene songs, crossfades, playlists, volume sliders, audio credits UI, and changes to the source videos.
- Selecting or licensing a commercial recording without explicit usage rights.
