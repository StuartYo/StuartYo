import { sql } from "./db";
import { distanceM } from "./geo";
import { GESTURES } from "./gestures";
import { getClock } from "./event";
import { getSettings, type Settings } from "./settings";

type L = { id: number; lat: number; lng: number; night_ok: boolean };

function taipeiHour(ms: number) {
  return new Date(ms + 8 * 3600_000).getUTCHours();
}

export function isNight(s: Settings, ms: number) {
  const h = taipeiHour(ms);
  return s.nightStartHour > s.nightEndHour
    ? h >= s.nightStartHour || h < s.nightEndHour
    : h >= s.nightStartHour && h < s.nightEndHour;
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 隨機排出時段地點：
 * - 夜間時段只排「晚上也能去」的地點
 * - 最近幾個時段用過的地點不會再出現
 * - 盡量和上一個地點距離不超過 maxHopM（搬奶蛙不要太遠）
 * - 用得越少的地點越容易被抽到，讓各地點出現次數平均
 * - 同一個地點重複出現時，手勢一定不同（避免拿舊照片冒充）
 */
export function generate(s: Settings, landmarks: L[], from: number, history: { landmark_id: number; gesture: string }[]) {
  if (!s.eventStart) throw new Error("請先設定活動開始時間");
  if (landmarks.length < 3) throw new Error("至少需要 3 個啟用的地點");
  const byId = new Map(landmarks.map((l) => [l.id, l]));
  const seq = history.slice(0, from);
  const uses = new Map<number, number>();
  const gesturesAt = new Map<number, Set<string>>();
  for (const h of seq) {
    uses.set(h.landmark_id, (uses.get(h.landmark_id) ?? 0) + 1);
    if (!gesturesAt.has(h.landmark_id)) gesturesAt.set(h.landmark_id, new Set());
    gesturesAt.get(h.landmark_id)!.add(h.gesture);
  }
  const start = new Date(s.eventStart).getTime();
  const out: { idx: number; landmark_id: number; gesture: string }[] = [];

  for (let idx = from; idx < s.slotCount; idx++) {
    const night = isNight(s, start + idx * s.slotMinutes * 60_000);
    let pool = landmarks.filter((l) => !night || l.night_ok);
    if (pool.length === 0) pool = landmarks;
    const recentN = Math.min(6, Math.floor(pool.length / 2));
    const recent = new Set(seq.slice(-recentN).map((h) => h.landmark_id));
    const prev = seq.length ? byId.get(seq[seq.length - 1].landmark_id) : undefined;

    let cands = pool.filter((l) => !recent.has(l.id));
    if (prev) {
      const near = cands.filter((l) => distanceM(prev.lat, prev.lng, l.lat, l.lng) <= s.maxHopM);
      if (near.length) cands = near;
    }
    if (!cands.length) cands = pool.filter((l) => l.id !== prev?.id);
    if (!cands.length) cands = pool;

    const minUse = Math.min(...cands.map((l) => uses.get(l.id) ?? 0));
    const chosen = pick(cands.filter((l) => (uses.get(l.id) ?? 0) <= minUse + 1));

    const used = gesturesAt.get(chosen.id) ?? new Set<string>();
    const lastGesture = seq.length ? seq[seq.length - 1].gesture : "";
    let gs = GESTURES.filter((g) => !used.has(g) && g !== lastGesture);
    if (!gs.length) gs = GESTURES.filter((g) => g !== lastGesture);
    const gesture = pick(gs);

    uses.set(chosen.id, (uses.get(chosen.id) ?? 0) + 1);
    used.add(gesture);
    gesturesAt.set(chosen.id, used);
    seq.push({ landmark_id: chosen.id, gesture });
    out.push({ idx, landmark_id: chosen.id, gesture });
  }
  return out;
}

/** 重新排程。活動進行中只會重排「還沒開始」的時段，已經開始的保留不動。 */
export async function regenerateSchedule() {
  const s = await getSettings();
  const clock = getClock(s);
  if (clock.phase === "ended") throw new Error("活動已結束，不能重新排程");
  let from = clock.phase === "running" ? clock.idx! + 1 : 0;
  // 已經開始的時段如果還沒排（例如開始時間設在過去），從第一個缺的時段開始補
  const existing = await sql<{ idx: number }[]>`select idx from slots where idx < ${from} order by idx`;
  const gap = existing.findIndex((r, i) => r.idx !== i);
  if (gap >= 0) from = gap;
  else if (existing.length < from) from = existing.length;
  const landmarks = await sql<L[]>`select id, lat, lng, night_ok from landmarks where enabled order by id`;
  const history = await sql<{ landmark_id: number; gesture: string }[]>`
    select landmark_id, gesture from slots where idx < ${from} order by idx`;
  const rows = generate(s, landmarks, from, history);
  await sql.begin(async (tx) => {
    // 已有照片或掃碼紀錄的時段不能刪（理論上未開始的時段不會有）
    await tx`delete from slots where idx >= ${from}
      and not exists (select 1 from scans where slot_idx = slots.idx)
      and not exists (select 1 from photos where slot_idx = slots.idx)`;
    for (const r of rows) {
      await tx`insert into slots (idx, landmark_id, gesture) values (${r.idx}, ${r.landmark_id}, ${r.gesture})
        on conflict (idx) do nothing`;
    }
  });
  return rows.length;
}
