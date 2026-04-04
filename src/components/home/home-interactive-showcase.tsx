"use client";

import dynamic from "next/dynamic";

import type { TarutungPlace } from "@/lib/tarutung-data";

const TarutungHeroScene = dynamic(
  () =>
    import("@/components/scene/tarutung-hero-scene").then(
      (mod) => mod.TarutungHeroScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel h-[420px] animate-pulse rounded-[2rem] border border-border/70" />
    ),
  },
);

const TarutungMap = dynamic(
  () => import("@/components/map/tarutung-map").then((mod) => mod.TarutungMap),
  {
    ssr: false,
    loading: () => (
      <div className="map-surface flex h-[480px] items-center justify-center rounded-[2rem] border border-border/70 text-sm text-muted-foreground">
        Menyiapkan peta Tarutung...
      </div>
    ),
  },
);

interface HomeInteractiveShowcaseProps {
  kind: "hero" | "map";
  places?: TarutungPlace[];
}

export function HomeInteractiveShowcase({
  kind,
  places = [],
}: HomeInteractiveShowcaseProps) {
  if (kind === "hero") {
    return <TarutungHeroScene />;
  }

  return <TarutungMap places={places} />;
}
