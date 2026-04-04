"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { categoryMeta, type TarutungPlace } from "@/lib/tarutung-data";

interface TarutungMapProps {
  places: TarutungPlace[];
}

function buildMarkerIcon(color: string) {
  return L.divIcon({
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `<span style="display:block;width:18px;height:18px;border-radius:999px;background:${color};box-shadow:0 0 0 4px rgba(255,255,255,0.85),0 10px 30px rgba(15,23,42,0.32);"></span>`,
  });
}

export function TarutungMap({ places }: TarutungMapProps) {
  const tileUrl =
    process.env.NEXT_PUBLIC_MAP_TILE_URL ??
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ??
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const center = useMemo(() => {
    if (!places.length) {
      return [2.0114, 99.0789] as [number, number];
    }

    const latitude =
      places.reduce((sum, place) => sum + place.latitude, 0) / places.length;
    const longitude =
      places.reduce((sum, place) => sum + place.longitude, 0) / places.length;

    return [latitude, longitude] as [number, number];
  }, [places]);

  return (
    <div className="map-surface h-[480px] overflow-hidden rounded-[2rem] border border-border/70 p-2">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full rounded-[1.5rem]"
      >
        <TileLayer attribution={attribution} url={tileUrl} />
        {places.map((place) => {
          const meta = categoryMeta[place.category];

          return (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
              icon={buildMarkerIcon(meta.color)}
            >
              <Popup>
                <div className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {meta.label}
                  </div>
                  <div className="text-sm font-semibold">{place.title}</div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {place.summary}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Cluster: {place.cluster}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
