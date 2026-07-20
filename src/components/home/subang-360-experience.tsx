"use client";

import Image from "next/image";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  Bookmark,
  Check,
  Compass,
  Drama,
  Hand,
  Heart,
  Landmark,
  LoaderCircle,
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
import { createClient } from "@/lib/supabase/client";
import {
  categoryMeta,
  subangPlaces,
  type SubangCategory,
} from "@/lib/subang-data";

type BrowseMode = "all" | SubangCategory | "favorites" | "plan";

const VISITED_KEY = "subang360:visited";
const PENDING_SAVE_KEY = "subang360:pending-save";

const panoramaPositions: Record<string, { x: number; y: number }> = {
  "kebun-teh-ciater": { x: 27, y: 34 },
  "curug-cileat": { x: 38, y: 50 },
  sisingaan: { x: 66, y: 52 },
  "nanas-subang": { x: 48, y: 43 },
  "pantai-cirewang": { x: 72, y: 31 },
  "curug-cibareubeuy": { x: 20, y: 28 },
  "museum-subang": { x: 58, y: 60 },
  "rumah-makan-mang-yeye": { x: 55, y: 38 },
};

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
  const supabase = useMemo(() => createClient(), []);
  const soundtrackRef = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState<BrowseMode>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [saveBusyId, setSaveBusyId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [zoomSignal, setZoomSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const requestedPlace = params.get("place");
      const deepLinkedPlace = subangPlaces.find((place) => place.id === requestedPlace);
      const storedVisited = readStoredIds(VISITED_KEY);

      if (deepLinkedPlace) {
        storedVisited.add(deepLinkedPlace.id);
        window.localStorage.setItem(VISITED_KEY, JSON.stringify([...storedVisited]));
        setSelectedId(deepLinkedPlace.id);
      }

      setVisited(storedVisited);

      if (params.get("auth") === "error") {
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

  const toggleAudio = useCallback(async () => {
    const soundtrack = soundtrackRef.current;
    if (!soundtrack) return;

    if (!soundtrack.paused) {
      soundtrack.pause();
      setAudioEnabled(false);
      return;
    }

    soundtrack.volume = 0.45;
    try {
      await soundtrack.play();
      setAudioEnabled(true);
    } catch {
      setAudioEnabled(false);
    }
  }, []);

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
  }, [authModalOpen, closeAuthModal]);

  const setBrowseMode = (nextMode: BrowseMode) => {
    setMode(nextMode);
    setSelectedId(null);
  };

  return (
    <main className="subang360-shell">
      <audio
        ref={soundtrackRef}
        src="/sounds/subang-360-soundtrack.mp3"
        loop
        preload="auto"
        onPause={() => setAudioEnabled(false)}
        onPlay={() => setAudioEnabled(true)}
      />
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

        <div className="subang360-hotspots" aria-label="Destinasi pada panorama">
          {filteredPlaces.map((place) => {
            const Icon = categoryIcons[place.category];
            const meta = categoryMeta[place.category];
            const active = selectedId === place.id;
            const position = panoramaPositions[place.id] ?? place.markerTrack[0];
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

        <header className="subang360-mobile-header">
          <LogoMark compact />
          <div className="subang360-mobile-actions">
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
            <span className="subang360-auth-accent" aria-hidden="true" />
            <h2 id="subang360-auth-title">Simpan perjalananmu</h2>
            <p>Masuk agar destinasi pilihanmu tetap tersimpan di perangkat mana pun.</p>
            <button
              type="button"
              className="subang360-google-button"
              onClick={() => void continueWithGoogle()}
              disabled={authBusy}
            >
              {authBusy ? (
                <LoaderCircle className="subang360-spin" />
              ) : (
                <svg className="subang360-google-mark" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285f4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-1.99 3.02v2.55h3.23c1.89-1.74 2.98-4.3 2.98-7.42Z" />
                  <path fill="#34a853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.55c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.07v2.63A10 10 0 0 0 12 22Z" />
                  <path fill="#fbbc05" d="M6.4 13.87A6 6 0 0 1 6.09 12c0-.65.11-1.28.31-1.87V7.5H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.5l3.33-2.63Z" />
                  <path fill="#ea4335" d="M12 6.01c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.33 2.63C7.19 7.77 9.4 6.01 12 6.01Z" />
                </svg>
              )}
              Lanjutkan dengan Google
            </button>
            <p className="subang360-auth-note">Destinasi tersimpan akan mengikuti akunmu.</p>
            {feedback && <p className="subang360-auth-error" role="alert">{feedback}</p>}
          </section>
        </div>
      )}
    </main>
  );
}
