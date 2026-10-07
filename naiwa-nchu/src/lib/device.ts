import type { NextRequest } from "next/server";
import { sql } from "./db";
import { getDeviceId, setDeviceCookie } from "./auth";

export type DeviceRow = { id: string; dept_id: number | null; year: string | null; fp_hash: string | null };

export async function findDevice(req: NextRequest): Promise<DeviceRow | null> {
  const id = getDeviceId(req);
  if (!id) return null;
  const [d] = await sql<DeviceRow[]>`select id, dept_id, year, fp_hash from devices where id = ${id}`;
  if (d) await setDeviceCookie(d.id); // cookie 被清掉但 localStorage 還在時，補回 cookie
  return d ?? null;
}

export async function findOrCreateDevice(req: NextRequest, fp: string | null): Promise<DeviceRow> {
  const found = await findDevice(req);
  if (found) return found;
  const [d] = await sql<DeviceRow[]>`
    insert into devices (fp_hash, user_agent) values (${fp}, ${req.headers.get("user-agent")?.slice(0, 300) ?? null})
    returning id, dept_id, year, fp_hash`;
  await setDeviceCookie(d.id);
  return d;
}

export const YEARS = ["大一", "大二", "大三", "大四", "大五以上", "來賓"] as const;
