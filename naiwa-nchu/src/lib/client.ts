"use client";

// ---- 裝置 token：伺服器會設 httpOnly cookie，這裡另外在 localStorage 留一份備份 ----
const TOKEN_KEY = "naiwa-device";

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveToken(token: string | undefined | null) {
  if (!token) return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public data: Record<string, unknown>) {
    super(message);
  }
}

export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = readToken();
  if (token) headers.set("x-device", token);
  if (init.body && !(init.body instanceof FormData) && !headers.has("content-type"))
    headers.set("content-type", "application/json");
  let res: Response;
  try {
    res = await fetch(path, { ...init, headers, cache: "no-store" });
  } catch {
    throw new ApiError(0, "network", "網路好像斷了，請確認連線後再試一次", {});
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.code ?? "error", data.error ?? "發生錯誤，請再試一次", data);
  return data as T;
}

// ---- 裝置特徵（只拿來標記可疑紀錄，不會擋人） ----
let fpCache: string | null = null;
export async function fingerprint() {
  if (fpCache) return fpCache;
  const parts = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height + "x" + devicePixelRatio,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency,
    (navigator as { deviceMemory?: number }).deviceMemory ?? "",
  ];
  try {
    const c = document.createElement("canvas");
    const g = c.getContext("2d");
    if (g) {
      g.textBaseline = "top";
      g.font = "16px Arial";
      g.fillStyle = "#f60";
      g.fillRect(0, 0, 60, 20);
      g.fillStyle = "#069";
      g.fillText("奶蛙🐸NCHU", 2, 2);
      parts.push(c.toDataURL());
    }
  } catch {}
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(parts.join("|")));
  fpCache = Array.from(new Uint8Array(buf).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
  return fpCache;
}

// ---- 定位：持續讀幾秒，取最準的一次 ----
export type Position = { lat: number; lng: number; accuracy: number };

export class GeoError extends Error {
  constructor(public code: "unsupported" | "denied" | "timeout", message: string) {
    super(message);
  }
}

export function getBestPosition({ maxWaitMs = 8000, goodEnoughM = 25 } = {}): Promise<Position> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new GeoError("unsupported", "這個瀏覽器不支援定位，請改用 Safari 或 Chrome"));
      return;
    }
    let best: Position | null = null;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      navigator.geolocation.clearWatch(id);
      clearTimeout(timer);
      if (best) resolve(best);
      else reject(new GeoError("timeout", "抓不到定位，請確認已開啟定位服務，並到戶外再試一次"));
    };
    const id = navigator.geolocation.watchPosition(
      (p) => {
        const pos = { lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy };
        if (!best || pos.accuracy < best.accuracy) best = pos;
        if (pos.accuracy <= goodEnoughM) finish();
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          done = true;
          navigator.geolocation.clearWatch(id);
          clearTimeout(timer);
          reject(new GeoError("denied", "需要定位權限才能打卡"));
        }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: maxWaitMs },
    );
    const timer = setTimeout(finish, maxWaitMs);
  });
}

// ---- 照片壓縮：長邊縮到 1600px、轉成 JPEG，上傳比較快 ----
export async function compressImage(file: File, maxSide = 1600, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  let w: number, h: number, source: CanvasImageSource;
  if (bitmap) {
    w = bitmap.width;
    h = bitmap.height;
    source = bitmap;
  } else {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = URL.createObjectURL(file);
    });
    w = img.naturalWidth;
    h = img.naturalHeight;
    source = img;
  }
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("壓縮失敗"))), "image/jpeg", quality));
}

// ---- App 內建瀏覽器（LINE / IG / FB）偵測 ----
export function inAppBrowser(): "line" | "instagram" | "facebook" | "threads" | null {
  const ua = navigator.userAgent;
  if (/\bLine\//i.test(ua)) return "line";
  if (/Barcelona/i.test(ua)) return "threads";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook";
  return null;
}

export function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(ss)}` : `${pad(m)}:${pad(ss)}`;
}

export function formatTime(ms: number, withDate = false) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    ...(withDate ? { month: "numeric", day: "numeric", weekday: "short" } : {}),
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(ms);
}
