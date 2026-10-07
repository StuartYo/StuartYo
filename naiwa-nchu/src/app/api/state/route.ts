import { getPublicState } from "@/lib/event";
import { json, route } from "@/lib/http";

export const GET = route(async () => json(await getPublicState()));
