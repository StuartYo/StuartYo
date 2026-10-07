import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { HttpError, json, route } from "@/lib/http";

export const GET = route(
  async (req: NextRequest) => {
    const status = req.nextUrl.searchParams.get("status") ?? "pending";
    const rows = await sql`
      select p.id, p.slot_idx, p.slot_idx + 1 as number, p.status, p.created_at, round(p.distance_m) as distance,
             round(p.accuracy) as accuracy, l.name as landmark, s.gesture,
             (select count(*)::int from photos q where q.slot_idx = p.slot_idx and q.status = 'approved') as slot_approved,
             (select count(*)::int from scans c where c.slot_idx = p.slot_idx) as slot_scans
      from photos p join slots s on s.idx = p.slot_idx join landmarks l on l.id = s.landmark_id
      where ${status === "all" ? sql`true` : sql`p.status = ${status}`}
      order by p.created_at ${status === "pending" ? sql`asc` : sql`desc`}
      limit 200`;
    return json(rows);
  },
  { admin: true },
);

export const POST = route(
  async (req: NextRequest) => {
    const { id, status } = await req.json();
    if (!["approved", "rejected", "pending"].includes(status)) throw new HttpError(400, "bad_status", "狀態錯誤");
    await sql`update photos set status = ${status}, reviewed_at = now() where id = ${id}`;
    return json({ ok: true });
  },
  { admin: true },
);
