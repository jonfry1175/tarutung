import type { LucideIcon } from "lucide-react";
import { Church, Mountain, Sparkles, UtensilsCrossed } from "lucide-react";

export type PlaceCategory =
  | "history"
  | "culture"
  | "culinary"
  | "nature"
  | "modern";

export interface TarutungPlace {
  id: string;
  slug: string;
  title: string;
  category: PlaceCategory;
  summary: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  cluster: string;
  order: number;
  source: "fallback" | "notion";
}

export interface FocusTrack {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const categoryMeta: Record<
  PlaceCategory,
  { label: string; color: string }
> = {
  history: { label: "Sejarah", color: "#0f766e" },
  culture: { label: "Budaya", color: "#7c3aed" },
  culinary: { label: "Kuliner", color: "#c2410c" },
  nature: { label: "Alam", color: "#15803d" },
  modern: { label: "Modern", color: "#2563eb" },
};

export const quickFacts = [
  {
    label: "Wilayah",
    value: "107.68 km²",
    description: "Luas kecamatan Tarutung menurut BPS 2024.",
  },
  {
    label: "Mode data",
    value: "Notion first",
    description: "Halaman akan mengambil konten dari Notion saat env tersedia.",
  },
  {
    label: "Node imersif",
    value: "6-8 titik",
    description: "Prioritas awal untuk scene 360 dan media interaktif Tarutung.",
  },
];

export const focusTracks: FocusTrack[] = [
  {
    title: "Rohani & sejarah",
    description:
      "Tarutung paling kuat dibuka dari poros HKBP Pearaja, Salib Kasih, dan jejak pertumbuhan kota.",
    icon: Church,
  },
  {
    title: "Air panas & relaksasi",
    description:
      "Leaflet dan Notion bisa memetakan koridor pemandian air panas sebagai produk wisata utama.",
    icon: Mountain,
  },
  {
    title: "Kuliner kota",
    description:
      "Konten kuliner sebaiknya menampilkan menu khas plus tempat yang benar-benar hidup di pusat kota.",
    icon: UtensilsCrossed,
  },
  {
    title: "Tarutung modern",
    description:
      "Section modern dipakai untuk layanan publik, hospitality, dan kesiapan kota menerima wisatawan.",
    icon: Sparkles,
  },
];

export const routeClusters = [
  {
    name: "Pusat Kota & Identitas",
    summary:
      "Legenda Pohon Tarutung, pusat kota, dan anchor kuliner jadi muka pertama website.",
  },
  {
    name: "Rohani & Sejarah",
    summary:
      "HKBP Pearaja dan Salib Kasih memberi diferensiasi yang paling kuat untuk storytelling kota.",
  },
  {
    name: "Air Panas & Relaksasi",
    summary:
      "Cluster ini cocok untuk itinerari keluarga, healing, dan pelengkap experience yang tidak generik.",
  },
  {
    name: "Alam & Cerita Lokal",
    summary:
      "Air Soda, Sitakka, dan titik cerita lokal memberi hook visual dan editorial untuk wisatawan baru.",
  },
];

export const platformChecklist = [
  "Next.js 16 App Router",
  "TypeScript strict mode",
  "Tailwind CSS v4",
  "shadcn/ui base config",
  "Leaflet + React Leaflet",
  "Three.js hero canvas",
  "Notion SDK server-side",
  "Environment template",
  "JSON API route",
];

export const fallbackPlaces: TarutungPlace[] = [
  {
    id: "salib-kasih",
    slug: "salib-kasih",
    title: "Salib Kasih",
    category: "history",
    summary:
      "Landmark rohani yang paling kuat untuk membuka identitas Tarutung ke audiens nasional.",
    latitude: 1.9642,
    longitude: 99.0628,
    featured: true,
    cluster: "Rohani & Sejarah",
    order: 1,
    source: "fallback",
  },
  {
    id: "hkbp-pearaja",
    slug: "hkbp-pearaja",
    title: "HKBP Pearaja",
    category: "culture",
    summary:
      "Kawasan pusat HKBP yang memperlihatkan Tarutung sebagai kota rohani dan komunitas Batak yang hidup.",
    latitude: 2.0155,
    longitude: 99.0778,
    featured: true,
    cluster: "Rohani & Sejarah",
    order: 2,
    source: "fallback",
  },
  {
    id: "legenda-pohon-tarutung",
    slug: "legenda-pohon-tarutung",
    title: "Legenda Pohon Tarutung",
    category: "history",
    summary:
      "Titik editorial untuk mengikat asal-usul nama Tarutung dan narasi kota dari awal.",
    latitude: 2.0114,
    longitude: 99.0789,
    featured: true,
    cluster: "Pusat Kota & Identitas",
    order: 3,
    source: "fallback",
  },
  {
    id: "air-soda-tarutung",
    slug: "air-soda-tarutung",
    title: "Air Soda Tarutung",
    category: "nature",
    summary:
      "Keunikan alam paling langka dan paling mudah dijadikan hook utama di homepage.",
    latitude: 2.0179,
    longitude: 99.0994,
    featured: true,
    cluster: "Alam & Cerita Lokal",
    order: 4,
    source: "fallback",
  },
  {
    id: "rumah-makan-napinadar",
    slug: "rumah-makan-napinadar",
    title: "Rumah Makan Napinadar",
    category: "culinary",
    summary:
      "Anchor kuliner awal untuk memperlihatkan rasa lokal, bukan hanya daftar menu.",
    latitude: 2.0138,
    longitude: 99.0797,
    featured: true,
    cluster: "Pusat Kota & Identitas",
    order: 5,
    source: "fallback",
  },
  {
    id: "brew-brother",
    slug: "brew-brother-coffee",
    title: "Brew Brother Coffee",
    category: "modern",
    summary:
      "Representasi hospitality dan ruang temu yang memberi sisi kota yang lebih kontemporer.",
    latitude: 2.0149,
    longitude: 99.0813,
    featured: true,
    cluster: "Pusat Kota & Identitas",
    order: 6,
    source: "fallback",
  },
  {
    id: "air-panas-ugan",
    slug: "permandian-air-panas-ugan",
    title: "Permandian Air Panas Ugan",
    category: "nature",
    summary:
      "Wisata relaksasi yang menguatkan positioning Tarutung sebagai kota air panas.",
    latitude: 1.9508,
    longitude: 99.0661,
    featured: false,
    cluster: "Air Panas & Relaksasi",
    order: 7,
    source: "fallback",
  },
  {
    id: "air-terjun-sitakka",
    slug: "air-terjun-sitakka",
    title: "Air Terjun Sitakka",
    category: "nature",
    summary:
      "Pelengkap visual untuk section alam agar website tidak hanya berkutat di air panas.",
    latitude: 2.0221,
    longitude: 99.1116,
    featured: false,
    cluster: "Alam & Cerita Lokal",
    order: 8,
    source: "fallback",
  },
];
