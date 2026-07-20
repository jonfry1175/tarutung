import type { Metadata } from "next";
import { NotFoundScene } from "@/components/ui/not-found-scene";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Subang 360",
  description:
    "Halaman yang Anda cari tidak ditemukan. Temukan destinasi wisata, kuliner, dan keindahan alam terbaik di Subang 360.",
};

export default function NotFound() {
  return <NotFoundScene />;
}
