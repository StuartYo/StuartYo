"use client";
import { formatCountdown, formatTime } from "@/lib/client";
import type { State } from "@/lib/hooks";
import { useAdmin } from "./util";

type O = {
  state: State;
  counts: { pending_photos: number; devices: number; scans: number; flagged: number; slots: number; landmarks: number; depts: number };
  unconfirmed: { idx: number; name: string; pending: number }[];
};

const STATUS: Record<string, string> = {
  waiting: "⏳ 等待合照",
  lost: "🥺 超過時間沒有照片（奶蛙可能迷路）",
  open: "🟡 已開放（照片待審核）",
  confirmed: "✅ 已確認",
  void: "⛔ 已作廢",
};

export default function Overview({ go }: { go: (tab: string) => void }) {
  const { data, error } = useAdmin<O>("/api/admin/overview", 10_000);
  if (error) return <div className="note bad">{error}</div>;
  if (!data) return <div className="card muted">載入中…</div>;
  const { state, counts } = data;
  const cur = state.current;

  const todo: React.ReactNode[] = [];
  if (state.phase === "unscheduled") todo.push(<>還沒設定活動開始時間 → 到「設定」填寫</>);
  if (counts.slots === 0) todo.push(<>還沒排時程 → 設定開始時間後，到「設定」按「產生時程」</>);
  if (counts.pending_photos > 0) todo.push(<>有 {counts.pending_photos} 張照片等待審核</>);
  if (cur?.status === "lost") todo.push(<>第 {cur.number} 站（{cur.landmark.name}）超過時間沒人上傳照片，請找人看看奶蛙在哪</>);

  return (
    <>
      {todo.length > 0 && (
        <div className="note warn">
          <b>待處理</b>
          <ul style={{ margin: "4px 0 0", paddingLeft: 20 }}>
            {todo.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2>現在</h2>
        {state.phase === "running" && cur ? (
          <>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              第 {cur.number} 站・{cur.landmark.name}
            </div>
            <div className="sub">
              {formatTime(cur.startsAt)}–{formatTime(cur.endsAt)}（剩 {formatCountdown(cur.endsAt - state.serverNow)}）・手勢：{cur.gesture}
            </div>
            <div style={{ marginTop: 8 }}>{STATUS[cur.status]}</div>
          </>
        ) : (
          <div className="sub">
            {state.phase === "before" && state.startsAt && `活動將在 ${formatTime(state.startsAt, true)} 開始`}
            {state.phase === "ended" && "活動已結束"}
            {state.phase === "unscheduled" && "尚未設定開始時間"}
          </div>
        )}
        {state.next?.landmark && (
          <div className="sub" style={{ marginTop: 8 }}>
            下一站：{state.next.landmark.name}（{formatTime(state.next.startsAt)}）
          </div>
        )}
      </div>

      <div className="card">
        <div className="stats">
          <Stat k="參賽裝置" v={counts.devices} />
          <Stat k="有效打卡" v={counts.scans} />
          <Stat k="待審核照片" v={counts.pending_photos} onClick={() => go("photos")} />
          <Stat k="可疑紀錄" v={counts.flagged} onClick={() => go("scans")} />
          <Stat k="已排時段" v={counts.slots} onClick={() => go("schedule")} />
          <Stat k="啟用地點" v={counts.landmarks} onClick={() => go("landmarks")} />
          <Stat k="參賽系所" v={counts.depts} onClick={() => go("departments")} />
        </div>
      </div>

      {data.unconfirmed.length > 0 && (
        <div className="card">
          <h2>⚠️ 有打卡、但還沒有通過審核照片的時段</h2>
          <p className="sub" style={{ marginTop: 0 }}>這些時段的分數目前是「待確認」；如果最後沒有任何合格照片，分數會作廢。</p>
          <ul>
            {data.unconfirmed.map((u) => (
              <li key={u.idx}>
                第 {u.idx + 1} 站・{u.name}（{u.pending ? `${u.pending} 張待審核` : "沒有待審核照片"}）
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Stat({ k, v, onClick }: { k: string; v: number; onClick?: () => void }) {
  return (
    <div className="stat" onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
      <div className="v">{v}</div>
      <div className="k">{k}</div>
    </div>
  );
}
