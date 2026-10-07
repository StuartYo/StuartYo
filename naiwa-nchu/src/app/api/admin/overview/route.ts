import { sql } from "@/lib/db";
import { getPublicState } from "@/lib/event";
import { json, route } from "@/lib/http";
import { getSettings } from "@/lib/settings";

export const GET = route(
  async () => {
    const state = await getPublicState();
    const settings = await getSettings();
    const [counts] = await sql<
      { pending_photos: number; devices: number; scans: number; flagged: number; slots: number; landmarks: number; depts: number }[]
    >`select
        (select count(*)::int from photos where status = 'pending') as pending_photos,
        (select count(*)::int from devices where dept_id is not null) as devices,
        (select count(*)::int from scans where not excluded) as scans,
        (select count(*)::int from scans where cardinality(flags) > 0 and not excluded) as flagged,
        (select count(*)::int from slots) as slots,
        (select count(*)::int from landmarks where enabled) as landmarks,
        (select count(*)::int from departments where enabled) as depts`;
    // 已結束但沒有任何通過審核照片的時段（分數會作廢）
    const unconfirmed = await sql<{ idx: number; name: string; pending: number }[]>`
      select s.idx, l.name,
        (select count(*)::int from photos p where p.slot_idx = s.idx and p.status = 'pending') as pending
      from slots s join landmarks l on l.id = s.landmark_id
      where not s.voided
        and not exists (select 1 from photos p where p.slot_idx = s.idx and p.status = 'approved')
        and exists (select 1 from scans c where c.slot_idx = s.idx)
      order by s.idx`;
    return json({ state, settings, counts, unconfirmed, hasDb: true });
  },
  { admin: true },
);
