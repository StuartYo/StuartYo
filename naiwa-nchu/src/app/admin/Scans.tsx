"use client";
import { useState } from "react";
import { formatTime } from "@/lib/client";
import { post, useAdmin } from "./util";

type S = {
  id: number;
  number: number;
  created_at: string;
  flags: string[];
  excluded: boolean;
  distance: number;
  accuracy: number;
  ip: string | null;
  device: string;
  dept: string;
  year: string;
};

const FLAG_TEXT: Record<string, string> = {
  same_fingerprint: "同時段有特徵相同的另一台裝置",
  fingerprint_changed: "裝置特徵跟第一次不同",
  accuracy_zero: "定位誤差 0（可能是模擬定位）",
};

export default function Scans() {
  const [flagged, setFlagged] = useState(true);
  const [device, setDevice] = useState("");
  const q = `/api/admin/scans?flagged=${flagged ? 1 : 0}&device=${encodeURIComponent(device)}`;
  const { data, error, reload } = useAdmin<S[]>(q);

  return (
    <>
      <div className="note info">
        這裡的標記只是提醒，不一定是作弊（例如同型號的 iPhone 特徵可能一樣）。同一個 IP 很多筆通常是校園 Wi-Fi，也很正常。確定有問題的紀錄可以「排除」，排除後不計分。
      </div>
      <div className="row" style={{ flexWrap: "wrap", marginTop: 12 }}>
        <div className="chips" style={{ marginTop: 0 }}>
          <button className={`chip ${flagged ? "sel" : ""}`} onClick={() => setFlagged(true)}>
            只看有標記的
          </button>
          <button className={`chip ${!flagged ? "sel" : ""}`} onClick={() => setFlagged(false)}>
            全部（最近 300 筆）
          </button>
        </div>
        <input className="input" style={{ width: 160 }} placeholder="裝置代碼" value={device} onChange={(e) => setDevice(e.target.value)} />
        <a className="btn small secondary" href="/api/admin/export">
          ⬇️ 匯出全部 CSV
        </a>
      </div>
      {error && <div className="note bad">{error}</div>}
      <div className="card table-wrap">
        <table className="t">
          <thead>
            <tr>
              <th>時間</th>
              <th>站</th>
              <th>系級</th>
              <th>裝置</th>
              <th>距離/誤差</th>
              <th>IP</th>
              <th>標記</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((s) => (
              <tr key={s.id} className={s.excluded ? "dim" : ""}>
                <td>{formatTime(new Date(s.created_at).getTime(), true)}</td>
                <td>{s.number}</td>
                <td>
                  {s.dept} {s.year}
                </td>
                <td>
                  <code>{s.device}</code>
                </td>
                <td>
                  {s.distance}m / {s.accuracy}m
                </td>
                <td className="small">{s.ip}</td>
                <td style={{ whiteSpace: "normal" }}>
                  {s.flags.map((f) => (
                    <span key={f} className="tag" title={FLAG_TEXT[f]}>
                      {FLAG_TEXT[f] ?? f}
                    </span>
                  ))}
                </td>
                <td>
                  <button
                    className={`btn small ${s.excluded ? "secondary" : "danger"}`}
                    onClick={async () => {
                      await post("/api/admin/scans", { id: s.id, excluded: !s.excluded });
                      reload();
                    }}
                  >
                    {s.excluded ? "恢復" : "排除"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length === 0 && <div className="muted center" style={{ padding: 16 }}>沒有紀錄</div>}
      </div>
    </>
  );
}
