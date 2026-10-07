import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { HttpError, route } from "@/lib/http";
import { loadPhoto } from "@/lib/storage";

export const GET = route(async (_req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/.test(id)) throw new HttpError(404, "not_found", "找不到照片");
  const [p] = await sql<{ path: string; status: string }[]>`select path, status from photos where id = ${id}`;
  // 還沒審核的照片只有管理員看得到（避免不雅照片直接公開）
  const admin = p && p.status !== "approved" ? await isAdmin() : false;
  if (!p || (p.status !== "approved" && !admin)) throw new HttpError(404, "not_found", "找不到照片");
  const data = await loadPhoto(p.path);
  if (!data) throw new HttpError(404, "not_found", "找不到照片");
  return new Response(new Uint8Array(data), {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": p.status === "approved" ? "public, max-age=3600" : "private, no-store",
    },
  });
});
