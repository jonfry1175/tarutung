"use client";

import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function LandingHeroMedia() {
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setAllowMotion(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!allowMotion) return null;

  return (
    <video
      className="landing-hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/subang/video-posters/subang-hero-montage.webp"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/videos/subang/subang-hero-montage.mp4" type="video/mp4" />
    </video>
  );
}
