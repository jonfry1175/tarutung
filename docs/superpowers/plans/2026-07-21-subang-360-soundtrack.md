# Subang 360 Soundtrack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/jelajahi` use one dedicated looping soundtrack while every scene video remains muted.

**Architecture:** `Subang360Experience` owns one persistent HTML audio element and maps the existing speaker buttons to its real playback state. `Subang360Scene` keeps responsibility for video playback and always renders muted video.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, native HTML audio/video.

## Global Constraints

- Keep the diff minimal and do not change layout, styling, scene metadata, markers, or video timing.
- Use `public/sounds/subang-360-soundtrack.mp3` as the only soundtrack.
- Audio starts disabled and may only start after the visitor activates an existing speaker button.
- Do not add dependencies or test infrastructure.
- Run project quality gates serially through Crabbox.

---

### Task 1: Separate Soundtrack Playback

**Files:**
- Modify: `src/components/home/subang-360-experience.tsx`
- Modify: `src/components/scene/subang-360-scene.tsx`
- Verify: `public/sounds/subang-360-soundtrack.mp3`

**Interfaces:**
- Consumes: the existing `audioEnabled` UI state and `toggleAudio` handlers.
- Produces: one persistent `<audio>` element controlled by `soundtrackRef`; `Subang360SceneProps` without a `muted` property.

- [ ] **Step 1: Record the failing baseline**

Inspect `/jelajahi` and confirm the existing speaker button changes the `muted` state of the active `<video>` and that no `<audio>` element exists. This is the behavior being replaced.

- [ ] **Step 2: Add the persistent soundtrack controller**

In `src/components/home/subang-360-experience.tsx`, import `useRef`, create `soundtrackRef`, and replace the state-only toggle with real media control:

```tsx
const soundtrackRef = useRef<HTMLAudioElement>(null);

const toggleAudio = useCallback(async () => {
  const soundtrack = soundtrackRef.current;
  if (!soundtrack) return;

  if (!soundtrack.paused) {
    soundtrack.pause();
    setAudioEnabled(false);
    return;
  }

  soundtrack.volume = 0.45;
  try {
    await soundtrack.play();
    setAudioEnabled(true);
  } catch {
    setAudioEnabled(false);
  }
}, []);
```

Render the persistent player as the first child of `<main>`:

```tsx
<audio
  ref={soundtrackRef}
  src="/sounds/subang-360-soundtrack.mp3"
  loop
  preload="auto"
  onPause={() => setAudioEnabled(false)}
  onPlay={() => setAudioEnabled(true)}
/>
```

Remove `muted={!audioEnabled}` from the `Subang360Scene` call. Keep both existing speaker buttons and their labels unchanged.

- [ ] **Step 3: Permanently mute scene video**

In `src/components/scene/subang-360-scene.tsx`, remove `muted` from `Subang360SceneProps` and the component arguments. Remove `video.muted = muted`, keep the `<video muted>` attribute, and remove `muted` from the playback effect dependencies:

```tsx
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
  } else {
    void video.play().catch(() => undefined);
  }
}, [paused, ready, scene.id]);
```

- [ ] **Step 4: Run static quality gates**

Run these serially:

```bash
crabbox run --id ticketing-vps --reclaim -- pnpm lint
crabbox run --id ticketing-vps --reclaim -- pnpm typecheck
crabbox run --id ticketing-vps --reclaim -- pnpm build
```

Expected: all three commands exit successfully.

- [ ] **Step 5: Verify the browser behavior**

On local `/jelajahi`, verify:

- initial state has one paused `<audio>` and a muted `<video>`;
- activating either speaker button plays the audio while video stays muted;
- changing all five chapters does not replace or restart the audio element;
- pausing video and opening a place detail do not pause the soundtrack;
- activating the speaker button again pauses audio and restores the disabled icon state;
- behavior remains usable at desktop size and 390x844.

- [ ] **Step 6: Review the final diff**

Run `rtk git diff --check` and `rtk git diff -- src/components/home/subang-360-experience.tsx src/components/scene/subang-360-scene.tsx`. Confirm unrelated working-tree changes are absent from the feature diff and leave the implementation uncommitted unless the user asks for a commit.
