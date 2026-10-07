import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { clientIp } from "@/lib/auth";
import { findDevice } from "@/lib/device";
import { getClock, getSlot, isOpen, slotStatus } from "@/lib/event";
import { HttpError, json, route } from "@/lib/http";
import { checkPresence } from "@/lib/presence";
import { computeWeights, getDepartments } from "@/lib/scoring";
import { getSettings } from "@/lib/settings";

export const POST = route(async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  const device = await findDevice(req);
  if (!device?.dept_id) throw new HttpError(409, "need_dept", "請先選擇你的系級");

  const s = await getSettings();
  const clock = getClock(s);
  if (clock.phase !== "running") throw new HttpError(409, "not_running", "現在不是活動時間喔");
  const slot = await getSlot(clock.idx!);
  if (!slot) throw new HttpError(409, "no_slot", "這個時段還沒排定地點，請通知工作人員");
  const status = slotStatus(slot, s);
  if (status === "void") throw new HttpError(409, "void", "這個時段暫停計分");
  if (!isOpen(status))
    throw new HttpError(409, "not_open", "奶蛙還沒抵達！要等有人上傳奶蛙和地標的合照，才會開放打卡。");

  const p = checkPresence(body, slot, s);
  const fp = typeof body.fp === "string" ? body.fp.slice(0, 64) : null;

  // 可疑紀錄只標記給工作人員看，不直接擋
  const flags: string[] = [];
  if (p.accuracy < 1) flags.push("accuracy_zero");
  if (fp) {
    const [dup] = await sql`select 1 from scans where slot_idx = ${slot.idx} and fp_hash = ${fp} and device_id <> ${device.id} limit 1`;
    if (dup) flags.push("same_fingerprint");
  }
  if (fp && device.fp_hash && fp !== device.fp_hash) flags.push("fingerprint_changed");

  const inserted = await sql`
    insert into scans (slot_idx, device_id, dept_id, year, lat, lng, accuracy, distance_m, ip, fp_hash, flags)
    values (${slot.idx}, ${device.id}, ${device.dept_id}, ${device.year}, ${p.lat}, ${p.lng}, ${p.accuracy},
            ${p.distance}, ${clientIp(req)}, ${fp}, ${flags})
    on conflict (slot_idx, device_id) do nothing
    returning id`;
  if (inserted.length === 0) throw new HttpError(409, "already", "這個時段已經打過卡囉，下個時段再來！");

  const depts = await getDepartments();
  const weight = computeWeights(depts.filter((d) => d.enabled)).weights.get(device.dept_id) ?? 1;
  const dept = depts.find((d) => d.id === device.dept_id);
  return json({ ok: true, points: weight, dept: dept?.short ?? dept?.name, pending: status !== "confirmed" });
});
