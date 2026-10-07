"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, saveToken } from "./client";

/** 定期向伺服器拿最新資料；分頁切到背景時暫停，回來時立刻更新 */
export function useLive<T>(path: string, intervalMs: number) {
  const [live, setLive] = useState<{ data: T; at: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api<T>(path);
      setLive({ data, at: Date.now() });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [path]);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      if (!alive) return;
      if (document.visibilityState === "visible") await load();
      timer.current = setTimeout(tick, intervalMs);
    };
    tick();
    const onVis = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [load, intervalMs]);

  return { data: live?.data ?? null, receivedAt: live?.at ?? null, error, reload: load };
}

/** 每秒更新一次的時鐘。傳入伺服器時間和收到的當下時間，就會校正成伺服器時間。 */
export function useNow(serverNow?: number | null, receivedAt?: number | null) {
  // 一開始是 0（伺服器預先產生頁面時不讀時間），掛載後才開始走
  const [now, setNow] = useState(0);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  return now + (serverNow && receivedAt ? serverNow - receivedAt : 0);
}

export type Me = {
  token: string;
  code: string;
  deptId: number | null;
  deptName: string | null;
  deptShort: string | null;
  year: string | null;
  totalScans: number;
  scannedCurrent: boolean;
  uploadedCurrent: boolean;
  canChangeDept: boolean;
};

/** 這台裝置的系級與打卡狀態；refreshKey 改變時（例如換時段）會重新讀取 */
export function useMe(refreshKey?: unknown) {
  const [me, setMe] = useState<Me | null | undefined>(undefined);
  const fetchMe = useCallback(
    () =>
      api<Me | null>("/api/me").then(
        (m) => {
          if (m) saveToken(m.token);
          return m;
        },
        () => null,
      ),
    [],
  );
  const reload = useCallback(() => fetchMe().then(setMe), [fetchMe]);
  useEffect(() => {
    let alive = true;
    fetchMe().then((m) => alive && setMe(m));
    return () => {
      alive = false;
    };
  }, [fetchMe, refreshKey]);
  return { me, setMe: (m: Me) => (saveToken(m.token), setMe(m)), reload };
}

export type Landmark = { id: number; name: string; lat: number; lng: number; radius: number; hint: string };
export type SlotStatus = "waiting" | "open" | "confirmed" | "lost" | "void";
export type State = {
  serverNow: number;
  eventName: string;
  phase: "unscheduled" | "before" | "running" | "ended";
  startsAt: number | null;
  endsAt: number | null;
  slotCount: number;
  slotMinutes: number;
  current: null | {
    idx: number;
    number: number;
    startsAt: number;
    endsAt: number;
    landmark: Landmark;
    gesture: string;
    status: SlotStatus;
    photoId: string | null;
  };
  next: null | { idx: number; number: number; startsAt: number; revealAt: number; landmark: Landmark | null };
};

export type Board = {
  frozenAt: number | null;
  updatedAt: number;
  rows: {
    id: number;
    name: string;
    short: string;
    college: string;
    students: number | null;
    weight: number;
    confirmedScans: number;
    pendingScans: number;
    participants: number;
    score: number;
    pendingScore: number;
  }[];
};

export type Dept = { id: number; college: string; name: string; short: string; kind: string; students: number | null; weight: number };
