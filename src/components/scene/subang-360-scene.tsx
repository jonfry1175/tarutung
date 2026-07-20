"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PANORAMA_URL = "/images/subang/hero-panorama.png";
const IMAGE_WIDTH = 16;
const IMAGE_HEIGHT = 9;
const MIN_ZOOM = 1;
const MAX_ZOOM = 1.55;
const AUTO_ZOOM = 1.04;
const AUTO_PAN_SPEED = 0.055;
const AUTO_RESUME_DELAY = 2500;

export interface Subang360SceneProps {
  zoomSignal?: number;
  resetSignal?: number;
  motionPaused?: boolean;
}

interface SceneControls {
  reset: () => void;
  zoom: (direction: number) => void;
  setMotionPaused: (paused: boolean) => void;
}

export function Subang360Scene({
  zoomSignal,
  resetSignal,
  motionPaused = false,
}: Subang360SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const controlsRef = useRef<SceneControls | null>(null);
  const previousZoomSignalRef = useRef(zoomSignal);
  const previousResetSignalRef = useRef(resetSignal);

  useEffect(() => {
    const container = containerRef.current;
    const poster = posterRef.current;
    if (!container) return;

    delete container.dataset.sceneReady;
    poster?.classList.remove("opacity-0");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let disposed = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-8, 8, 4.5, -4.5, 0.1, 10);
    camera.position.z = 3;

    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500";
    canvas.style.touchAction = "none";
    canvas.style.cursor = "grab";
    canvas.setAttribute("aria-hidden", "true");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(canvas);

    let baseViewHeight = IMAGE_HEIGHT;
    let aspect = 16 / 9;
    let zoom = reducedMotion ? 1 : AUTO_ZOOM;
    let targetZoom = zoom;
    let panX = 0;
    let panY = 0;
    let targetPanX = 0;
    let targetPanY = 0;
    let textureReady = false;
    let activePointerId: number | null = null;
    let autoPanDirection = 1;
    let autoResumeAt = 0;
    let externallyPaused = false;
    let previousFrameTime = performance.now();
    let lastPointerX = 0;
    let lastPointerY = 0;
    let panorama: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
    let texture: THREE.Texture | null = null;

    const clampPan = () => {
      const viewHeight = baseViewHeight / targetZoom;
      const viewWidth = viewHeight * aspect;
      const maxX = Math.max(0, (IMAGE_WIDTH - viewWidth) / 2);
      const maxY = Math.max(0, (IMAGE_HEIGHT - viewHeight) / 2);
      targetPanX = THREE.MathUtils.clamp(targetPanX, -maxX, maxX);
      targetPanY = THREE.MathUtils.clamp(targetPanY, -maxY, maxY);
    };

    const updateCamera = () => {
      const viewHeight = baseViewHeight / zoom;
      const viewWidth = viewHeight * aspect;
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.position.x = panX;
      camera.position.y = panY;
      camera.updateProjectionMatrix();
    };

    const syncHotspots = () => {
      const viewHeight = baseViewHeight / zoom;
      const viewWidth = viewHeight * aspect;
      const baseViewWidth = baseViewHeight * aspect;

      container.parentElement
        ?.querySelectorAll<HTMLElement>("[data-panorama-x][data-panorama-y]")
        .forEach((hotspot) => {
          const x = Number(hotspot.dataset.panoramaX);
          const y = Number(hotspot.dataset.panoramaY);
          const anchorX = (x / 100 - 0.5) * baseViewWidth;
          const anchorY = (0.5 - y / 100) * baseViewHeight;
          hotspot.style.left = `${50 + ((anchorX - panX) / viewWidth) * 100}%`;
          hotspot.style.top = `${50 - ((anchorY - panY) / viewHeight) * 100}%`;
        });
    };

    const render = () => {
      if (!textureReady || document.hidden || disposed) return;
      updateCamera();
      renderer.render(scene, camera);
      syncHotspots();
    };

    const animate = (time: number) => {
      frameId = 0;
      if (document.hidden || disposed) return;
      const deltaSeconds = Math.min((time - previousFrameTime) / 1000, 0.05);
      previousFrameTime = time;

      const autoPanEligible = !reducedMotion && !externallyPaused && activePointerId === null;
      const autoPanActive = autoPanEligible && time >= autoResumeAt;
      if (autoPanActive) {
        const viewHeight = baseViewHeight / targetZoom;
        const viewWidth = viewHeight * aspect;
        const maxX = Math.max(0, (IMAGE_WIDTH - viewWidth) / 2);
        targetPanX += autoPanDirection * AUTO_PAN_SPEED * deltaSeconds;
        if (Math.abs(targetPanX) >= maxX) {
          targetPanX = THREE.MathUtils.clamp(targetPanX, -maxX, maxX);
          autoPanDirection *= -1;
        }
      }

      zoom += (targetZoom - zoom) * 0.16;
      panX += (targetPanX - panX) * 0.16;
      panY += (targetPanY - panY) * 0.16;
      render();
      if (
        Math.abs(targetZoom - zoom) > 0.001 ||
        Math.abs(targetPanX - panX) > 0.001 ||
        Math.abs(targetPanY - panY) > 0.001 ||
        autoPanActive ||
        (autoPanEligible && Number.isFinite(autoResumeAt))
      ) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const requestRender = () => {
      if (reducedMotion) {
        zoom = targetZoom;
        panX = targetPanX;
        panY = targetPanY;
        render();
      } else if (!frameId && !document.hidden) {
        previousFrameTime = performance.now();
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const pauseAutoPan = () => {
      autoResumeAt = performance.now() + AUTO_RESUME_DELAY;
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      aspect = width / height;
      baseViewHeight = aspect > IMAGE_WIDTH / IMAGE_HEIGHT
        ? IMAGE_WIDTH / aspect
        : IMAGE_HEIGHT;
      renderer.setSize(width, height, false);
      clampPan();
      requestRender();
    };

    const zoomBy = (direction: number) => {
      if (!direction) return;
      pauseAutoPan();
      targetZoom = THREE.MathUtils.clamp(
        targetZoom + Math.sign(direction) * 0.12,
        MIN_ZOOM,
        MAX_ZOOM,
      );
      clampPan();
      requestRender();
    };

    const reset = () => {
      pauseAutoPan();
      targetZoom = 1;
      targetPanX = 0;
      targetPanY = 0;
      requestRender();
    };

    controlsRef.current = {
      reset,
      zoom: zoomBy,
      setMotionPaused: (paused) => {
        externallyPaused = paused;
        if (!paused) pauseAutoPan();
        requestRender();
      },
    };

    const handlePointerDown = (event: PointerEvent) => {
      autoResumeAt = Number.POSITIVE_INFINITY;
      activePointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      const viewHeight = baseViewHeight / targetZoom;
      const viewWidth = viewHeight * aspect;
      targetPanX -= ((event.clientX - lastPointerX) / container.clientWidth) * viewWidth;
      targetPanY += ((event.clientY - lastPointerY) / container.clientHeight) * viewHeight;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      clampPan();
      requestRender();
    };

    const releasePointer = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      activePointerId = null;
      pauseAutoPan();
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(-event.deltaY);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        requestRender();
      }
    };

    const handleMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        targetPanX = 0;
        targetPanY = 0;
        targetZoom = 1;
      }
      requestRender();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", releasePointer);
    canvas.addEventListener("pointercancel", releasePointer);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotion);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    new THREE.TextureLoader().load(
      PANORAMA_URL,
      (loadedTexture) => {
        if (disposed) {
          loadedTexture.dispose();
          return;
        }
        texture = loadedTexture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        const geometry = new THREE.PlaneGeometry(IMAGE_WIDTH, IMAGE_HEIGHT, 32, 18);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        panorama = new THREE.Mesh(geometry, material);
        scene.add(panorama);
        textureReady = true;
        render();
        canvas.classList.remove("opacity-0");
        poster?.classList.add("opacity-0");
        container.dataset.sceneReady = "true";
      },
    );

    return () => {
      disposed = true;
      controlsRef.current = null;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", releasePointer);
      canvas.removeEventListener("pointercancel", releasePointer);
      canvas.removeEventListener("wheel", handleWheel);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotion);
      if (panorama) {
        scene.remove(panorama);
        panorama.geometry.dispose();
        panorama.material.dispose();
      }
      texture?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      poster?.classList.remove("opacity-0");
      delete container.dataset.sceneReady;
    };
  }, []);

  useEffect(() => {
    controlsRef.current?.setMotionPaused(motionPaused);
  }, [motionPaused]);

  useEffect(() => {
    if (zoomSignal !== undefined && zoomSignal !== previousZoomSignalRef.current) {
      const previous = previousZoomSignalRef.current ?? 0;
      controlsRef.current?.zoom(zoomSignal - previous);
    }
    previousZoomSignalRef.current = zoomSignal;
  }, [zoomSignal]);

  useEffect(() => {
    if (resetSignal !== undefined && resetSignal !== previousResetSignalRef.current) {
      controlsRef.current?.reset();
    }
    previousResetSignalRef.current = resetSignal;
  }, [resetSignal]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black">
      <Image
        ref={posterRef}
        src={PANORAMA_URL}
        alt="Panorama Subang"
        fill
        sizes="100vw"
        priority
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
    </div>
  );
}
