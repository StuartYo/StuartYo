import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { HttpError, json, route } from "@/lib/http";
import { computeWeights, getDepartments } from "@/lib/scoring";

export const GET = route(
  async () => {
    const depts = await getDepartments();
    const { weights, median } = computeWeights(depts);
    return json({ median, rows: depts.map((d) => ({ ...d, weight: weights.get(d.id) })) });
  },
  { admin: true },
);

export const POST = route(
  async (req: NextRequest) => {
    const b = await req.json();
    const optNum = (v: unknown) => (v === null || v === "" || v === undefined ? null : Number(v));
    const row = {
      college: String(b.college ?? "").trim(),
      name: String(b.name ?? "").trim(),
      short: String(b.short ?? b.name ?? "").trim(),
      kind: String(b.kind ?? "學士班"),
      students: optNum(b.students),
      weight_override: optNum(b.weight_override),
      enabled: b.enabled !== false,
    };
    if (!row.name) throw new HttpError(400, "bad_name", "請填寫系所名稱");
    if (b.id) await sql`update departments set ${sql(row)} where id = ${Number(b.id)}`;
    else await sql`insert into departments ${sql(row)}`;
    return json({ ok: true });
  },
  { admin: true },
);
