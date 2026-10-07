import { sql } from "@/lib/db";
import { json, route } from "@/lib/http";

/** 活動結束後刪除所有定位資料與 IP（個資保護） */
export const POST = route(
  async () => {
    await sql`update scans set lat = null, lng = null, ip = null`;
    await sql`update photos set lat = null, lng = null`;
    return json({ ok: true });
  },
  { admin: true },
);
