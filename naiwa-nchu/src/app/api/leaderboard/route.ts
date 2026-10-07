import { json, route } from "@/lib/http";
import { getLeaderboard } from "@/lib/scoring";

export const GET = route(async () => json(await getLeaderboard()));
