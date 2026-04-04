import Link from "next/link";
import {
  ArrowRight,
  Church,
  Database,
  Landmark,
  Mountain,
  Route,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HomeInteractiveShowcase } from "@/components/home/home-interactive-showcase";
import { getPlaces } from "@/lib/notion";
import {
  categoryMeta,
  focusTracks,
  platformChecklist,
  quickFacts,
  routeClusters,
} from "@/lib/tarutung-data";

export default async function Home() {
  const { places, source, notionConfigured } = await getPlaces();
  const featuredPlaces = places.filter((place) => place.featured).slice(0, 6);

  return (
    <main className="pb-20">
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
          <div className="flex flex-col justify-center gap-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-2">
                <Sparkles className="size-3.5" />
                Tarutung starter stack
              </Badge>
              <Badge variant="outline">
                Source data:{" "}
                {source === "notion" ? "Notion database" : "Fallback lokal"}
              </Badge>
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Next.js starter untuk membangun website kota Tarutung dengan
                peta, 3D, dan CMS Notion.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Fondasi ini sudah menyiapkan App Router, TypeScript, Tailwind,
                shadcn/ui, Leaflet, Three.js, dan jalur server-side ke database
                Notion. Kamu tinggal lanjut ke eksplorasi konten, produksi
                aset, dan storytelling kota.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/api/places"
                className={buttonVariants({ size: "lg" })}
              >
                Buka API JSON
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://www.notion.so/profile/integrations"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Siapkan integrasi Notion
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <Card key={fact.label} className="glass-panel border-border/70">
                  <CardHeader className="gap-1 pb-3">
                    <CardDescription>{fact.label}</CardDescription>
                    <CardTitle className="text-xl">{fact.value}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {fact.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <HomeInteractiveShowcase kind="hero" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex items-end justify-between gap-6 pb-6">
          <div className="space-y-2">
            <Badge variant="secondary">Arsitektur konten</Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              Jalur cerita utama untuk Tarutung
            </h2>
          </div>
          <Button variant="secondary" disabled>
            App Router ready
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {focusTracks.map((track) => {
            const Icon = track.icon;
            return (
              <Card key={track.title} className="glass-panel border-border/70">
                <CardHeader className="space-y-4">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle>{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="gap-2">
              <Route className="size-3.5" />
              Mini map
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              Leaflet sudah siap untuk cluster wisata Tarutung
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Komponen peta berjalan di client melalui dynamic import agar aman
              untuk App Router. Marker memakai kategori konten yang sama dengan
              matriks riset Tarutung.
            </p>
          </div>
          <HomeInteractiveShowcase
            kind="map"
            places={featuredPlaces.length ? featuredPlaces : places}
          />
        </div>
        <div className="space-y-4">
          <Card className="glass-panel border-border/70">
            <CardHeader>
              <CardTitle>Cluster mini-map</CardTitle>
              <CardDescription>
                Struktur ini langsung selaras dengan brief riset Tarutung.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {routeClusters.map((cluster) => (
                <div
                  key={cluster.name}
                  className="rounded-2xl border border-border/70 bg-background/70 p-4"
                >
                  <div className="font-medium">{cluster.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cluster.summary}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="glass-panel border-border/70">
            <CardHeader>
              <CardTitle>Environment keys</CardTitle>
              <CardDescription>
                Isi file <code>.env.local</code> agar data bergerak dari Notion.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input readOnly value="NOTION_TOKEN=" />
              <Input readOnly value="NOTION_DATA_SOURCE_ID=" />
              <Input readOnly value="NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="space-y-2 pb-6">
          <Badge variant="secondary">Notion + shadcn/ui</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured places dari Notion atau fallback lokal
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Saat token dan database ID belum diisi, halaman ini tetap hidup
            memakai data awal hasil riset Tarutung. Begitu env tersedia, data
            akan berpindah ke Notion tanpa mengganti komponen UI.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredPlaces.map((place) => {
            const meta = categoryMeta[place.category];
            return (
              <Card key={place.slug} className="glass-panel border-border/70">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className="border-current/20"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </Badge>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {place.cluster}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <CardTitle>{place.title}</CardTitle>
                    <CardDescription>{place.summary}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                  </span>
                  <span className="font-medium text-primary">
                    {place.source.toUpperCase()}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-4 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <Card className="glass-panel border-border/70">
          <CardHeader>
            <CardTitle>Stack yang sudah aktif</CardTitle>
            <CardDescription>
              Semua ini sudah wired dan siap dikembangkan.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {platformChecklist.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-panel border-border/70">
          <CardHeader>
            <CardTitle>Status koneksi content layer</CardTitle>
            <CardDescription>
              Komponen server sekarang membaca env dan memutuskan apakah source
              data berasal dari Notion atau fallback starter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Database className="size-4 text-primary" />
              <span>
                Notion configured:{" "}
                <strong className="text-foreground">
                  {notionConfigured ? "yes" : "no"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Landmark className="size-4 text-primary" />
              <span>API publik tersedia di <code>/api/places</code>.</span>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="size-4 text-primary" />
              <span>Three.js dipakai untuk hero scene client-side.</span>
            </div>
            <div className="flex items-center gap-3">
              <Church className="size-4 text-primary" />
              <span>
                Struktur cluster dan POI awal mengikuti brief riset Tarutung.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="size-4 text-primary" />
              <span>
                Data kuliner dan destinasi bisa dipindahkan penuh ke Notion
                tanpa mengubah layout section.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
