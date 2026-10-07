"use client";
import { formatTime } from "@/lib/client";
import { useLive, type State } from "@/lib/hooks";

const STATUS: Record<string, string> = {
  waiting: "等待奶蛙抵達",
  lost: "奶蛙疑似迷路",
  open: "開放打卡中",
  confirmed: "開放打卡中",
  void: "本站暫停",
};

/** 頂部跑馬燈：即時目擊資訊＋奶蛙的生態小知識 */
export default function Ticker({ state: given }: { state?: State | null }) {
  const { data } = useLive<State>(given === undefined ? "/api/state" : null, 30_000);
  const state = given ?? data;
  const items: string[] = [];
  const cur = state?.current;
  if (cur) {
    items.push(`第 ${String(cur.number).padStart(3, "0")} 站 → ${cur.landmark.name}`);
    items.push(`狀態：${STATUS[cur.status]}`);
  } else if (state?.phase === "before" && state.startsAt) items.push(`遷徙開始 ${formatTime(state.startsAt, true)}`);
  else if (state?.phase === "ended") items.push("本季遷徙已結束");
  if (state?.next?.landmark) items.push(`下一站預報 → ${state.next.landmark.name}`);
  items.push(
    "流動的奶蛙 NCHU",
    "身材高大・密度較大・出沒時通常伴隨微弱笑聲",
    "請勿擋住消防通道",
    "奶蛙希望大家和睦相處",
    "NAIWA MIGRATION OBSERVATORY",
  );
  // 內容重複兩次，做出無縫捲動
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
