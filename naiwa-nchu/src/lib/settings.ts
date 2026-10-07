import { sql } from "./db";

export type Settings = {
  eventName: string;
  /** ISO 時間；null 代表還沒排定開始時間 */
  eventStart: string | null;
  slotMinutes: number;
  slotCount: number;
  /** 下一個地點提前幾分鐘公布 */
  revealAheadMinutes: number;
  /** 時段開始幾分鐘後還沒有照片，就顯示「奶蛙迷路了」 */
  lostMinutes: number;
  /** 最後幾小時凍結公開排行榜（0 = 不凍結） */
  freezeHours: number;
  /** GPS 精確度超過幾公尺就請對方重試 */
  maxAccuracyM: number;
  /** 夜間時段（只排 night_ok 的地點），以台灣時間的小時表示 */
  nightStartHour: number;
  nightEndHour: number;
  /** 相鄰兩個地點盡量不超過的距離（公尺），讓搬奶蛙不會太累 */
  maxHopM: number;
};

export const DEFAULT_SETTINGS: Settings = {
  eventName: "奶蛙興大巡迴賽",
  eventStart: null,
  slotMinutes: 60,
  slotCount: 120,
  revealAheadMinutes: 10,
  lostMinutes: 30,
  freezeHours: 0,
  maxAccuracyM: 150,
  nightStartHour: 22,
  nightEndHour: 7,
  maxHopM: 700,
};

export async function getSettings(): Promise<Settings> {
  const rows = await sql<{ key: string; value: unknown }[]>`select key, value from settings`;
  const s: Record<string, unknown> = { ...DEFAULT_SETTINGS };
  for (const r of rows) if (r.key in DEFAULT_SETTINGS) s[r.key] = r.value;
  return s as Settings;
}

export async function updateSettings(patch: Partial<Settings>) {
  for (const [key, value] of Object.entries(patch)) {
    if (!(key in DEFAULT_SETTINGS)) continue;
    await sql`
      insert into settings (key, value) values (${key}, ${sql.json(value as never)})
      on conflict (key) do update set value = excluded.value`;
  }
}
