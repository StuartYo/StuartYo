"use client";
import { useState } from "react";
import { formatTime } from "@/lib/client";
import { useNow } from "@/lib/hooks";
import { post, useAdmin } from "./util";

type Slot = {
  idx: number;
  landmark_id: number;
  name: string;
  gesture: string;
  voided: boolean;
  approved: number;
  pending: number;
  scans: number;
  start?: number;
  end?: number;
  night?: boolean;
};
type L = { id: number; name: string; enabled: boolean };

export default function Schedule() {
  const { data, error, reload } = useAdmin<Slot[]>("/api/admin/schedule", 30_000);
  const { data: landmarks } = useAdmin<L[]>("/api/admin/landmarks");
  const [msg, setMsg] = useState<string | null>(null);
  const now = useNow();

  async function update(idx: number, patch: Record<string, unknown>) {
    try {
      await post("/api/admin/schedule", { action: "update", idx, ...patch });
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  async function regenerate() {
    if (!confirm("重新隨機排出所有「還沒開始」的時段？已經開始的時段不會變動。")) return;
    try {
      const r = (await post("/api/admin/schedule", { action: "generate" })) as { count: number };
      setMsg(`已重新排出 ${r.count} 個時段`);
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  const uses = new Map<string, number>();
  data?.forEach((s) => uses.set(s.name, (uses.get(s.name) ?? 0) + 1));

  return (
    <>
      <div className="card">
        <div className="row" style={{ flexWrap: "wrap" }}>
          <div>
            <h2 style={{ marginBottom: 2 }}>📅 時程表</h2>
            <div className="sub">
              地點和手勢是隨機排的，前台只會看到目前和下一站。夜間時段（🌙）只會排到「晚上可去」的地點。
            </div>
          </div>
          <span className="spacer" />
          <button className="btn small" onClick={regenerate}>
            🎲 重新排程
          </button>
        </div>
        {msg && <div className="note info">{msg}</div>}
        {data && data.length > 0 && (
          <details style={{ marginTop: 10 }}>
            <summary className="small">各地點出現次數</summary>
            <div className="small muted" style={{ marginTop: 6 }}>
              {[...uses.entries()].sort((a, b) => b[1] - a[1]).map(([n, c]) => `${n} ×${c}`).join("、")}
            </div>
          </details>
        )}
      </div>
      {error && <div className="note bad">{error}</div>}
      {data && data.length === 0 && <div className="card muted">還沒有時程。請先到「設定」填開始時間，再按「重新排程」。</div>}
      {data && data.length > 0 && (
        <div className="card table-wrap">
          <table className="t">
            <thead>
              <tr>
                <th>#</th>
                <th>時間</th>
                <th>地點</th>
                <th>手勢</th>
                <th>照片</th>
                <th>打卡</th>
                <th>作廢</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => {
                const isNow = s.start !== undefined && now >= s.start && now < s.end!;
                const past = s.end !== undefined && now >= s.end;
                return (
                  <tr key={s.idx} className={isNow ? "now" : s.voided ? "dim" : ""}>
                    <td>
                      {s.idx + 1}
                      {isNow && " 👈"}
                    </td>
                    <td>
                      {s.start ? formatTime(s.start, true) : "—"} {s.night && "🌙"}
                    </td>
                    <td>
                      <select
                        className="input"
                        value={s.landmark_id}
                        onChange={(e) => update(s.idx, { landmarkId: Number(e.target.value) })}
                        disabled={past}
                      >
                        {landmarks?.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                            {!l.enabled ? "（停用）" : ""}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="input"
                        defaultValue={s.gesture}
                        style={{ width: 170 }}
                        onBlur={(e) => e.target.value !== s.gesture && update(s.idx, { gesture: e.target.value })}
                      />
                    </td>
                    <td>
                      {s.approved > 0 && <span className="tag g">通過 {s.approved}</span>}
                      {s.pending > 0 && <span className="tag">待審 {s.pending}</span>}
                      {past && !s.approved && !s.pending && <span className="tag r">無</span>}
                    </td>
                    <td>{s.scans}</td>
                    <td>
                      <input type="checkbox" checked={s.voided} onChange={(e) => update(s.idx, { voided: e.target.checked })} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
