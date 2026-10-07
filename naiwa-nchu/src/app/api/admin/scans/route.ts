import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { json, route } from "@/lib/http";

const FLAG_SQL = `cardinality(c.flags) > 0`;

export const GET = route(
  async (req: NextRequest) => {
    const q = req.nextUrl.searchParams;
    const flagged = q.get("flagged") === "1";
    const code = (q.get("device") ?? "").toLowerCase().replace(/[^0-9a-f]/g, "");
    const rows = await sql`
      select c.id, c.slot_idx + 1 as number, c.created_at, c.flags, c.excluded, round(c.distance_m) as distance,
             round(c.accuracy) as accuracy, c.ip, upper(left(c.device_id::text, 6)) as device, d.short as dept, c.year
      from scans c join departments d on d.id = c.dept_id
      where ${flagged ? sql.unsafe(FLAG_SQL) : sql`true`}
        and ${code ? sql`c.device_id::text like ${code + "%"}` : sql`true`}
      order by c.created_at desc limit 300`;
    return json(rows);
  },
  { admin: true },
);

/** 排除／恢復某筆掃碼紀錄 */
export const POST = route(
  async (req: NextRequest) => {
    const { id, excluded } = await req.json();
    await sql`update scans set excluded = ${Boolean(excluded)} where id = ${Number(id)}`;
    return json({ ok: true });
  },
  { admin: true },
);
