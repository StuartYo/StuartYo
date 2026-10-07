import type { NextRequest } from "next/server";
import { json, route } from "@/lib/http";
import { getSettings, updateSettings } from "@/lib/settings";

export const GET = route(async () => json(await getSettings()), { admin: true });

export const POST = route(
  async (req: NextRequest) => {
    await updateSettings(await req.json());
    return json(await getSettings());
  },
  { admin: true },
);
