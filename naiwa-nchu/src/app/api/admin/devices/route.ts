import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { HttpError, json, route } from "@/lib/http";

/** 有人選錯系所時，工作人員用裝置代碼（手機上顯示的 6 碼）幫忙改 */
export const POST = route(
  async (req: NextRequest) => {
    const { code, deptId, moveScans } = await req.json();
    const prefix = String(code ?? "").toLowerCase().replace(/[^0-9a-f]/g, "");
    if (prefix.length !== 6) throw new HttpError(400, "bad_code", "裝置代碼是 6 碼");
    const devices = await sql<{ id: string }[]>`select id from devices where id::text like ${prefix + "%"}`;
    if (devices.length !== 1) throw new HttpError(404, "not_found", devices.length ? "代碼重複，請改用掃碼紀錄查詢" : "找不到這台裝置");
    const [dept] = await sql`select id from departments where id = ${Number(deptId)}`;
    if (!dept) throw new HttpError(400, "bad_dept", "找不到系所");
    await sql`update devices set dept_id = ${Number(deptId)} where id = ${devices[0].id}`;
    if (moveScans) await sql`update scans set dept_id = ${Number(deptId)} where device_id = ${devices[0].id}`;
    return json({ ok: true });
  },
  { admin: true },
);
