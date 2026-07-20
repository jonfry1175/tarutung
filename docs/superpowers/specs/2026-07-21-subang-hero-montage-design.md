# Subang Hero Montage Design

## Summary

Replace the landing-page hero's single Ciater video with a calm, cinematic montage assembled from all 13 supplied Subang drone videos. Each source contributes one continuous 5.000-second selection. Adaptive cross-dissolves create a coherent journey from the highlands to the coast and a seamless circular loop.

The montage follows the existing Subang 360 visual contract: authentic full-bleed footage, quiet-luxury pacing, text-safe compositions, restrained motion, and a poster fallback for reduced-motion users.

## Scope

This change will:

- Render one new web-optimized hero video from the selected source windows.
- Render a matching WebP poster from the opening tea-plantation shot.
- Point `LandingHeroMedia` to the new video and poster.
- Preserve the current autoplay, muted, loop, inline-playback, and reduced-motion behavior.
- Preserve the existing destination-specific Ciater video rather than overwriting it.

This change will not:

- Modify destination videos referenced by `src/lib/subang-data.ts`.
- Remove or conceal baked-in source watermarks.
- Add music or source audio.
- Change hero layout, typography, overlay styling, or reusable design tokens.

## Selected Clips and Narrative Order

All timestamps refer to the original files in `/home/jonfry/Documents/Codex/2026-07-21/dow/outputs/subang-drone`.

| Order | Place and source | Source window | Visual role |
| --- | --- | --- | --- |
| 1 | Kebun Teh Ciater — `4K_Drone_-_Kebun_Teh_Ciater_Subang [anUUzg8ck1U].mp4` | `00:00:25.000–00:00:30.000` | Calm opening reveal, aligned with the current poster theme and hero text. |
| 2 | Tangkuban Parahu — `Tangkuban_Parahu_drone_view_from_Upas_Hill [nCxeXPjJWyA].mp4` | `00:00:22.000–00:00:27.000` | Dramatic crater panorama and highland scale. |
| 3 | Bukit Pamoyanan — `BUKIT_PAMOYANAN_-_AERIAL_DRONE_SJRC_F11_4K_PRO [vZR2Qo67mys].mp4` | `00:00:52.000–00:00:57.000` | Airy sea-of-clouds bridge. |
| 4 | Asstro Highlands — `Asstro_Highlands_Drone_Footage [XlThOgh8KUQ].mp4` | `00:01:08.000–00:01:13.000` | Misty tea terraces and contemplative pacing. |
| 5 | Sari Ater Campervan Park — `One_Shot_Cinematic_Drone_Footage_di_Sari_Ater_Campervan_Park_Subang_Jawa_Barat_4K_60FPS [GzlHuAVGgfs].mp4` | `00:00:52.000–00:00:57.000` | Forest-canopy transition into visitor destinations. |
| 6 | The Ranch Ciater — `THE_RANCH_CIATER_-_banyak_spot_buat_foto2_keren_view_dari_atas_dengan_drone_DJI_MAVIC_PRO [GoFW5WpYoxs].mp4` | `00:01:57.500–00:02:02.500` | Landscaped leisure destination with diagonal movement. |
| 7 | De Castello — `de_castello_explore_drone [Q4sKCHx77Z8].mp4` | `00:00:08.500–00:00:13.500` | Colorful architectural reveal and the montage's brightest accent. |
| 8 | Capolaga — `FPV_INTO_NATURE_CINEMATIC_CAPOLAGA_SUBANG [mLn0WkEXOTg].mp4` | `00:00:03.000–00:00:08.000` | Brief forward-moving stream passage that shifts the story back into nature. |
| 9 | Curug Cibareubeuy — `Curug_cibareubeuy_subang_DRONE [9owWL-B6wpo].mp4` | `00:00:54.000–00:00:59.000` | Centered waterfall reveal with deep vegetation. |
| 10 | Curug Bentang — `Air_terjun_Curug_Bentang_-_Subang_Jawa_Barat_video_udara [Ot15eURm4c4].mp4` | `00:00:54.000–00:00:59.000` | Turquoise pool as a brighter natural punctuation. |
| 11 | Curug Cileat — `Curug_Cileat_Subang_Jawa_Bawat_CINEMATIC_DRONE_VIDEO_Amazing_Ricefield [tEfeyy0ICuc].mp4` | `00:01:04.000–00:01:09.000` | Tall rainforest waterfall and the nature sequence's climax. |
| 12 | Pantai Pondok Bali — `pantai_pondok_bali_subang_Drone_dji_mini_2_see [CG_ORP_DSsQ].mp4` | `00:02:27.500–00:02:32.500` | Explicit arrival at Subang's coast. |
| 13 | Pantai Cirewang — `Pantai_Cirewang_-_Subang_cinematic_vidio [LiHVa3gn1fM].mp4` | `00:01:02.000–00:01:07.000` | Quiet mangrove shoreline ending that can dissolve back into the tea landscape. |

## Transition Design

Use adaptive cross-dissolves rather than a single transition duration. The transition timing is part of the circular timeline, including the final transition back into the opening clip.

| From → to | Duration |
| --- | ---: |
| Kebun Teh → Tangkuban Parahu | 0.70 s |
| Tangkuban Parahu → Bukit Pamoyanan | 0.75 s |
| Bukit Pamoyanan → Asstro Highlands | 0.65 s |
| Asstro Highlands → Sari Ater | 0.70 s |
| Sari Ater → The Ranch | 0.60 s |
| The Ranch → De Castello | 0.55 s |
| De Castello → Capolaga | 0.70 s |
| Capolaga → Curug Cibareubeuy | 0.55 s |
| Curug Cibareubeuy → Curug Bentang | 0.65 s |
| Curug Bentang → Curug Cileat | 0.60 s |
| Curug Cileat → Pantai Pondok Bali | 0.80 s |
| Pantai Pondok Bali → Pantai Cirewang | 0.70 s |
| Pantai Cirewang → Kebun Teh | 0.80 s |

The 65 seconds of selected source material overlap by 8.75 seconds, producing a target circular runtime of approximately 56.25 seconds. The render pipeline will append the opening clip after the coastal ending, apply the wrap transition, and trim the timeline at matching temporal points inside the opening clip. This avoids a hard discontinuity when the browser loops the file.

## Render Specification

- Container and codec: MP4 with H.264 video.
- Canvas: 1280×720, matching the current hero asset and the lowest-resolution sources.
- Frame rate: constant 24 fps.
- Pixel format: `yuv420p` for broad browser compatibility.
- Framing: aspect-preserving cover scale followed by a centered 1280×720 crop.
- Audio: omitted entirely.
- Streaming: MP4 metadata moved to the beginning with `+faststart`.
- Compression: start with CRF 23 and a quality-oriented preset; adjust only if necessary to keep the final asset near or below 20 MB without obvious foliage breakup.
- Transition: FFmpeg `xfade` using the standard fade curve.

Source brightness and color will remain authentic. Minor normalization is permitted only where a transition produces a visibly jarring exposure jump; no stylized grade or artificial color palette will be introduced.

## Output and Integration

Create:

- `public/videos/subang/subang-hero-montage.mp4`
- `public/images/subang/video-posters/subang-hero-montage.webp`

Update only the source and poster paths in:

- `src/components/home/landing-hero-media.tsx`

The existing `public/videos/subang/ciater-tea-plantation.mp4` remains unchanged because it is also destination content. No `DESIGN.md` update is required because the montage follows the existing media and motion rules without introducing a reusable visual rule.

## Known Source Constraints

- Sari Ater is a 4:3 source and requires a 16:9 crop.
- Capolaga and Pantai Cirewang are 720p sources; they should not be enlarged beyond the chosen output canvas.
- Cileat, Capolaga, Sari Ater, and Pantai Pondok Bali contain visible baked-in source marks or watermarks.
- Pantai Pondok Bali is busier than the other compositions, but it remains included because the approved design uses all 13 supplied videos.
- Rights and production-use permission for downloaded footage must be confirmed by the project owner before public deployment.

## Verification and Acceptance Criteria

The implementation is complete when:

1. Every source contributes the specified continuous 5.000-second window.
2. The montage has no source audio and plays in supported browsers as H.264/YUV420P.
3. No transition contains a black frame, hard cut, frozen frame, or obvious timestamp/title card.
4. The last-to-first browser loop is visually continuous.
5. Hero text remains legible and important visual subjects are not consistently hidden by the lower-left text block.
6. Reduced-motion users receive the new poster instead of autoplay video.
7. Desktop and 390×844 mobile checks confirm acceptable cover cropping and no layout regression.
8. The final file is visually acceptable at its web delivery size, with a target size at or below 20 MB.
9. `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass through the repository's configured Crabbox runner.
