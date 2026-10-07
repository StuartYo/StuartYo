import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { slotTimes } from "@/lib/event";
import { HttpError, json, route } from "@/lib/http";
import { regenerateSchedule, isNight } from "@/lib/schedule";
import { getSettings } from "@/lib/settings";

export const GET = route(
  async () => {
    const s = await getSettings();
    const rows = await sql<
      { idx: number; landmark_id: number; name: string; gesture: string; voided: boolean; approved: number; pending: number; scans: number }[]
    >`
      select s.idx, s.landmark_id, l.name, s.gesture, s.voided,
        (select count(*)::int from photos p where p.slot_idx = s.idx and p.status = 'approved') as approved,
        (select count(*)::int from photos p where p.slot_idx = s.idx and p.status = 'pending') as pending,
        (select count(*)::int from scans c where c.slot_idx = s.idx and not c.excluded) as scans
      from slots s join landmarks l on l.id = s.landmark_id
      where s.idx < ${s.slotCount}
      order by s.idx`;
    return json(
      rows.map((r) => ({
        ...r,
        ...(s.eventStart ? { ...slotTimes(s, r.idx), night: isNight(s, slotTimes(s, r.idx).start) } : {}),
      })),
    );
  },
  { admin: true },
);

export const POST = route(
  async (req: NextRequest) => {
    const body = await req.json();
    if (body.action === "generate") return json({ ok: true, count: await regenerateSchedule() });
    if (body.action === "update") {
      const idx = Number(body.idx);
      if (body.landmarkId !== undefined) {
        const [l] = await sql`select id from landmarks where id = ${Number(body.landmarkId)}`;
        if (!l) throw new HttpError(400, "bad_landmark", "找不到這個地點");
        await sql`update slots set landmark_id = ${Number(body.landmarkId)} where idx = ${idx}`;
      }
      if (typeof body.gesture === "string" && body.gesture.trim())
        await sql`update slots set gesture = ${body.gesture.trim()} where idx = ${idx}`;
      if (typeof body.voided === "boolean") await sql`update slots set voided = ${body.voided} where idx = ${idx}`;
      return json({ ok: true });
    }
    throw new HttpError(400, "bad_action", "未知的操作");
  },
  { admin: true },
);
