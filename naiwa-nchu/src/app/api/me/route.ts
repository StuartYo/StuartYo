import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { deviceToken } from "@/lib/auth";
import { findDevice, findOrCreateDevice, YEARS } from "@/lib/device";
import { getClock } from "@/lib/event";
import { HttpError, json, route } from "@/lib/http";
import { getSettings } from "@/lib/settings";

async function describe(deviceId: string) {
  const s = await getSettings();
  const clock = getClock(s);
  const [d] = await sql<{ dept_id: number | null; year: string | null; dept_name: string | null; dept_short: string | null }[]>`
    select d.dept_id, d.year, p.name as dept_name, p.short as dept_short
    from devices d left join departments p on p.id = d.dept_id where d.id = ${deviceId}`;
  const [stats] = await sql<{ scans: number; current: boolean; photo_current: boolean }[]>`
    select
      (select count(*)::int from scans where device_id = ${deviceId}) as scans,
      exists (select 1 from scans where device_id = ${deviceId} and slot_idx = ${clock.idx ?? -1}) as current,
      exists (select 1 from photos where device_id = ${deviceId} and slot_idx = ${clock.idx ?? -1} and status <> 'rejected') as photo_current`;
  return {
    token: deviceToken(deviceId),
    code: deviceId.slice(0, 6).toUpperCase(),
    deptId: d?.dept_id ?? null,
    deptName: d?.dept_name ?? null,
    deptShort: d?.dept_short ?? null,
    year: d?.year ?? null,
    totalScans: stats.scans,
    scannedCurrent: stats.current,
    uploadedCurrent: stats.photo_current,
    // 還沒掃過碼之前都可以改系級，掃過之後就鎖定
    canChangeDept: stats.scans === 0,
  };
}

export const GET = route(async (req: NextRequest) => {
  const d = await findDevice(req);
  return json(d ? await describe(d.id) : null);
});

/** 選擇（或在第一次掃碼前修改）系級 */
export const POST = route(async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  const deptId = Number(body.deptId);
  const year = String(body.year ?? "");
  if (!YEARS.includes(year as (typeof YEARS)[number])) throw new HttpError(400, "bad_year", "請選擇年級");
  const [dept] = await sql`select id from departments where id = ${deptId} and enabled`;
  if (!dept) throw new HttpError(400, "bad_dept", "請選擇系所");
  const fp = typeof body.fp === "string" ? body.fp.slice(0, 64) : null;
  const d = await findOrCreateDevice(req, fp);
  if (d.dept_id && d.dept_id !== deptId) {
    const [{ n }] = await sql<{ n: number }[]>`select count(*)::int as n from scans where device_id = ${d.id}`;
    if (n > 0) throw new HttpError(409, "dept_locked", "這台裝置已經替其他系打過卡，不能更換系所。如果選錯了，請找工作人員協助。");
  }
  await sql`update devices set dept_id = ${deptId}, year = ${year}, fp_hash = coalesce(fp_hash, ${fp}) where id = ${d.id}`;
  return json(await describe(d.id));
});
