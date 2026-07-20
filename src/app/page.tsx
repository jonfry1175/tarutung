import type { Metadata } from "next";

import { SubangLandingPage } from "@/components/home/subang-landing-page";

export const metadata: Metadata = {
  title: "Subang | Dari Pegunungan ke Pesisir",
  description:
    "Temukan wisata alam, kuliner, budaya, dan perjalanan pilihan di Kabupaten Subang.",
};

export default function Home() {
  return <SubangLandingPage />;
}
