import { sql } from "@/lib/db";
import { json, route } from "@/lib/http";

/** 奶蛙旅行相簿：每個時段第一張通過審核的照片 */
export const GET = route(async () => {
  const rows = await sql`
    select distinct on (p.slot_idx) p.id, p.slot_idx + 1 as number, l.name as landmark, p.created_at
    from photos p join slots s on s.idx = p.slot_idx join landmarks l on l.id = s.landmark_id
    where p.status = 'approved' and not s.voided
    order by p.slot_idx desc, p.created_at`;
  return json(rows);
});
