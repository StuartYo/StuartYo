import { sql } from "@/lib/db";
import { route } from "@/lib/http";

export const GET = route(
  async () => {
    const rows = await sql`
      select c.slot_idx + 1 as 時段, l.name as 地點, d.name as 系所, c.year as 年級, c.created_at as 時間,
             round(c.distance_m) as 距離m, c.excluded as 已排除, array_to_string(c.flags, ' ') as 標記
      from scans c join departments d on d.id = c.dept_id join slots s on s.idx = c.slot_idx
      join landmarks l on l.id = s.landmark_id order by c.created_at`;
    const cols = rows.columns.map((c) => c.name);
    const esc = (v: unknown) => {
      const t = v instanceof Date ? v.toISOString() : String(v ?? "");
      return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
    };
    const csv = "﻿" + [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    return new Response(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": 'attachment; filename="naiwa-scans.csv"',
      },
    });
  },
  { admin: true },
);
