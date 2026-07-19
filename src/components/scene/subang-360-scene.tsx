"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import type { SubangScene } from "@/lib/subang-data";

const VIDEO_ASPECT_RATIO = 16 / 9;

export interface Subang360SceneProps {
  scene: SubangScene;
  muted: boolean;
  paused: boolean;
  restartSignal: number;
  children?: ReactNode;
  onPlaybackTimeChange?: (time: number) => void;
}

export function Subang360Scene({
  scene,
  muted,
  paused,
  restartSignal,
  children,
  onPlaybackTimeChange,
}: Subang360SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousRestartSignalRef = useRef(restartSignal);
  const [planeSize, setPlaneSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
  });
  const [readySceneId, setReadySceneId] = useState<string | null>(null);
  const ready = readySceneId === scene.id;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      const planeWidth = width / height > VIDEO_ASPECT_RATIO
        ? width
        : height * VIDEO_ASPECT_RATIO;
      const planeHeight = width / height > VIDEO_ASPECT_RATIO
        ? width / VIDEO_ASPECT_RATIO
        : height;
      const centeredLeft = (width - planeWidth) / 2;
      const desiredLeft = Math.min(
        0,
        Math.max(
          width - planeWidth,
          width * 0.62 - planeWidth * (scene.mobileFocusX / 100),
        ),
      );

      setPlaneSize({
        width: planeWidth,
        height: planeHeight,
        offsetX: width <= 859 ? desiredLeft - centeredLeft : 0,
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    return () => observer.disconnect();
  }, [scene.mobileFocusX]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;

    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    } else {
      void video.play().catch(() => {
        video.muted = true;
        void video.play().catch(() => undefined);
      });
    }
  }, [muted, paused, ready, scene.id]);

  useEffect(() => {
    if (restartSignal === previousRestartSignalRef.current) return;
    previousRestartSignalRef.current = restartSignal;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    onPlaybackTimeChange?.(0);
    if (!paused) void video.play().catch(() => undefined);
  }, [onPlaybackTimeChange, paused, restartSignal]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onPlaybackTimeChange) return;

    let frameHandle = 0;
    let animationHandle = 0;
    let lastReportedAt = -1;
    let disposed = false;

    const report = (time: number) => {
      if (Math.abs(time - lastReportedAt) < 1 / 15 && time >= lastReportedAt) return;
      lastReportedAt = time;
      onPlaybackTimeChange(time);
    };

    if (typeof video.requestVideoFrameCallback === "function") {
      const onFrame = (_now: number, metadata: VideoFrameCallbackMetadata) => {
        if (disposed) return;
        report(metadata.mediaTime);
        if (!disposed) frameHandle = video.requestVideoFrameCallback(onFrame);
      };
      frameHandle = video.requestVideoFrameCallback(onFrame);
    } else {
      const onFrame = () => {
        if (disposed) return;
        report(video.currentTime);
        if (!disposed) animationHandle = window.requestAnimationFrame(onFrame);
      };
      animationHandle = window.requestAnimationFrame(onFrame);
    }

    return () => {
      disposed = true;
      if (frameHandle) video.cancelVideoFrameCallback(frameHandle);
      if (animationHandle) window.cancelAnimationFrame(animationHandle);
    };
  }, [onPlaybackTimeChange, scene.id]);

  return (
    <div ref={containerRef} className="subang360-video-stage">
      <div
        className="subang360-video-plane"
        style={{
          width: planeSize.width,
          height: planeSize.height,
          backgroundImage: `url(${scene.poster})`,
          transform: `translate(calc(-50% + ${planeSize.offsetX}px), -50%)`,
        }}
      >
        <video
          ref={videoRef}
          key={scene.id}
          className={ready ? "is-ready" : undefined}
          poster={scene.poster}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          aria-label={`Video suasana ${scene.label}`}
          onCanPlay={() => setReadySceneId(scene.id)}
        >
          <source src={scene.video} type="video/mp4" />
        </video>
        {children}
      </div>
    </div>
  );
}
