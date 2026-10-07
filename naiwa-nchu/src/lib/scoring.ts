import { sql } from "./db";
import { getClock } from "./event";
import { getSettings } from "./settings";

export type Department = {
  id: number;
  college: string;
  name: string;
  short: string;
  kind: string;
  students: number | null;
  weight_override: number | null;
  enabled: boolean;
};

/**
 * 加權方式：每次掃碼的分數 = √(各系人數中位數) ÷ √(該系人數)
 * 人數接近中位數的系 ≈ 1 分；人少的系每次掃碼分數較高，人多的系較低。
 * 開根號是為了不要讓人少的系優勢過大。上下限 0.5～3 分。
 */
export function computeWeights(depts: Department[]) {
  const sizes = depts
    .filter((d) => d.enabled && d.students && d.students > 0)
    .map((d) => d.students!)
    .sort((a, b) => a - b);
  const median = sizes.length
    ? sizes.length % 2
      ? sizes[(sizes.length - 1) / 2]
      : (sizes[sizes.length / 2 - 1] + sizes[sizes.length / 2]) / 2
    : 1;
  const weights = new Map<number, number>();
  for (const d of depts) {
    let w = d.weight_override ?? (d.students ? Math.sqrt(median) / Math.sqrt(d.students) : 1);
    w = Math.round(Math.min(3, Math.max(0.5, w)) * 100) / 100;
    weights.set(d.id, w);
  }
  return { weights, median };
}

export async function getDepartments() {
  return sql<Department[]>`select * from departments order by id`;
}

export type BoardRow = {
  id: number;
  name: string;
  short: string;
  college: string;
  students: number | null;
  weight: number;
  confirmedScans: number;
  pendingScans: number;
  participants: number;
  score: number;
  pendingScore: number;
};

export async function getLeaderboard({ admin = false } = {}) {
  const s = await getSettings();
  const clock = getClock(s);
  let frozenAt: number | null = null;
  if (!admin && s.freezeHours > 0 && clock.end) {
    const f = clock.end - s.freezeHours * 3600_000;
    if (Date.now() >= f) frozenAt = f;
  }

  const depts = (await getDepartments()).filter((d) => d.enabled);
  const { weights } = computeWeights(depts);
  const counts = await sql<{ dept_id: number; confirmed: number; pending: number; participants: number }[]>`
    with st as (
      select s.idx,
        case
          when s.voided then 'void'
          when exists (select 1 from photos p where p.slot_idx = s.idx and p.status = 'approved') then 'confirmed'
          when exists (select 1 from photos p where p.slot_idx = s.idx and p.status = 'pending') then 'pending'
          else 'none'
        end as state
      from slots s
    )
    select c.dept_id,
      count(*) filter (where st.state = 'confirmed')::int as confirmed,
      count(*) filter (where st.state = 'pending')::int as pending,
      count(distinct c.device_id) filter (where st.state in ('confirmed','pending'))::int as participants
    from scans c join st on st.idx = c.slot_idx
    where not c.excluded ${frozenAt ? sql`and c.created_at < ${new Date(frozenAt)}` : sql``}
    group by c.dept_id`;
  const byDept = new Map(counts.map((c) => [c.dept_id, c]));

  const rows: BoardRow[] = depts.map((d) => {
    const c = byDept.get(d.id);
    const w = weights.get(d.id) ?? 1;
    const confirmed = c?.confirmed ?? 0;
    const pending = c?.pending ?? 0;
    return {
      id: d.id,
      name: d.name,
      short: d.short,
      college: d.college,
      students: d.students,
      weight: w,
      confirmedScans: confirmed,
      pendingScans: pending,
      participants: c?.participants ?? 0,
      score: Math.round((confirmed + pending) * w * 100) / 100,
      pendingScore: Math.round(pending * w * 100) / 100,
    };
  });
  rows.sort((a, b) => b.score - a.score || b.confirmedScans - a.confirmedScans || a.id - b.id);
  return { frozenAt, rows, updatedAt: Date.now() };
}
