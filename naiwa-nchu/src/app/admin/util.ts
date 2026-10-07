"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/client";

export function useAdmin<T>(path: string, intervalMs = 0) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try {
      setData(await api<T>(path));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [path]);
  useEffect(() => {
    const t = intervalMs ? setInterval(load, intervalMs) : undefined;
    const first = setTimeout(load, 0);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [load, intervalMs]);
  return { data, error, reload: load };
}

export async function post(path: string, body: unknown) {
  return api(path, { method: "POST", body: JSON.stringify(body) });
}

/** ms → datetime-local 的值（台灣時間） */
export function toLocalInput(ms: number | null) {
  if (!ms) return "";
  return new Date(ms + 8 * 3600_000).toISOString().slice(0, 16);
}

/** datetime-local 的值（台灣時間）→ ISO */
export function fromLocalInput(v: string) {
  return v ? new Date(`${v}:00+08:00`).toISOString() : null;
}
