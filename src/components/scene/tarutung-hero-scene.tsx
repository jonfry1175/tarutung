"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const markerPositions = [
  [-2.8, 0.8, 1.6],
  [-1.5, 1.1, -0.6],
  [-0.4, 0.9, 0.5],
  [1.1, 0.95, -0.4],
  [2.4, 1.1, 1.2],
  [3.2, 0.85, -1.4],
] as const;

const markerPalette = ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#7c3aed"];

export function TarutungHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#06141f", 8, 24);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 4.6, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight("#9dd7e2", "#081a14", 1.2);
    const keyLight = new THREE.DirectionalLight("#fff3d0", 2.2);
    keyLight.position.set(4, 8, 6);
    const rimLight = new THREE.DirectionalLight("#60a5fa", 1.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(ambientLight, keyLight, rimLight);

    const landscape = new THREE.Group();
    scene.add(landscape);

    const terrainGeometry = new THREE.PlaneGeometry(14, 12, 52, 42);
    const positions = terrainGeometry.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const ridge = Math.sin(x * 0.8) * 0.4 + Math.cos(y * 1.15) * 0.25;
      const valley = Math.exp(-((x * x + y * y) / 28)) * 1.8;
      positions.setZ(index, ridge + valley);
    }

    terrainGeometry.computeVertexNormals();

    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: "#4d6e43",
      roughness: 0.95,
      metalness: 0.08,
      flatShading: true,
    });

    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2.35;
    landscape.add(terrain);

    const shoreline = new THREE.Mesh(
      new THREE.CircleGeometry(8.5, 64),
      new THREE.MeshBasicMaterial({
        color: "#07161f",
        transparent: true,
        opacity: 0.88,
      }),
    );
    shoreline.rotation.x = -Math.PI / 2;
    shoreline.position.y = -1.35;
    landscape.add(shoreline);

    const markerGeometry = new THREE.SphereGeometry(0.22, 24, 24);
    const markers = markerPositions.map(([x, y, z], index) => {
      const marker = new THREE.Mesh(
        markerGeometry,
        new THREE.MeshStandardMaterial({
          color: markerPalette[index % markerPalette.length],
          emissive: markerPalette[index % markerPalette.length],
          emissiveIntensity: 0.15,
        }),
      );

      marker.position.set(x, y, z);
      landscape.add(marker);
      return marker;
    });

    const glow = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(
        markerPositions.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      ),
      new THREE.PointsMaterial({
        color: "#d6f7ff",
        size: 0.1,
      }),
    );
    landscape.add(glow);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      landscape.rotation.y = elapsed * 0.15;
      landscape.rotation.z = Math.sin(elapsed * 0.28) * 0.07;
      camera.position.x = Math.sin(elapsed * 0.18) * 1.4;
      camera.position.y = 4.4 + Math.cos(elapsed * 0.25) * 0.2;
      camera.lookAt(0, 0.8, 0);

      markers.forEach((marker, index) => {
        marker.position.y =
          markerPositions[index][1] + Math.sin(elapsed * 1.6 + index) * 0.14;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      terrainGeometry.dispose();
      terrainMaterial.dispose();
      markerGeometry.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[#06141f] shadow-[0_32px_100px_rgba(6,20,31,0.24)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,221,198,0.2),transparent_35%),linear-gradient(180deg,rgba(8,31,43,0.24),transparent)]"
        aria-hidden="true"
      />
      <div ref={containerRef} className="h-[420px] w-full" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
        <div className="rounded-full bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur">
          Hero scene with Three.js
        </div>
        <div className="rounded-full bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur">
          6 hotspot seeds
        </div>
      </div>
    </div>
  );
}
