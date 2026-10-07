import { adminLogout } from "@/lib/auth";
import { json, route } from "@/lib/http";

export const POST = route(async () => {
  await adminLogout();
  return json({ ok: true });
});
