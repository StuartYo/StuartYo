"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LMap, LayerGroup } from "leaflet";

type Pt = { lat: number; lng: number };
const NONE: (Pt & { name: string })[] = [];

/** 顯示目標地點、範圍圈，以及（如果有）使用者目前位置 */
export default function MapView({
  target,
  radius,
  me,
  extra = NONE,
  height = 220,
}: {
  target: Pt & { name: string };
  radius: number;
  me?: (Pt & { accuracy: number }) | null;
  extra?: (Pt & { name: string })[];
  height?: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const L = useRef<typeof import("leaflet") | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((mod) => {
      if (cancelled || !el.current || map.current) return;
      L.current = mod;
      map.current = mod
        .map(el.current, { zoomControl: false, attributionControl: true })
        .setView([target.lat, target.lng], 17);
      mod
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        })
        .addTo(map.current);
      layer.current = mod.layerGroup().addTo(map.current);
      draw();
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw() {
    const mod = L.current;
    if (!mod || !map.current || !layer.current) return;
    layer.current.clearLayers();
    mod
      .circle([target.lat, target.lng], { radius, color: "#3e9a4e", weight: 2, fillColor: "#3e9a4e", fillOpacity: 0.15 })
      .addTo(layer.current);
    mod
      .marker([target.lat, target.lng], {
        icon: mod.divIcon({ html: '<div style="font-size:30px;line-height:30px">🐸</div>', className: "", iconSize: [30, 30], iconAnchor: [15, 26] }),
      })
      .bindTooltip(target.name, { permanent: false })
      .addTo(layer.current);
    for (const p of extra) {
      mod
        .circleMarker([p.lat, p.lng], { radius: 5, color: "#6b7465", weight: 1, fillOpacity: 0.6 })
        .bindTooltip(p.name)
        .addTo(layer.current);
    }
    if (me) {
      mod
        .circle([me.lat, me.lng], { radius: me.accuracy, color: "#2f6fd6", weight: 1, fillOpacity: 0.08 })
        .addTo(layer.current);
      mod
        .circleMarker([me.lat, me.lng], { radius: 7, color: "#fff", weight: 2, fillColor: "#2f6fd6", fillOpacity: 1 })
        .addTo(layer.current);
      map.current.fitBounds(mod.latLngBounds([[target.lat, target.lng], [me.lat, me.lng]]).pad(0.35), { maxZoom: 17 });
    } else {
      map.current.setView([target.lat, target.lng], 17);
    }
  }

  useEffect(draw, [target.lat, target.lng, target.name, radius, me?.lat, me?.lng, me?.accuracy, extra]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={el} className="map" style={{ height }} />;
}
