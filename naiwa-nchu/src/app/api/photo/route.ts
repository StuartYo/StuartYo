import type { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { sql } from "@/lib/db";
import { findOrCreateDevice } from "@/lib/device";
import { getClock, getSlot } from "@/lib/event";
import { HttpError, json, route } from "@/lib/http";
import { notify } from "@/lib/notify";
import { checkPresence } from "@/lib/presence";
import { getSettings } from "@/lib/settings";
import { savePhoto } from "@/lib/storage";

const MAX_BYTES = 4 * 1024 * 1024;

/** 上傳「奶蛙＋地標＋手勢」合照。第一張照片上傳後，這個時段就開放打卡。 */
export const POST = route(async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get("photo");
  if (!(file instanceof File) || !file.type.startsWith("image/")) throw new HttpError(400, "no_photo", "請拍一張照片");
  if (file.size > MAX_BYTES) throw new HttpError(413, "too_big", "照片太大了，請再試一次");

  const s = await getSettings();
  const clock = getClock(s);
  if (clock.phase !== "running") throw new HttpError(409, "not_running", "現在不是活動時間喔");
  const slot = await getSlot(clock.idx!);
  if (!slot) throw new HttpError(409, "no_slot", "這個時段還沒排定地點，請通知工作人員");
  if (slot.voided) throw new HttpError(409, "void", "這個時段暫停計分");

  const body = Object.fromEntries(["lat", "lng", "accuracy"].map((k) => [k, form.get(k)]));
  const p = checkPresence(body, slot, s);
  const fp = typeof form.get("fp") === "string" ? String(form.get("fp")).slice(0, 64) : null;
  const device = await findOrCreateDevice(req, fp);

  const [{ n }] = await sql<{ n: number }[]>`
    select count(*)::int as n from photos where slot_idx = ${slot.idx} and device_id = ${device.id}`;
  if (n >= 3) throw new HttpError(429, "too_many", "這個時段你已經上傳 3 張照片了，等工作人員審核就好囉");

  const id = randomUUID();
  const name = `slot-${String(slot.idx + 1).padStart(3, "0")}/${id}.jpg`;
  await savePhoto(name, Buffer.from(await file.arrayBuffer()), file.type);
  await sql`
    insert into photos (id, slot_idx, device_id, path, lat, lng, accuracy, distance_m)
    values (${id}, ${slot.idx}, ${device.id}, ${name}, ${p.lat}, ${p.lng}, ${p.accuracy}, ${p.distance})`;

  const firstOne = slot.pending + slot.approved === 0;
  notify(`📸 第 ${slot.idx + 1} 時段（${slot.name}）有新照片待審核${firstOne ? "，已開放打卡" : ""}。`);
  return json({ ok: true, opened: firstOne });
});
