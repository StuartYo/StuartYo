import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * 照片儲存：
 * - 有設定 SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY → 存到 Supabase Storage（bucket 預設 photos，請設為私有）
 * - 沒有設定 → 存在本機 .data/uploads（只適合本機開發）
 */
const bucket = process.env.SUPABASE_BUCKET ?? "photos";
const supabase = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const localDir = path.join(process.cwd(), ".data", "uploads");

function localPath(name: string) {
  const file = path.resolve(localDir, name);
  if (!file.startsWith(localDir + path.sep)) throw new Error("bad photo path");
  return file;
}

export async function savePhoto(name: string, data: Buffer, contentType: string) {
  if (supabase && key) {
    const res = await fetch(`${supabase}/storage/v1/object/${bucket}/${name}`, {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, apikey: key, "content-type": contentType, "x-upsert": "true" },
      body: new Uint8Array(data),
    });
    if (!res.ok) throw new Error(`照片上傳到 Supabase 失敗：${res.status} ${await res.text()}`);
    return;
  }
  const file = localPath(name);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

export async function loadPhoto(name: string): Promise<Buffer | null> {
  if (supabase && key) {
    const res = await fetch(`${supabase}/storage/v1/object/${bucket}/${name}`, {
      headers: { authorization: `Bearer ${key}`, apikey: key },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  }
  try {
    return await readFile(localPath(name));
  } catch {
    return null;
  }
}
