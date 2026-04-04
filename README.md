# Tarutung Atlas Starter

Starter website kota Tarutung berbasis `Next.js 16` dengan stack:

- `pnpm`
- `TypeScript`
- `Tailwind CSS v4`
- `shadcn/ui`
- `Leaflet` + `react-leaflet`
- `Three.js`
- `Notion SDK`

## Menjalankan project

```bash
pnpm dev
```

Script lain:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Catatan:

- `dev` dan `build` diset ke mode `webpack` agar stabil di environment yang membatasi Turbopack.
- API data tersedia di `http://localhost:3000/api/places`.

## Environment

Template ada di `.env.example`. File kerja lokal ada di `.env.local`.

Key yang dipakai:

```bash
NOTION_TOKEN=
NOTION_DATA_SOURCE_ID=
NOTION_DATABASE_ID=
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
NEXT_PUBLIC_MAP_ATTRIBUTION=&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
```

Catatan:

- `NOTION_DATA_SOURCE_ID` adalah key utama untuk SDK Notion versi sekarang.
- `NOTION_DATABASE_ID` tetap didukung sebagai fallback alias.

## Schema Notion yang Disarankan

Buat satu data source Notion dengan properti berikut:

| Property | Type | Wajib | Keterangan |
| --- | --- | --- | --- |
| `Name` | Title | Ya | Nama tempat |
| `Slug` | Rich text | Tidak | URL slug manual |
| `Category` | Select | Ya | `history`, `culture`, `culinary`, `nature`, `modern` |
| `Summary` | Rich text | Ya | Ringkasan singkat untuk card dan popup |
| `Latitude` | Number | Ya | Koordinat marker |
| `Longitude` | Number | Ya | Koordinat marker |
| `Featured` | Checkbox | Tidak | Muncul di grid utama |
| `Published` | Checkbox | Tidak | Jika `false`, item di-skip |
| `Cluster` | Select | Tidak | Nama cluster mini-map |
| `Order` | Number | Tidak | Urutan tampil |

Jika env Notion belum diisi, aplikasi otomatis memakai fallback data dari riset Tarutung.

## Struktur Inti

- `src/app/page.tsx`: landing page starter
- `src/app/api/places/route.ts`: endpoint JSON untuk place data
- `src/lib/notion.ts`: adapter Notion server-side
- `src/lib/tarutung-data.ts`: fallback data awal Tarutung
- `src/components/map/tarutung-map.tsx`: peta Leaflet
- `src/components/scene/tarutung-hero-scene.tsx`: hero scene Three.js
- `components.json`: base config shadcn/ui

## Status Setup

Stack ini sudah diverifikasi dengan:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
