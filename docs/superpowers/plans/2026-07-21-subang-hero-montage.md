# Subang Hero Montage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and integrate a muted, seamless-looping hero montage from the approved 5-second selections across all 13 Subang drone videos.

**Architecture:** FFmpeg trims and normalizes each source into a 1280×720/24 fps stream, joins them with the approved adaptive `xfade` chain, and closes the timeline through a duplicate opening clip before trimming one circular cycle. The landing hero references the new MP4 and poster while retaining its existing reduced-motion behavior.

**Tech Stack:** FFmpeg 4.4, H.264/libx264, WebP, Next.js 16 App Router, React 19, TypeScript, pnpm, Crabbox.

## Global Constraints

- Every source contributes exactly one continuous 5.000-second window from the approved design spec.
- The final video has no audio stream and the `<video>` remains explicitly `muted`.
- Output is MP4/H.264, 1280×720, constant 24 fps, `yuv420p`, and `+faststart`.
- Preserve `public/videos/subang/ciater-tea-plantation.mp4`; it remains destination content.
- Preserve the existing autoplay, loop, inline-playback, metadata-preload, and reduced-motion behavior.
- Do not remove or conceal baked-in source watermarks.
- Do not modify hero layout, typography, overlays, `DESIGN.md`, or unrelated working-tree files.
- Do not add or run a new automated test for this expedited media-only change.
- Run build, lint, and typecheck serially with `crabbox run --id ticketing-vps --reclaim -- ...`.
- Keep `.env.local`, local secrets, `.next`, and manual QA artifacts out of Crabbox remote sync.

## File Map

- Create `public/videos/subang/subang-hero-montage.mp4`: web-delivery montage generated from the 13 approved source windows.
- Create `public/images/subang/video-posters/subang-hero-montage.webp`: reduced-motion and pre-play poster extracted from the montage opening.
- Modify `src/components/home/landing-hero-media.tsx`: reference the new MP4 and WebP poster only.

---

### Task 1: Render and Validate the Circular Montage

**Files:**
- Create: `public/videos/subang/subang-hero-montage.mp4`
- Create: `public/images/subang/video-posters/subang-hero-montage.webp`

**Interfaces:**
- Consumes: the 13 source files under `/home/jonfry/Documents/Codex/2026-07-21/dow/outputs/subang-drone` and the timestamps in the approved design spec.
- Produces: a silent 56.25-second MP4 at `/videos/subang/subang-hero-montage.mp4` and matching poster at `/images/subang/video-posters/subang-hero-montage.webp`.

- [ ] **Step 1: Confirm every source exists before starting the render**

Run:

```bash
source_dir=/home/jonfry/Documents/Codex/2026-07-21/dow/outputs/subang-drone
for source in \
  "4K_Drone_-_Kebun_Teh_Ciater_Subang [anUUzg8ck1U].mp4" \
  "Tangkuban_Parahu_drone_view_from_Upas_Hill [nCxeXPjJWyA].mp4" \
  "BUKIT_PAMOYANAN_-_AERIAL_DRONE_SJRC_F11_4K_PRO [vZR2Qo67mys].mp4" \
  "Asstro_Highlands_Drone_Footage [XlThOgh8KUQ].mp4" \
  "One_Shot_Cinematic_Drone_Footage_di_Sari_Ater_Campervan_Park_Subang_Jawa_Barat_4K_60FPS [GzlHuAVGgfs].mp4" \
  "THE_RANCH_CIATER_-_banyak_spot_buat_foto2_keren_view_dari_atas_dengan_drone_DJI_MAVIC_PRO [GoFW5WpYoxs].mp4" \
  "de_castello_explore_drone [Q4sKCHx77Z8].mp4" \
  "FPV_INTO_NATURE_CINEMATIC_CAPOLAGA_SUBANG [mLn0WkEXOTg].mp4" \
  "Curug_cibareubeuy_subang_DRONE [9owWL-B6wpo].mp4" \
  "Air_terjun_Curug_Bentang_-_Subang_Jawa_Barat_video_udara [Ot15eURm4c4].mp4" \
  "Curug_Cileat_Subang_Jawa_Bawat_CINEMATIC_DRONE_VIDEO_Amazing_Ricefield [tEfeyy0ICuc].mp4" \
  "pantai_pondok_bali_subang_Drone_dji_mini_2_see [CG_ORP_DSsQ].mp4" \
  "Pantai_Cirewang_-_Subang_cinematic_vidio [LiHVa3gn1fM].mp4"
do
  test -s "$source_dir/$source"
done
```

Expected: exit code 0 with no output.

- [ ] **Step 2: Render the normalized clips, adaptive dissolves, and circular boundary**

Run locally, never through Crabbox:

```bash
source_dir=/home/jonfry/Documents/Codex/2026-07-21/dow/outputs/subang-drone
output=public/videos/subang/subang-hero-montage.mp4

ffmpeg -y \
  -ss 00:00:25.000 -t 5 -i "$source_dir/4K_Drone_-_Kebun_Teh_Ciater_Subang [anUUzg8ck1U].mp4" \
  -ss 00:00:22.000 -t 5 -i "$source_dir/Tangkuban_Parahu_drone_view_from_Upas_Hill [nCxeXPjJWyA].mp4" \
  -ss 00:00:52.000 -t 5 -i "$source_dir/BUKIT_PAMOYANAN_-_AERIAL_DRONE_SJRC_F11_4K_PRO [vZR2Qo67mys].mp4" \
  -ss 00:01:08.000 -t 5 -i "$source_dir/Asstro_Highlands_Drone_Footage [XlThOgh8KUQ].mp4" \
  -ss 00:00:52.000 -t 5 -i "$source_dir/One_Shot_Cinematic_Drone_Footage_di_Sari_Ater_Campervan_Park_Subang_Jawa_Barat_4K_60FPS [GzlHuAVGgfs].mp4" \
  -ss 00:01:57.500 -t 5 -i "$source_dir/THE_RANCH_CIATER_-_banyak_spot_buat_foto2_keren_view_dari_atas_dengan_drone_DJI_MAVIC_PRO [GoFW5WpYoxs].mp4" \
  -ss 00:00:08.500 -t 5 -i "$source_dir/de_castello_explore_drone [Q4sKCHx77Z8].mp4" \
  -ss 00:00:03.000 -t 5 -i "$source_dir/FPV_INTO_NATURE_CINEMATIC_CAPOLAGA_SUBANG [mLn0WkEXOTg].mp4" \
  -ss 00:00:54.000 -t 5 -i "$source_dir/Curug_cibareubeuy_subang_DRONE [9owWL-B6wpo].mp4" \
  -ss 00:00:54.000 -t 5 -i "$source_dir/Air_terjun_Curug_Bentang_-_Subang_Jawa_Barat_video_udara [Ot15eURm4c4].mp4" \
  -ss 00:01:04.000 -t 5 -i "$source_dir/Curug_Cileat_Subang_Jawa_Bawat_CINEMATIC_DRONE_VIDEO_Amazing_Ricefield [tEfeyy0ICuc].mp4" \
  -ss 00:02:27.500 -t 5 -i "$source_dir/pantai_pondok_bali_subang_Drone_dji_mini_2_see [CG_ORP_DSsQ].mp4" \
  -ss 00:01:02.000 -t 5 -i "$source_dir/Pantai_Cirewang_-_Subang_cinematic_vidio [LiHVa3gn1fM].mp4" \
  -ss 00:00:25.000 -t 5 -i "$source_dir/4K_Drone_-_Kebun_Teh_Ciater_Subang [anUUzg8ck1U].mp4" \
  -filter_complex "\
[0:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v0];\
[1:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v1];\
[2:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v2];\
[3:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v3];\
[4:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v4];\
[5:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v5];\
[6:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v6];\
[7:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v7];\
[8:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v8];\
[9:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v9];\
[10:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v10];\
[11:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v11];\
[12:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v12];\
[13:v]fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[v13];\
[v0][v1]xfade=transition=fade:duration=0.70:offset=4.30[x1];\
[x1][v2]xfade=transition=fade:duration=0.75:offset=8.55[x2];\
[x2][v3]xfade=transition=fade:duration=0.65:offset=12.90[x3];\
[x3][v4]xfade=transition=fade:duration=0.70:offset=17.20[x4];\
[x4][v5]xfade=transition=fade:duration=0.60:offset=21.60[x5];\
[x5][v6]xfade=transition=fade:duration=0.55:offset=26.05[x6];\
[x6][v7]xfade=transition=fade:duration=0.70:offset=30.35[x7];\
[x7][v8]xfade=transition=fade:duration=0.55:offset=34.80[x8];\
[x8][v9]xfade=transition=fade:duration=0.65:offset=39.15[x9];\
[x9][v10]xfade=transition=fade:duration=0.60:offset=43.55[x10];\
[x10][v11]xfade=transition=fade:duration=0.80:offset=47.75[x11];\
[x11][v12]xfade=transition=fade:duration=0.70:offset=52.05[x12];\
[x12][v13]xfade=transition=fade:duration=0.80:offset=56.25[cycle];\
[cycle]trim=start=0.80:duration=56.25,setpts=PTS-STARTPTS[outv]" \
  -map "[outv]" \
  -an \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$output"
```

Expected: FFmpeg exits 0 and creates a playable MP4.

- [ ] **Step 3: Extract the matching opening poster**

Run:

```bash
ffmpeg -y \
  -ss 00:00:00.500 \
  -i public/videos/subang/subang-hero-montage.mp4 \
  -frames:v 1 \
  -c:v libwebp \
  -quality 82 \
  public/images/subang/video-posters/subang-hero-montage.webp
```

Expected: FFmpeg exits 0 and creates a non-empty 1280×720 WebP poster.

- [ ] **Step 4: Probe the technical contract**

Run:

```bash
ffprobe -v error \
  -show_entries stream=codec_name,codec_type,width,height,r_frame_rate,pix_fmt \
  -show_entries format=duration,size \
  -of default=noprint_wrappers=1 \
  public/videos/subang/subang-hero-montage.mp4
```

Expected fields:

```text
codec_name=h264
codec_type=video
width=1280
height=720
r_frame_rate=24/1
pix_fmt=yuv420p
duration=56.250000
```

There must be no `codec_type=audio`, and `size` should be no more than 20,971,520 bytes. If the CRF 23 output exceeds that ceiling, rerun Step 2 with `-crf 24`, then repeat Steps 3–4.

- [ ] **Step 5: Inspect transition boundaries and the loop boundary**

Create a temporary contact sheet outside the repository:

```bash
qa_dir=$(mktemp -d)
ffmpeg -y \
  -i public/videos/subang/subang-hero-montage.mp4 \
  -vf "fps=2,scale=320:-1,tile=5x5" \
  -frames:v 1 \
  "$qa_dir/montage-contact-sheet.jpg"
```

Open the contact sheet and the first/last second of the MP4. Expected: all 13 scenes are represented in the approved order, no black or frozen frames are visible, and the coast-to-tea loop has no hard discontinuity.

- [ ] **Step 6: Commit the generated assets**

```bash
git add \
  public/videos/subang/subang-hero-montage.mp4 \
  public/images/subang/video-posters/subang-hero-montage.webp
git commit -m "feat(hero): add subang drone montage"
```

### Task 2: Wire the Montage into the Landing Hero

**Files:**
- Modify: `src/components/home/landing-hero-media.tsx:21-33`

**Interfaces:**
- Consumes: `/videos/subang/subang-hero-montage.mp4` and `/images/subang/video-posters/subang-hero-montage.webp` from Task 1.
- Produces: a landing hero that autoplays the silent montage for motion-enabled users and leaves the CSS background/poster fallback available to reduced-motion users.

- [ ] **Step 1: Change only the hero media paths**

In `src/components/home/landing-hero-media.tsx`, replace the existing poster and source lines with:

```tsx
      poster="/images/subang/video-posters/subang-hero-montage.webp"
```

and:

```tsx
      <source src="/videos/subang/subang-hero-montage.mp4" type="video/mp4" />
```

Do not alter `autoPlay`, `muted`, `loop`, `playsInline`, `preload`, the reduced-motion media query, or the `if (!allowMotion) return null` branch.

- [ ] **Step 2: Confirm the component keeps the mute and reduced-motion contract**

Run:

```bash
rg -n 'autoPlay|muted|loop|playsInline|prefers-reduced-motion|subang-hero-montage' src/components/home/landing-hero-media.tsx
```

Expected: the component contains the new MP4 and poster paths together with `autoPlay`, `muted`, `loop`, `playsInline`, and the existing reduced-motion query.

- [ ] **Step 3: Commit the integration**

```bash
git add src/components/home/landing-hero-media.tsx
git commit -m "feat(hero): use subang drone montage"
```

### Task 3: Verify the Landing Experience and Quality Gates

**Files:**
- Verify: `public/videos/subang/subang-hero-montage.mp4`
- Verify: `public/images/subang/video-posters/subang-hero-montage.webp`
- Verify: `src/components/home/landing-hero-media.tsx`
- Verify: `src/components/home/subang-landing-page.module.css`

**Interfaces:**
- Consumes: the completed montage and hero integration from Tasks 1–2.
- Produces: evidence that playback, cropping, readability, reduced motion, tests, lint, types, and production build satisfy the design spec.

- [ ] **Step 1: Initialize the configured remote runner**

Run serially:

```bash
crabbox run --id ticketing-vps --reclaim -- corepack pnpm install --frozen-lockfile
```

Expected: dependencies install successfully without syncing `.env.local`, local secrets, `.next`, or manual QA artifacts.

- [ ] **Step 2: Run lint, typecheck, and production build through Crabbox**

Run serially:

```bash
crabbox run --id ticketing-vps --reclaim -- corepack pnpm lint
crabbox run --id ticketing-vps --reclaim -- corepack pnpm typecheck
crabbox run --id ticketing-vps --reclaim -- corepack pnpm build
```

Expected: each command exits 0. Do not run these three concurrently on the shared runner.

- [ ] **Step 3: Perform local browser verification at desktop and mobile sizes**

Start the app locally with `corepack pnpm dev`, then inspect `/` at:

- Desktop: 1920×1080.
- Mobile: 390×844.

Expected at both sizes:

- The new montage loads, autoplays, remains muted, and loops.
- Hero text stays legible and the focal subject is not persistently obscured.
- Cover cropping does not reveal empty canvas or distort a clip.
- No console errors, horizontal overflow, or layout regressions appear.
- With `prefers-reduced-motion: reduce`, the video element is absent and the poster/background remains visible.

- [ ] **Step 4: Review repository state and summarize verification**

Run:

```bash
git status --short
git log -3 --oneline
```

Expected: only pre-existing user changes, if any, remain uncommitted; the montage asset commit and hero integration commit are visible in recent history.
