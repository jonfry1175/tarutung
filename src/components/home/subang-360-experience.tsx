"use client";

import Image from "next/image";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Drama,
  Heart,
  Languages,
  Landmark,
  LoaderCircle,
  MapPin,
  Mountain,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Star,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Subang360Scene } from "@/components/scene/subang-360-scene";
import { createClient } from "@/lib/supabase/client";
import {
  categoryMeta,
  subangPlaces,
  subangScenes,
  type SubangCategory,
  type MarkerKeyframe,
  type SubangSceneId,
} from "@/lib/subang-data";

type BrowseMode = "all" | SubangCategory | "favorites" | "plan";

const VISITED_KEY = "subang360:visited";
const PENDING_SAVE_KEY = "subang360:pending-save";

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

function getMarkerPosition(track: MarkerKeyframe[], time: number) {
  if (track.length === 1 || time <= track[0].time) return track[0];

  const nextIndex = track.findIndex((keyframe) => keyframe.time >= time);
  if (nextIndex === -1) return track[track.length - 1];

  const previous = track[nextIndex - 1];
  const next = track[nextIndex];
  const progress = (time - previous.time) / Math.max(0.001, next.time - previous.time);

  return {
    time,
    x: previous.x + (next.x - previous.x) * progress,
    y: previous.y + (next.y - previous.y) * progress,
  };
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
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<BrowseMode>("all");
  const [activeSceneId, setActiveSceneId] = useState<SubangSceneId>("ciater");
  const [playbackTime, setPlaybackTime] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [saveBusyId, setSaveBusyId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setVisited(readStoredIds(VISITED_KEY));

      if (new URLSearchParams(window.location.search).get("auth") === "error") {
        setFeedback("Login Google belum berhasil. Silakan coba lagi.");
        setAuthModalOpen(true);
      }
    });

    void supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      const nextUserId = data.user?.id ?? null;
      setUserId(nextUserId);
      if (!nextUserId) setFavorites(new Set());
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
      const nextUserId = session?.user.id ?? null;
      setUserId(nextUserId);
      if (!nextUserId) setFavorites(new Set());
      },
    );

    return () => {
      window.cancelAnimationFrame(frameId);
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!userId) return;

    const authenticatedUserId = userId;
    let active = true;

    async function loadSavedPlaces() {
      const pendingPlaceId = window.sessionStorage.getItem(PENDING_SAVE_KEY);

      if (pendingPlaceId && subangPlaces.some((place) => place.id === pendingPlaceId)) {
        const { error } = await supabase
          .from("saved_places")
          .upsert({ user_id: authenticatedUserId, place_id: pendingPlaceId });

        if (!error) window.sessionStorage.removeItem(PENDING_SAVE_KEY);
      }

      const { data, error } = await supabase
        .from("saved_places")
        .select("place_id")
        .eq("user_id", authenticatedUserId);

      if (!active) return;

      if (error) {
        setFeedback("Destinasi tersimpan belum dapat dimuat.");
        return;
      }

      setFavorites(new Set(data.map((row: { place_id: string }) => row.place_id)));
    }

    void loadSavedPlaces();
    return () => {
      active = false;
    };
  }, [supabase, userId]);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((enabled) => !enabled);
  }, []);

  const filteredPlaces = useMemo(() => {
    if (mode === "favorites" || mode === "plan") {
      return subangPlaces.filter((place) => favorites.has(place.id));
    }
    if (mode === "all") return subangPlaces;
    return subangPlaces.filter((place) => place.category === mode);
  }, [favorites, mode]);

  const selectedPlace = subangPlaces.find((place) => place.id === selectedId);
  const activeScene = subangScenes.find((scene) => scene.id === activeSceneId) ?? subangScenes[0];
  const visiblePlaces = filteredPlaces.filter((place) => place.sceneId === activeSceneId);

  const setScene = useCallback((sceneId: SubangSceneId) => {
    setMode("all");
    setSelectedId(null);
    setPlaybackTime(0);
    setActiveSceneId(sceneId);
  }, []);

  const stepScene = useCallback((direction: number) => {
    const currentIndex = subangScenes.findIndex((scene) => scene.id === activeSceneId);
    const nextIndex = (currentIndex + direction + subangScenes.length) % subangScenes.length;
    setScene(subangScenes[nextIndex].id);
  }, [activeSceneId, setScene]);

  const handlePlaybackTimeChange = useCallback((time: number) => {
    setPlaybackTime(time);
  }, []);

  const openPlace = useCallback((id: string) => {
    setSelectedId(id);
    setVisited((current) => {
      const next = new Set(current).add(id);
      window.localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    if (!userId) {
      window.sessionStorage.setItem(PENDING_SAVE_KEY, id);
      setFeedback(null);
      setAuthModalOpen(true);
      return;
    }

    const removing = favorites.has(id);
    const previous = new Set(favorites);
    const next = new Set(favorites);
    if (removing) next.delete(id);
    else next.add(id);

    setFavorites(next);
    setSaveBusyId(id);
    setFeedback(null);

    const { error } = removing
      ? await supabase
          .from("saved_places")
          .delete()
          .eq("user_id", userId)
          .eq("place_id", id)
      : await supabase.from("saved_places").insert({ user_id: userId, place_id: id });

    if (error) {
      setFavorites(previous);
      setFeedback("Perubahan belum tersimpan. Silakan coba lagi.");
    }
    setSaveBusyId(null);
  }, [favorites, supabase, userId]);

  const continueWithGoogle = useCallback(async () => {
    setAuthBusy(true);
    setFeedback(null);

    const next = `${window.location.pathname}${window.location.search}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setFeedback("Login Google belum tersedia. Silakan coba lagi.");
      setAuthBusy(false);
    }
  }, [supabase]);

  const closeAuthModal = useCallback(() => {
    window.sessionStorage.removeItem(PENDING_SAVE_KEY);
    setAuthModalOpen(false);
    setAuthBusy(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) {
        return;
      }
      if (event.key === "Escape") {
        if (authModalOpen) closeAuthModal();
        else setSelectedId(null);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepScene(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepScene(-1);
      }
      if (event.key === " " && target?.tagName !== "BUTTON") {
        event.preventDefault();
        setVideoPaused((paused) => !paused);
      }
      if (event.key === "0") setRestartSignal((value) => value + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [authModalOpen, closeAuthModal, stepScene]);

  const setBrowseMode = (nextMode: BrowseMode) => {
    setMode(nextMode);
    setSelectedId(null);
    const matchingPlace = nextMode === "all"
      ? undefined
      : nextMode === "favorites" || nextMode === "plan"
        ? subangPlaces.find((place) => favorites.has(place.id))
        : subangPlaces.find((place) => place.category === nextMode);
    if (matchingPlace) {
      setPlaybackTime(0);
      setActiveSceneId(matchingPlace.sceneId);
    }
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
        <Subang360Scene
          scene={activeScene}
          muted={!audioEnabled}
          paused={videoPaused || Boolean(selectedPlace)}
          restartSignal={restartSignal}
          onPlaybackTimeChange={handlePlaybackTimeChange}
        >
          <div className="subang360-shade" aria-hidden="true" />
          <div className="subang360-hotspots" aria-label="Destinasi pada video">
            {visiblePlaces.map((place) => {
              const Icon = categoryIcons[place.category];
              const meta = categoryMeta[place.category];
              const active = selectedId === place.id;
              const position = getMarkerPosition(place.markerTrack, playbackTime);
              return (
                <button
                  type="button"
                  key={place.id}
                  className={`subang360-hotspot ${active ? "is-active" : ""}`}
                  style={
                    {
                      "--hotspot-x": `${position.x}%`,
                      "--hotspot-y": `${position.y}%`,
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
        </Subang360Scene>

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
          <p>{activeScene.subtitle}</p>
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

        {filteredPlaces.length === 0 && (
          <div className="subang360-empty">
            <Heart aria-hidden="true" />
            <p>Belum ada destinasi tersimpan.</p>
            <button type="button" onClick={() => setBrowseMode("all")}>Jelajahi destinasi</button>
          </div>
        )}

        <nav className="subang360-chapters" aria-label="Chapter Subang">
          {subangScenes.map((scene, index) => (
            <button
              type="button"
              key={scene.id}
              className={scene.id === activeSceneId ? "is-active" : undefined}
              onClick={() => setScene(scene.id)}
              aria-current={scene.id === activeSceneId ? "true" : undefined}
              title={scene.label}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{scene.shortLabel}</strong>
            </button>
          ))}
        </nav>

        <div className="subang360-view-controls" aria-label="Kontrol video">
          <button
            type="button"
            onClick={() => setRestartSignal((value) => value + 1)}
            title="Putar dari awal (0)"
            aria-label="Putar video dari awal"
          >
            <RotateCcw />
          </button>
          <button
            type="button"
            onClick={() => stepScene(-1)}
            title="Chapter sebelumnya"
            aria-label="Chapter sebelumnya"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => setVideoPaused((paused) => !paused)}
            title={videoPaused ? "Putar video" : "Jeda video"}
            aria-label={videoPaused ? "Putar video" : "Jeda video"}
            aria-pressed={videoPaused}
          >
            {videoPaused ? <Play /> : <Pause />}
          </button>
          <button
            type="button"
            onClick={() => stepScene(1)}
            title="Chapter berikutnya"
            aria-label="Chapter berikutnya"
          >
            <ChevronRight />
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
                  onClick={() => void toggleFavorite(selectedPlace.id)}
                  disabled={saveBusyId === selectedPlace.id}
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
                  onClick={() => void toggleFavorite(selectedPlace.id)}
                  disabled={saveBusyId === selectedPlace.id}
                  className={favorites.has(selectedPlace.id) ? "is-saved" : undefined}
                >
                  {saveBusyId === selectedPlace.id
                    ? <LoaderCircle className="subang360-spin" />
                    : favorites.has(selectedPlace.id) ? <Check /> : <Bookmark />}
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

      {feedback && !authModalOpen && (
        <div className="subang360-feedback" role="status">
          <span>{feedback}</span>
          <button type="button" onClick={() => setFeedback(null)} aria-label="Tutup pesan">
            <X />
          </button>
        </div>
      )}

      {authModalOpen && (
        <div className="subang360-auth-backdrop" role="presentation" onMouseDown={closeAuthModal}>
          <section
            className="subang360-auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="subang360-auth-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="subang360-auth-close"
              onClick={closeAuthModal}
              aria-label="Tutup login"
            >
              <X />
            </button>
            <span className="subang360-auth-mark"><Bookmark aria-hidden="true" /></span>
            <h2 id="subang360-auth-title">Simpan perjalananmu</h2>
            <p>Masuk agar destinasi pilihanmu tetap tersimpan di perangkat mana pun.</p>
            <button
              type="button"
              className="subang360-google-button"
              onClick={() => void continueWithGoogle()}
              disabled={authBusy}
            >
              {authBusy ? <LoaderCircle className="subang360-spin" /> : <span aria-hidden="true">G</span>}
              Lanjutkan dengan Google
            </button>
            {feedback && <p className="subang360-auth-error" role="alert">{feedback}</p>}
          </section>
        </div>
      )}
    </main>
  );
}
