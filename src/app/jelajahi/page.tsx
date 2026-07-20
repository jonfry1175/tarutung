import type { Metadata } from "next";

import { Subang360Experience } from "@/components/home/subang-360-experience";

export const metadata: Metadata = {
  title: "Jelajahi Subang 360",
  description:
    "Jelajahi wisata, kuliner, dan budaya Kabupaten Subang melalui panorama interaktif.",
};

export default function ExplorePage() {
  return <Subang360Experience />;
}
