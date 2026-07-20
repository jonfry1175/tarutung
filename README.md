# Subang 360

Platform wisata visual untuk memperkenalkan Kabupaten Subang melalui landing page sinematik dan explorer video interaktif. Konten utama mencakup wisata, kuliner, budaya, dan pilihan perjalanan bagi wisatawan domestik.

## Pengalaman Utama

- `/`: landing page editorial dengan hero video Ciater, destinasi unggulan, kuliner, budaya, dan itinerary.
- `/jelajahi`: explorer Subang 360 dengan chapter video, marker lokasi yang mengikuti timeline, filter kategori, detail tempat, progres kunjungan, favorit, dan rencana perjalanan.
- `/jelajahi?scene=<scene>&place=<place>`: deep link menuju chapter dan detail tempat tertentu.
- `/auth/callback`: callback autentikasi Google melalui Supabase.

## Stack

- Next.js 16 App Router dan React 19
- TypeScript
- Tailwind CSS v4 dan CSS Modules
- Supabase Auth dan penyimpanan tempat favorit
- Three.js untuk renderer scene
- Lucide React untuk iconography
- Notion SDK dan Leaflet hanya untuk adapter lama yang belum digunakan pengalaman utama

## Menjalankan Project

```bash
pnpm install
pnpm dev
```

Aplikasi tersedia di `http://localhost:3000`.

Quality gate:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`dev` dan `build` menggunakan webpack agar stabil pada environment proyek ini. Ikuti `AGENTS.md` untuk ketentuan menjalankan quality gate melalui Crabbox.

## Environment

Salin nilai yang dibutuhkan dari `.env.example` ke `.env.local`. Jangan commit `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SHOW_NEW_SUBANG_PLACES=false
```

- Dua variable Supabase diperlukan untuk login Google dan sinkronisasi tempat tersimpan.
- `NEXT_PUBLIC_SHOW_NEW_SUBANG_PLACES` mengaktifkan tempat Subang yang masih berada di balik feature flag.
- Variable Notion dan map masih tersedia untuk adapter legacy, tetapi tidak menjadi sumber konten `/` atau `/jelajahi`.

## Struktur Utama

- `src/app/page.tsx`: entrypoint landing page.
- `src/app/jelajahi/page.tsx`: entrypoint explorer Subang 360.
- `src/components/home/subang-landing-page.tsx`: komposisi landing page.
- `src/components/home/subang-360-experience.tsx`: state dan interaksi explorer.
- `src/components/scene/subang-360-scene.tsx`: video/scene renderer.
- `src/lib/subang-data.ts`: scene, tempat, kategori, marker track, dan konten Subang.
- `src/lib/supabase/`: client, server, dan proxy Supabase.
- `public/images/subang/`: gambar, poster, dan visual Subang.
- `public/videos/subang/`: video chapter explorer.
- `DESIGN.md`: kontrak visual kanonis.
- `docs/architecture/`: keputusan arsitektur dan istilah domain.
- `output/`: artefak QA; bukan source code.

## Dokumentasi

- `DESIGN.md`: warna, tipografi, komponen, media, motion, dan responsive behavior.
- `docs/architecture/adr-001-google-auth-saved-places.md`: keputusan autentikasi dan penyimpanan favorit.
- `docs/architecture/subang-360-glossary.md`: istilah domain aktif.
- `output/prd/subang-360-prd.md`: PRD MVP historis yang sudah superseded oleh implementasi sekarang.
- `docs/archive/`: riset dan dokumentasi starter lama yang tidak berlaku untuk pengembangan baru.

## Legacy Tarutung

Repository ini berasal dari starter Tarutung. Modul berikut masih dipertahankan sementara untuk kompatibilitas dan riwayat implementasi, tetapi tidak digunakan oleh route utama Subang 360:

- `src/lib/tarutung-data.ts`
- `src/lib/notion.ts`
- `src/components/map/tarutung-map.tsx`
- `src/components/scene/tarutung-hero-scene.tsx`
- `src/components/home/home-interactive-showcase.tsx`
- `src/app/api/places/route.ts`

Jangan gunakan modul tersebut untuk fitur baru. Migrasi atau penghapusannya harus menjadi perubahan kode terpisah karena adapter Notion dan endpoint lama masih saling bergantung.
