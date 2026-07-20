"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Landmark, Sparkles } from "lucide-react";

import styles from "./loading-screen.module.css";

const DESTINATION_CAPTIONS = [
  "Menelusuri Pegunungan Ciater & Perkebunan Teh...",
  "Merasakan Kesegaran Air Terjun Curug Cileat...",
  "Menikmati Keharuman & Manisnya Nanas Subang...",
  "Menyelami Tradisi Kesenian Sisingaan khas Sunda...",
  "Menyambut Keindahan Pesisir & Mangrove Cirewang...",
];

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check if session has already seen loading screen
  const isFastLoad = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const hasVisited = sessionStorage.getItem("subang_360_preloaded");
        if (hasVisited === "true") {
          isFastLoad.current = true;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Finish preloader animation sequence
  const triggerExit = useCallback(() => {
    if (isExiting || isDismissed) return;
    setIsExiting(true);

    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("subang_360_preloaded", "true");
      }
    } catch {
      // Ignore storage errors
    }

    setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
    }, 750);
  }, [isExiting, isDismissed, onComplete]);

  // Progress simulation algorithm
  useEffect(() => {
    if (isDismissed) return;

    const targetDuration = isFastLoad.current ? 600 : 2200;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawRatio = Math.min(1, elapsed / targetDuration);
      // Smooth cubic-bezier simulation easing
      const easedRatio = 1 - Math.pow(1 - rawRatio, 3);
      const currentProgress = Math.min(100, Math.round(easedRatio * 100));

      setProgress(currentProgress);

      if (rawRatio >= 1) {
        clearInterval(interval);
        setTimeout(triggerExit, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isDismissed, triggerExit]);

  // Caption rotation interval
  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % DESTINATION_CAPTIONS.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isDismissed]);

  // Ambient Canvas Particle Animation (Floating Mist & Sparkles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isDismissed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create 45 ambient floating particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      color: Math.random() > 0.4 ? "#d2ae66" : "#2f6d5c",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDismissed]);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`${styles.loadingOverlay} ${isExiting ? styles.exiting : ""}`}
      role="dialog"
      aria-label="Memuat Subang 360"
      aria-busy={progress < 100}
    >
      {/* Background canvas and glow effects */}
      <canvas ref={canvasRef} className={styles.bgCanvas} aria-hidden="true" />
      <div className={styles.ambientGlow1} aria-hidden="true" />
      <div className={styles.ambientGlow2} aria-hidden="true" />

      {/* Split curtain exit panels */}
      <div className={styles.curtainTop} aria-hidden="true" />
      <div className={styles.curtainBottom} aria-hidden="true" />

      {/* Top Header Controls */}
      <header className={styles.topBar}>
        <div className={styles.brandBadge}>
          <Landmark aria-hidden="true" />
          <span>SUBANG 360</span>
        </div>
        <button
          className={styles.skipButton}
          onClick={triggerExit}
          type="button"
          aria-label="Lewati loading screen"
        >
          <span>Lewati</span>
          <ArrowRight aria-hidden="true" />
        </button>
      </header>

      {/* Center Visual & Title Section */}
      <main className={styles.centerSection}>
        <div className={styles.emblemWrapper}>
          <div className={styles.emblemRingOuter} aria-hidden="true" />
          <div className={styles.emblemRingInner} aria-hidden="true" />
          <Landmark className={styles.emblemIcon} aria-hidden="true" />
        </div>

        <h1 className={styles.mainTitle}>
          <span>Subang 360</span>
        </h1>
        <p className={styles.tagline}>Dari Pegunungan ke Pesisir</p>

        <div className={styles.captionBox} aria-live="polite">
          <div key={captionIndex} className={styles.captionText}>
            <Sparkles style={{ display: "inline-block", width: 14, height: 14, marginRight: 6, verticalAlign: "-2px" }} />
            {DESTINATION_CAPTIONS[captionIndex]}
          </div>
        </div>
      </main>

      {/* Bottom Progress Section */}
      <footer className={styles.bottomSection}>
        <div className={styles.counterRow}>
          <span className={styles.loadingLabel}>MEMUAT PENGALAMAN...</span>
          <span className={styles.counterDisplay}>
            {progress}
            <small>%</small>
          </span>
        </div>

        <div className={styles.trackOuter} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.trackFill} style={{ width: `${progress}%` }} />
          <div className={styles.trackShimmer} aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}
