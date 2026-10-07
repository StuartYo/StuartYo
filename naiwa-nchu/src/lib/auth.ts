import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s && process.env.NODE_ENV === "production") throw new Error("缺少環境變數 SESSION_SECRET");
  return s ?? "dev-only-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function verify(token: string | undefined | null): string | null {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const value = token.slice(0, i);
  const a = Buffer.from(token.slice(i + 1));
  const b = Buffer.from(sign(value));
  return a.length === b.length && timingSafeEqual(a, b) ? value : null;
}

// ---- 裝置 ----
// 裝置 token 同時存在 cookie 和 localStorage（由前端放在 x-device header 帶上），
// 其中一個被清掉時還能用另一個認回同一台裝置。

export const DEVICE_COOKIE = "nw_device";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function deviceToken(id: string) {
  return `${id}.${sign(`device:${id}`)}`;
}

function verifyDevice(token: string | undefined | null) {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const id = token.slice(0, i);
  if (!UUID_RE.test(id)) return null;
  return verify(`device:${id}.${token.slice(i + 1)}`) ? id : null;
}

export function getDeviceId(req: NextRequest): string | null {
  return verifyDevice(req.cookies.get(DEVICE_COOKIE)?.value) ?? verifyDevice(req.headers.get("x-device"));
}

export async function setDeviceCookie(id: string) {
  (await cookies()).set(DEVICE_COOKIE, deviceToken(id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
}

// ---- 管理員 ----

const ADMIN_COOKIE = "nw_admin";

export async function isAdmin(): Promise<boolean> {
  const value = verify((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!value?.startsWith("admin:")) return false;
  return Number(value.slice(6)) > Date.now();
}

export async function adminLogin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("缺少環境變數 ADMIN_PASSWORD");
  const a = Buffer.from(sign(`pw:${password}`));
  const b = Buffer.from(sign(`pw:${expected}`));
  if (!timingSafeEqual(a, b)) return false;
  const value = `admin:${Date.now() + 1000 * 60 * 60 * 24 * 7}`;
  (await cookies()).set(ADMIN_COOKIE, `${value}.${sign(value)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function adminLogout() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export function clientIp(req: NextRequest) {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";
}
