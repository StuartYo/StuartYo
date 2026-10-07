import { sql } from "./db";
import { getSettings, type Settings } from "./settings";
import { notify } from "./notify";

export type Phase = "unscheduled" | "before" | "running" | "ended";
export type SlotStatus = "waiting" | "open" | "confirmed" | "lost" | "void";

export type Clock = {
  phase: Phase;
  start: number | null;
  end: number | null;
  /** 目前時段的 index（0 起算）；不在活動期間為 null */
  idx: number | null;
};

export function getClock(s: Settings, now = Date.now()): Clock {
  if (!s.eventStart) return { phase: "unscheduled", start: null, end: null, idx: null };
  const start = new Date(s.eventStart).getTime();
  const len = s.slotMinutes * 60_000;
  const end = start + len * s.slotCount;
  if (now < start) return { phase: "before", start, end, idx: null };
  if (now >= end) return { phase: "ended", start, end, idx: null };
  return { phase: "running", start, end, idx: Math.floor((now - start) / len) };
}

export function slotTimes(s: Settings, idx: number) {
  const start = new Date(s.eventStart!).getTime() + idx * s.slotMinutes * 60_000;
  return { start, end: start + s.slotMinutes * 60_000 };
}

export type SlotRow = {
  idx: number;
  gesture: string;
  voided: boolean;
  lost_notified: boolean;
  landmark_id: number;
  name: string;
  lat: number;
  lng: number;
  radius_m: number;
  hint: string;
  pending: number;
  approved: number;
};

export async function getSlot(idx: number): Promise<SlotRow | undefined> {
  const [row] = await sql<SlotRow[]>`
    select s.idx, s.gesture, s.voided, s.lost_notified, s.landmark_id,
           l.name, l.lat, l.lng, l.radius_m, l.hint,
           (select count(*)::int from photos p where p.slot_idx = s.idx and p.status = 'pending') as pending,
           (select count(*)::int from photos p where p.slot_idx = s.idx and p.status = 'approved') as approved
    from slots s join landmarks l on l.id = s.landmark_id
    where s.idx = ${idx}`;
  return row;
}

export function slotStatus(slot: SlotRow, s: Settings, now = Date.now()): SlotStatus {
  if (slot.voided) return "void";
  if (slot.approved > 0) return "confirmed";
  if (slot.pending > 0) return "open";
  const { start } = slotTimes(s, slot.idx);
  return now - start > s.lostMinutes * 60_000 ? "lost" : "waiting";
}

/** 這個時段是否已經開放掃碼（有人上傳了還沒被退回的照片） */
export function isOpen(status: SlotStatus) {
  return status === "open" || status === "confirmed";
}

function publicLandmark(slot: SlotRow) {
  return {
    id: slot.landmark_id,
    name: slot.name,
    lat: slot.lat,
    lng: slot.lng,
    radius: slot.radius_m,
    hint: slot.hint,
  };
}

export async function getPublicState() {
  const s = await getSettings();
  const now = Date.now();
  const clock = getClock(s, now);
  const base = {
    serverNow: now,
    eventName: s.eventName,
    phase: clock.phase,
    startsAt: clock.start,
    endsAt: clock.end,
    slotCount: s.slotCount,
    slotMinutes: s.slotMinutes,
    current: null as null | Record<string, unknown>,
    next: null as null | Record<string, unknown>,
  };

  let nextIdx: number | null = null;
  if (clock.phase === "before") nextIdx = 0;

  if (clock.phase === "running" && clock.idx !== null) {
    const slot = await getSlot(clock.idx);
    if (slot) {
      const status = slotStatus(slot, s, now);
      const t = slotTimes(s, slot.idx);
      const [photo] = await sql<{ id: string }[]>`
        select id from photos where slot_idx = ${slot.idx} and status = 'approved'
        order by created_at limit 1`;
      base.current = {
        idx: slot.idx,
        number: slot.idx + 1,
        startsAt: t.start,
        endsAt: t.end,
        landmark: publicLandmark(slot),
        gesture: slot.gesture,
        status,
        photoId: photo?.id ?? null,
      };
      if (status === "lost" && !slot.lost_notified) {
        await sql`update slots set lost_notified = true where idx = ${slot.idx}`;
        notify(`🥺 第 ${slot.idx + 1} 時段（${slot.name}）已經 ${s.lostMinutes} 分鐘沒有人上傳照片，奶蛙可能迷路了。`);
      }
    }
    if (clock.idx + 1 < s.slotCount) nextIdx = clock.idx + 1;
  }

  if (nextIdx !== null) {
    const t = slotTimes(s, nextIdx);
    const revealAt = t.start - s.revealAheadMinutes * 60_000;
    const slot = now >= revealAt ? await getSlot(nextIdx) : undefined;
    base.next = {
      idx: nextIdx,
      number: nextIdx + 1,
      startsAt: t.start,
      revealAt,
      landmark: slot ? publicLandmark(slot) : null,
    };
  }
  return base;
}

export type PublicState = Awaited<ReturnType<typeof getPublicState>>;
