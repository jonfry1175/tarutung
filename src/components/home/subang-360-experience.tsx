"use client";

import Image from "next/image";
import {
  Bookmark,
  Check,
  ChevronDown,
  Compass,
  Drama,
  Hand,
  Heart,
  Languages,
  Landmark,
  MapPin,
  Minus,
  Mountain,
  Mouse,
  Navigation,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Star,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Subang360Scene } from "@/components/scene/subang-360-scene";
import {
  categoryMeta,
  subangPlaces,
  type SubangCategory,
} from "@/lib/subang-data";

type BrowseMode = "all" | SubangCategory | "favorites" | "plan";

const FAVORITES_KEY = "subang360:favorites";
const VISITED_KEY = "subang360:visited";

const categoryIcons: Record<
  SubangCategory,
  ComponentType<{ className?: string }>
> = {
  wisata: Mountain,
  kuliner: UtensilsCrossed,
  budaya: Drama,
};

const primaryNavigation: Array<{
  id: BrowseMode;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { id: "all", label: "Jelajahi", icon: Compass },
  { id: "wisata", label: "Wisata", icon: Mountain },
  { id: "kuliner", label: "Kuliner", icon: UtensilsCrossed },
  { id: "budaya", label: "Budaya", icon: Drama },
];

function readStoredIds(key: string) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return new Set<string>(Array.isArray(value) ? value : []);
  } catch {
    return new Set<string>();
  }
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "subang360-logo is-compact" : "subang360-logo"}>
      <Landmark className="subang360-logo-icon" aria-hidden="true" />
      <span>SUBANG</span>
      <span>360</span>
    </div>
  );
}

export function Subang360Experience() {
  const [mode, setMode] = useState<BrowseMode>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [zoomSignal, setZoomSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<AudioNode[]>([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setFavorites(readStoredIds(FAVORITES_KEY));
      setVisited(readStoredIds(VISITED_KEY));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const stopAudio = useCallback(() => {
    for (const node of audioNodesRef.current) {
      if ("stop" in node) {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {
          // The node may already have stopped during a rapid toggle.
        }
      }
      node.disconnect();
    }
    audioNodesRef.current = [];
    void audioContextRef.current?.close();
    audioContextRef.current = null;
    setAudioEnabled(false);
  }, []);

  useEffect(() => stopAudio, [stopAudio]);

  const toggleAudio = useCallback(async () => {
    if (audioEnabled) {
      stopAudio();
      return;
    }

    const AudioContextClass =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.045;
    master.connect(context.destination);

    const hum = context.createOscillator();
    const humGain = context.createGain();
    hum.type = "sine";
    hum.frequency.value = 174;
    humGain.gain.value = 0.18;
    hum.connect(humGain).connect(master);

    const noiseBuffer = context.createBuffer(
      1,
      context.sampleRate * 2,
      context.sampleRate,
    );
    const channel = noiseBuffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = Math.random() * 2 - 1;
    }
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 580;
    noiseGain.gain.value = 0.12;
    noise.connect(filter).connect(noiseGain).connect(master);

    hum.start();
    noise.start();
    await context.resume();
    audioContextRef.current = context;
    audioNodesRef.current = [hum, humGain, noise, filter, noiseGain, master];
    setAudioEnabled(true);
  }, [audioEnabled, stopAudio]);

  const filteredPlaces = useMemo(() => {
    if (mode === "favorites" || mode === "plan") {
      return subangPlaces.filter((place) => favorites.has(place.id));
    }
    if (mode === "all") return subangPlaces;
    return subangPlaces.filter((place) => place.category === mode);
  }, [favorites, mode]);

  const selectedPlace = subangPlaces.find((place) => place.id === selectedId);

  const openPlace = useCallback((id: string) => {
    setSelectedId(id);
    setVisited((current) => {
      const next = new Set(current).add(id);
      window.localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) {
        return;
      }
      if (event.key === "Escape") setSelectedId(null);
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoomSignal((value) => value + 1);
      }
      if (event.key === "-") {
        event.preventDefault();
        setZoomSignal((value) => value - 1);
      }
      if (event.key === "0") setResetSignal((value) => value + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setBrowseMode = (nextMode: BrowseMode) => {
    setMode(nextMode);
    setSelectedId(null);
  };

  return (
    <main className="subang360-shell">
      <aside className="subang360-sidebar" aria-label="Navigasi utama">
        <LogoMark />
        <nav className="subang360-nav">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={mode === item.id ? "is-active" : undefined}
                onClick={() => setBrowseMode(item.id)}
                aria-pressed={mode === item.id}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <nav className="subang360-nav subang360-nav-secondary">
          <button
            type="button"
            className={mode === "favorites" ? "is-active" : undefined}
            onClick={() => setBrowseMode("favorites")}
            aria-pressed={mode === "favorites"}
          >
            <Heart aria-hidden="true" />
            <span>Favorit</span>
          </button>
          <button
            type="button"
            className={mode === "plan" ? "is-active" : undefined}
            onClick={() => setBrowseMode("plan")}
            aria-pressed={mode === "plan"}
          >
            <Bookmark aria-hidden="true" />
            <span>Rencana</span>
          </button>
        </nav>

        <div className="subang360-progress" aria-label={`${visited.size} destinasi dijelajahi`}>
          <div className="subang360-progress-copy">
            <span className="subang360-progress-star"><Star aria-hidden="true" /></span>
            <span><strong>{visited.size} / {subangPlaces.length}</strong> dijelajahi</span>
          </div>
          <span className="subang360-progress-track" aria-hidden="true">
            <span style={{ width: `${(visited.size / subangPlaces.length) * 100}%` }} />
          </span>
        </div>
      </aside>

      <section className="subang360-stage" aria-label="Panorama interaktif Subang">
        <Subang360Scene zoomSignal={zoomSignal} resetSignal={resetSignal} />
        <div className="subang360-shade" aria-hidden="true" />

        <header className="subang360-mobile-header">
          <LogoMark compact />
          <div className="subang360-mobile-actions">
            <button type="button" title="Pilih bahasa" aria-label="Pilih bahasa">
              <Languages />
              <span>ID</span>
            </button>
            <button
              type="button"
              onClick={toggleAudio}
              title={audioEnabled ? "Matikan audio" : "Aktifkan audio suasana"}
              aria-label={audioEnabled ? "Matikan audio" : "Aktifkan audio suasana"}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? <Volume2 /> : <VolumeX />}
            </button>
          </div>
        </header>

        <div className="subang360-title-block">
          <h1>SUBANG 360</h1>
          <p>Dari Pegunungan ke Pesisir</p>
          <span aria-hidden="true">◇</span>
        </div>

        <div className="subang360-top-controls">
          <button type="button" title="Pilih bahasa" aria-label="Pilih bahasa">
            <Languages aria-hidden="true" />
            <span>ID</span>
            <ChevronDown aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleAudio}
            title={audioEnabled ? "Matikan audio" : "Aktifkan audio suasana"}
            aria-label={audioEnabled ? "Matikan audio" : "Aktifkan audio suasana"}
            aria-pressed={audioEnabled}
          >
            {audioEnabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          </button>
        </div>

        <div className="subang360-mode-label" aria-live="polite">
          <SlidersHorizontal aria-hidden="true" />
          <span>
            {mode === "all"
              ? "Semua destinasi"
              : mode === "favorites"
                ? "Destinasi favorit"
                : mode === "plan"
                  ? "Rencana perjalanan"
                  : categoryMeta[mode].label}
          </span>
          <strong>{filteredPlaces.length}</strong>
        </div>

        <div className="subang360-hotspots" aria-label="Destinasi pada panorama">
          {filteredPlaces.map((place) => {
            const Icon = categoryIcons[place.category];
            const meta = categoryMeta[place.category];
            const active = selectedId === place.id;
            return (
              <button
                type="button"
                key={place.id}
                className={`subang360-hotspot ${active ? "is-active" : ""}`}
                style={
                  {
                    "--hotspot-x": `${place.position.x}%`,
                    "--hotspot-y": `${place.position.y}%`,
                    "--hotspot-color": meta.color,
                  } as CSSProperties
                }
                onClick={() => openPlace(place.id)}
                aria-label={`Buka detail ${place.title}`}
                aria-pressed={active}
              >
                <span className="subang360-hotspot-icon"><Icon aria-hidden="true" /></span>
                {(place.featured || active) && (
                  <span className="subang360-hotspot-label">{place.label ?? place.title}</span>
                )}
                <span className="subang360-hotspot-stem" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="subang360-empty">
            <Heart aria-hidden="true" />
            <p>Belum ada destinasi tersimpan.</p>
            <button type="button" onClick={() => setBrowseMode("all")}>Jelajahi destinasi</button>
          </div>
        )}

        <div className="subang360-instructions" aria-hidden="true">
          <span><Hand /> Geser untuk menjelajah</span>
          <span><Mouse /> Scroll untuk zoom</span>
          <span><Compass /> Klik ikon untuk detail</span>
        </div>

        <div className="subang360-view-controls" aria-label="Kontrol panorama">
          <button
            type="button"
            onClick={() => setResetSignal((value) => value + 1)}
            title="Reset pandangan (0)"
            aria-label="Reset pandangan"
          >
            <RotateCcw />
          </button>
          <button
            type="button"
            onClick={() => setZoomSignal((value) => value + 1)}
            title="Perbesar (+)"
            aria-label="Perbesar"
          >
            <Plus />
          </button>
          <button
            type="button"
            onClick={() => setZoomSignal((value) => value - 1)}
            title="Perkecil (-)"
            aria-label="Perkecil"
          >
            <Minus />
          </button>
        </div>

        <nav className="subang360-category-dock" aria-label="Kategori destinasi">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={mode === item.id ? "is-active" : undefined}
                onClick={() => setBrowseMode(item.id)}
                aria-label={item.label}
                aria-pressed={mode === item.id}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            className={mode === "favorites" ? "is-active" : undefined}
            onClick={() => setBrowseMode("favorites")}
            aria-label="Favorit"
            aria-pressed={mode === "favorites"}
          >
            <Heart aria-hidden="true" />
            <span>Favorit</span>
          </button>
        </nav>

        {selectedPlace && (
          <aside className="subang360-detail" aria-label={`Detail ${selectedPlace.title}`}>
            <div className="subang360-detail-image">
              <Image
                src={selectedPlace.image}
                alt={selectedPlace.title}
                fill
                sizes="(max-width: 767px) 100vw, 420px"
                priority={false}
              />
              <button
                type="button"
                className="subang360-detail-close"
                onClick={() => setSelectedId(null)}
                title="Tutup detail"
                aria-label="Tutup detail"
              >
                <X />
              </button>
            </div>
            <div className="subang360-detail-body">
              <div className="subang360-sheet-handle" aria-hidden="true" />
              <div className="subang360-detail-heading">
                <span
                  className="subang360-detail-category"
                  style={{ backgroundColor: categoryMeta[selectedPlace.category].color }}
                >
                  {(() => {
                    const Icon = categoryIcons[selectedPlace.category];
                    return <Icon aria-hidden="true" />;
                  })()}
                </span>
                <div>
                  <p>{categoryMeta[selectedPlace.category].label}</p>
                  <h2>{selectedPlace.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(selectedPlace.id)}
                  className={favorites.has(selectedPlace.id) ? "is-active" : undefined}
                  title={favorites.has(selectedPlace.id) ? "Hapus dari favorit" : "Simpan ke favorit"}
                  aria-label={favorites.has(selectedPlace.id) ? "Hapus dari favorit" : "Simpan ke favorit"}
                  aria-pressed={favorites.has(selectedPlace.id)}
                >
                  <Heart fill={favorites.has(selectedPlace.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="subang360-detail-summary">{selectedPlace.description}</p>
              <p className="subang360-detail-location"><MapPin aria-hidden="true" />{selectedPlace.location}</p>
              <div className="subang360-tags">
                {selectedPlace.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="subang360-detail-actions">
                <button
                  type="button"
                  onClick={() => toggleFavorite(selectedPlace.id)}
                  className={favorites.has(selectedPlace.id) ? "is-saved" : undefined}
                >
                  {favorites.has(selectedPlace.id) ? <Check /> : <Bookmark />}
                  {favorites.has(selectedPlace.id) ? "Tersimpan" : "Simpan"}
                </button>
                <a href={selectedPlace.mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation aria-hidden="true" /> Rute
                </a>
              </div>
            </div>
          </aside>
        )}
      </section>
    </main>
  );
}
