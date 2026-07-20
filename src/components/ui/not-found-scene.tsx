"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import {
  ArrowRight,
  Compass,
  Home,
  Landmark,
  MapPin,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import styles from "./not-found.module.css";
import { fallbackPlaces } from "@/lib/tarutung-data";

function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Kembali ke Beranda">
      <Landmark aria-hidden="true" />
      <span>
        <strong>SUBANG</strong>
        <small>360</small>
      </span>
    </Link>
  );
}

export function NotFoundScene() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const popularPlaces = [
    { title: "Ciater Hot Spring", slug: "ciater-hot-spring", category: "Pemandian Air Panas" },
    { title: "Curug Cileat", slug: "curug-cileat", category: "Air Terjun" },
    { title: "Pantai Cirewang", slug: "pantai-cirewang", category: "Pesisir Mangrove" },
    { title: "Salib Kasih Tarutung", slug: "salib-kasih", category: "Wisata Rohani" },
  ];

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#061713", 0.035);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Three.js ambient particles field
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: "#e2c88f",
      size: 0.11,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 3D Geometric Ring Mesh
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const torusGeo = new THREE.TorusGeometry(3.5, 0.06, 16, 90);
    const torusMat = new THREE.MeshBasicMaterial({
      color: "#c7a25b",
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    ringGroup.add(torusMesh);

    const icoGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: "#e2c88f",
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    ringGroup.add(icoMesh);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) / 120;
      mouseY = (event.clientY - windowHalfY) / 120;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      ringGroup.rotation.x = elapsed * 0.18 + mouseY * 0.4;
      ringGroup.rotation.y = elapsed * 0.25 + mouseX * 0.4;

      particles.rotation.y = elapsed * 0.03;

      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geometry.dispose();
      particleMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jelajahi?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/jelajahi");
    }
  };

  const handleRandomDestination = () => {
    const randomIndex = Math.floor(Math.random() * fallbackPlaces.length);
    const randomPlace = fallbackPlaces[randomIndex];
    router.push(`/jelajahi?place=${randomPlace.slug}`);
  };

  return (
    <div className={styles.page}>
      <div ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.heroShade} aria-hidden="true" />

      <header className={styles.header}>
        <Brand />
        <nav className={styles.headerNav} aria-label="Navigasi 404">
          <Link href="/">Beranda</Link>
          <Link href="/jelajahi">Jelajahi 360</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.eyebrow}>
          <Sparkles size={14} aria-hidden="true" />
          Subang 360 &bull; Halaman Tidak Ditemukan
        </div>

        <h1 className={styles.number404}>404</h1>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Jalur Perjalanan Tidak Ditemukan</h2>
          <p className={styles.cardDescription}>
            Halaman yang Anda tuju mungkin telah dipindahkan atau belum terpetakan.
            Mari temukan keindahan pegunungan, pesisir, dan destinasi pilihan bersama Subang 360.
          </p>

          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                id="not-found-search-input"
                className={styles.searchInput}
                placeholder="Cari destinasi pilihan... (misal: Ciater, Curug, Pantai Cirewang)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari destinasi di Subang 360"
              />
              <button
                type="submit"
                id="not-found-search-button"
                className={styles.searchButton}
              >
                Cari <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className={styles.actionsGroup}>
            <Link href="/" id="not-found-btn-home" className={styles.primaryButton}>
              <Home size={17} aria-hidden="true" />
              Kembali ke Beranda
            </Link>
            <Link href="/jelajahi" id="not-found-btn-explore" className={styles.secondaryButton}>
              <Compass size={17} aria-hidden="true" />
              Masuk ke Subang 360
            </Link>
            <button
              type="button"
              id="not-found-btn-random"
              onClick={handleRandomDestination}
              className={styles.textLink}
            >
              <RefreshCw size={15} aria-hidden="true" />
              Coba Destinasi Acak
            </button>
          </div>

          <div className={styles.destinationsSection}>
            <div className={styles.eyebrow} style={{ margin: 0 }}>
              Destinasi Pilihan
            </div>
            <div className={styles.destinationsGrid}>
              {popularPlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/jelajahi?place=${place.slug}`}
                  id={`not-found-chip-${place.slug}`}
                  className={styles.destinationChip}
                >
                  <span className={styles.chipTitle}>
                    <Compass size={14} aria-hidden="true" />
                    {place.title}
                  </span>
                  <span className={styles.chipCategory}>{place.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Brand />
          <p>Platform untuk menjelajahi wisata, kuliner, budaya, dan pengalaman interaktif.</p>
          <a href="/jelajahi" aria-label="Bagikan pengalaman Subang 360">
            <Share2 aria-hidden="true" />
          </a>
        </div>
        <div>
          <h3>Jelajahi</h3>
          <Link href="/">Beranda</Link>
          <Link href="/jelajahi">Subang 360</Link>
        </div>
        <div>
          <h3>Informasi</h3>
          <Link href="/jelajahi">Destinasi Populer</Link>
          <Link href="/jelajahi">Rencana Perjalanan</Link>
        </div>
        <div>
          <h3>Lokasi</h3>
          <p>
            <MapPin aria-hidden="true" />
            Kabupaten Subang
            <br />
            Jawa Barat, Indonesia
          </p>
        </div>
        <small>&copy; 2026 Subang 360. Seluruh hak dilindungi.</small>
      </footer>
    </div>
  );
}
