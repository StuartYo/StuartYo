"use client";
import { useState } from "react";
import type { Settings } from "@/lib/settings";
import { fromLocalInput, post, toLocalInput, useAdmin } from "./util";

export default function SettingsTab() {
  const { data, reload } = useAdmin<Settings>("/api/admin/settings");
  const [draft, setS] = useState<Settings | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const s = draft ?? data;
  if (!s) return <div className="card muted">載入中…</div>;

  const startChanged = data && data.eventStart !== s.eventStart;
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS({ ...s, [k]: v });
  const numField = (k: keyof Settings, label: string, hint?: string) => (
    <label className="field">
      {label}
      <input className="input" type="number" value={s[k] as number} onChange={(e) => set(k, Number(e.target.value) as never)} />
      {hint && <span className="small muted">{hint}</span>}
    </label>
  );

  async function save(andGenerate = false) {
    try {
      await post("/api/admin/settings", s);
      if (andGenerate) {
        const r = (await post("/api/admin/schedule", { action: "generate" })) as { count: number };
        setMsg({ ok: true, text: `已儲存，並排出 ${r.count} 個時段 🎲` });
      } else setMsg({ ok: true, text: "已儲存" });
      setS(null);
      reload();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : String(e) });
    }
  }

  const end = s.eventStart ? new Date(s.eventStart).getTime() + s.slotCount * s.slotMinutes * 60_000 : null;

  return (
    <>
      <div className="card">
        <h2>🗓️ 活動時間</h2>
        <div className="stats" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          <label className="field">
            開始時間（台灣時間）
            <input
              className="input"
              type="datetime-local"
              value={toLocalInput(s.eventStart ? new Date(s.eventStart).getTime() : null)}
              onChange={(e) => set("eventStart", fromLocalInput(e.target.value))}
            />
            {end && <span className="small muted">結束：{toLocalInput(end).replace("T", " ")}</span>}
          </label>
          {numField("slotCount", "時段數", "120 個 × 60 分鐘 = 5 天")}
          {numField("slotMinutes", "每個時段幾分鐘")}
          {numField("revealAheadMinutes", "下一站提前幾分鐘公布")}
        </div>
        {startChanged && <div className="note warn">改了開始時間或時段數後，請按「儲存並重新排程」，夜間時段才會正確。</div>}
      </div>

      <div className="card">
        <h2>⚙️ 規則細節</h2>
        <div className="stats" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          <label className="field">
            活動名稱
            <input className="input" value={s.eventName} onChange={(e) => set("eventName", e.target.value)} />
          </label>
          {numField("lostMinutes", "幾分鐘沒照片算「奶蛙迷路」")}
          {numField("maxAccuracyM", "定位誤差上限（公尺）", "超過會請對方重試")}
          {numField("maxHopM", "相鄰兩站最遠距離（公尺）", "排程時盡量遵守")}
          {numField("nightStartHour", "夜間開始（幾點）")}
          {numField("nightEndHour", "夜間結束（幾點）")}
          {numField("freezeHours", "最後幾小時凍結排行榜", "0 = 不凍結；凍結期間後台仍看得到即時分數")}
        </div>
      </div>

      {msg && <div className={`note ${msg.ok ? "ok" : "bad"}`}>{msg.text}</div>}
      <div className="btn-row" style={{ marginTop: 12 }}>
        <button className="btn small" onClick={() => save(false)}>
          儲存
        </button>
        <button className="btn small secondary" onClick={() => save(true)}>
          儲存並重新排程
        </button>
      </div>

      <div className="card">
        <h2>🔳 奶蛙身上的 QR Code</h2>
        <p className="sub" style={{ marginTop: 0 }}>
          整場活動都用同一張，指向網站的 /scan 頁面。建議印 A5 以上、護貝，貼在奶蛙胸前或手上。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/admin/qr" alt="QR Code" style={{ width: 220, height: 220, background: "#fff", borderRadius: 12 }} />
        <div style={{ marginTop: 8 }}>
          <a href="/api/admin/qr" download="naiwa-qr.svg">
            下載 SVG（可放大列印）
          </a>
        </div>
      </div>

      <div className="card">
        <h2>🧹 活動結束後</h2>
        <p className="sub" style={{ marginTop: 0 }}>依照規則頁的個資說明，活動結束、確認結果後，請刪除所有定位資料與 IP。分數和照片不受影響。</p>
        <button
          className="btn small danger"
          onClick={async () => {
            if (!confirm("確定刪除所有打卡與照片的定位資料、IP？刪除後無法復原。")) return;
            await post("/api/admin/purge", {});
            setMsg({ ok: true, text: "已刪除定位資料與 IP" });
          }}
        >
          刪除定位資料
        </button>
      </div>
    </>
  );
}
