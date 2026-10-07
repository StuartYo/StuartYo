import { connection, type NextRequest } from "next/server";
import { isAdmin } from "./auth";

export class HttpError extends Error {
  constructor(public status: number, public code: string, message: string, public extra?: Record<string, unknown>) {
    super(message);
  }
}

export function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: { "cache-control": "no-store", ...(init?.headers ?? {}) },
  });
}

type Handler<C> = (req: NextRequest, ctx: C) => Promise<Response>;

/** 統一處理錯誤，回傳 { error, code } 給前端顯示 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function route<C = any>(fn: Handler<C>, opts: { admin?: boolean } = {}) {
  return async (req: NextRequest, ctx: C) => {
    // 所有 API 都依每次請求即時計算，不在 build 時預先產生
    await connection();
    try {
      if (opts.admin && !(await isAdmin())) throw new HttpError(401, "unauthorized", "請先登入管理後台");
      return await fn(req, ctx);
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message, code: e.code, ...e.extra }, { status: e.status });
      console.error(e);
      return json({ error: "伺服器出了點問題，請稍後再試", code: "server_error" }, { status: 500 });
    }
  };
}

export function num(v: unknown, name: string) {
  const n = typeof v === "string" ? Number(v) : v;
  if (typeof n !== "number" || !Number.isFinite(n)) throw new HttpError(400, "bad_request", `缺少或錯誤的欄位：${name}`);
  return n;
}
