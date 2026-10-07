import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { HttpError, json, num, route } from "@/lib/http";

export const GET = route(
  async () =>
    json(
      await sql`select l.*, (select count(*)::int from slots s where s.landmark_id = l.id) as uses
                from landmarks l order by l.category, l.name`,
    ),
  { admin: true },
);

export const POST = route(
  async (req: NextRequest) => {
    const b = await req.json();
    if (b.op === "delete") {
      const [{ n }] = await sql<{ n: number }[]>`select count(*)::int as n from slots where landmark_id = ${Number(b.id)}`;
      if (n > 0) throw new HttpError(409, "in_use", "這個地點已經排進時段，請改成「停用」再重新排程");
      await sql`delete from landmarks where id = ${Number(b.id)}`;
      return json({ ok: true });
    }
    const row = {
      name: String(b.name ?? "").trim(),
      category: String(b.category ?? "landmark"),
      lat: num(b.lat, "lat"),
      lng: num(b.lng, "lng"),
      radius_m: Math.round(num(b.radius_m ?? 80, "radius_m")),
      night_ok: Boolean(b.night_ok),
      enabled: b.enabled !== false,
      hint: String(b.hint ?? ""),
      notes: String(b.notes ?? ""),
    };
    if (!row.name) throw new HttpError(400, "bad_name", "請填寫地點名稱");
    if (b.id) await sql`update landmarks set ${sql(row)} where id = ${Number(b.id)}`;
    else await sql`insert into landmarks ${sql(row)}`;
    return json({ ok: true });
  },
  { admin: true },
);
