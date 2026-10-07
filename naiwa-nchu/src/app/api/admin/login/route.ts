import type { NextRequest } from "next/server";
import { adminLogin } from "@/lib/auth";
import { HttpError, json, route } from "@/lib/http";

export const POST = route(async (req: NextRequest) => {
  const { password } = await req.json().catch(() => ({}));
  if (!(await adminLogin(String(password ?? "")))) throw new HttpError(401, "wrong_password", "密碼錯誤");
  return json({ ok: true });
});
