import type { Board } from "@/lib/hooks";

export default function BoardList({
  rows,
  myDeptId,
  limit,
  detail = false,
}: {
  rows: Board["rows"];
  myDeptId?: number | null;
  limit?: number;
  detail?: boolean;
}) {
  const max = Math.max(1, ...rows.map((r) => r.score));
  let shown = limit ? rows.slice(0, limit) : rows;
  const myIdx = rows.findIndex((r) => r.id === myDeptId);
  const showMine = limit && myIdx >= limit;
  if (showMine) shown = [...shown, rows[myIdx]];

  return (
    <ol className="board">
      {shown.map((r) => {
        // 同分同名次
        const displayRank = rows.findIndex((x) => x.score === r.score);
        return (
          <li key={r.id} className={r.id === myDeptId ? "mine" : ""}>
            <span className={`rank ${displayRank < 3 && r.score > 0 ? `top r${displayRank + 1}` : ""}`}>
              {r.score === 0 ? "–" : displayRank + 1}
            </span>
            <div>
              <div className="name">
                {detail ? r.name : r.short}
                {r.id === myDeptId && <span className="label" style={{ marginLeft: 6 }}>YOU</span>}
              </div>
              <div className="meta">
                {r.participants} 人・×{r.weight}{detail && r.students ? `・全系 ${r.students}` : ""}
                {detail ? `・${r.confirmedScans + r.pendingScans} 次` : ""}
              </div>
              <div className="bar" aria-hidden>
                <span style={{ width: `${((r.score - r.pendingScore) / max) * 100}%` }} />
                <span className="p" style={{ width: `${(r.pendingScore / max) * 100}%` }} />
              </div>
            </div>
            <div className="score">
              {r.score}
              {r.pendingScore > 0 && <small>待確認 {r.pendingScore}</small>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
