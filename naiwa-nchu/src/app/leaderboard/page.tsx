"use client";
import BoardList from "@/components/BoardList";
import TopBar from "@/components/TopBar";
import { formatTime } from "@/lib/client";
import { useLive, useMe, type Board } from "@/lib/hooks";

export default function LeaderboardPage() {
  const { data, error } = useLive<Board>("/api/leaderboard", 15_000);
  const { me } = useMe();
  const total = data?.rows.reduce((a, r) => a + r.confirmedScans + r.pendingScans, 0) ?? 0;
  return (
    <>
      <TopBar />
      <main className="wrap">
        <h1 style={{ fontSize: 24, margin: "18px 4px 0" }}>🏆 系所排行榜</h1>
        <p className="small muted" style={{ margin: "4px 4px 0" }}>
          每 15 秒自動更新{data ? `・最後更新 ${formatTime(data.updatedAt)}` : ""}・全校累積 {total} 次打卡
        </p>
        {data?.frozenAt && (
          <div className="note warn">🙈 排行榜在 {formatTime(data.frozenAt, true)} 凍結了，最後結果將在頒獎時揭曉！</div>
        )}
        {error && <div className="note bad">{error}</div>}
        <div className="card">
          {!data ? <div className="muted center">載入中…</div> : <BoardList rows={data.rows} myDeptId={me?.deptId} detail />}
        </div>
        <div className="card">
          <h2>🧮 分數怎麼算？</h2>
          <p className="small" style={{ marginTop: 0 }}>
            為了讓人數少的系也有機會，每次打卡的分數依系上人數調整：
            <b> 每次分數 = √(各系人數中位數) ÷ √(你的系人數)</b>。人數接近中位數的系每次約 1 分，人少的系每次分數比較高。
          </p>
          <p className="small" style={{ marginBottom: 0 }}>
            黃色的「待確認」分數，是該時段的合照還在等工作人員確認；確認後就會變成正式分數。如果某個時段最後沒有任何合格的合照（例如奶蛙沒入鏡），那個時段的分數會作廢。
          </p>
        </div>
      </main>
    </>
  );
}
