"use client";
import { useState } from "react";
import { formatTime } from "@/lib/client";
import { post, useAdmin } from "./util";

type P = {
  id: string;
  number: number;
  status: string;
  created_at: string;
  distance: number;
  accuracy: number;
  landmark: string;
  gesture: string;
  slot_approved: number;
  slot_scans: number;
};

export default function Photos() {
  const [status, setStatus] = useState("pending");
  const { data, error, reload } = useAdmin<P[]>(`/api/admin/photos?status=${status}`, status === "pending" ? 10_000 : 0);

  async function set(id: string, s: string) {
    await post("/api/admin/photos", { id, status: s });
    reload();
  }

  return (
    <>
      <div className="note info">
        檢查三件事：<b>奶蛙有入鏡</b>、<b>看得出是指定地點</b>、<b>有比出指定手勢</b>。每個時段只要有一張通過，該時段的分數就有效；不合格的照片直接退回就好，不會扣任何人分數。
      </div>
      <div className="chips">
        {[
          ["pending", "待審核"],
          ["approved", "已通過"],
          ["rejected", "已退回"],
        ].map(([k, l]) => (
          <button key={k} className={`chip ${status === k ? "sel" : ""}`} onClick={() => setStatus(k)}>
            {l}
          </button>
        ))}
      </div>
      {error && <div className="note bad">{error}</div>}
      {data && data.length === 0 && <div className="card muted center">沒有照片 🎉</div>}
      <div className="review-grid">
        {data?.map((p) => (
          <div className="card" key={p.id}>
            <a href={`/api/photos/${p.id}`} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/photos/${p.id}`} alt="" loading="lazy" />
            </a>
            <div style={{ marginTop: 8, fontWeight: 800 }}>
              第 {p.number} 站・{p.landmark}
            </div>
            <div className="small">
              手勢應為：<span className="gesture">{p.gesture}</span>
            </div>
            <div className="small muted">
              {formatTime(new Date(p.created_at).getTime(), true)}・距離 {p.distance}m（誤差 {p.accuracy}m）・該站 {p.slot_scans} 次打卡
              {p.slot_approved > 0 && p.status === "pending" && <>・<span className="tag g">此站已有通過的照片</span></>}
            </div>
            <div className="btn-row" style={{ marginTop: 10 }}>
              {p.status !== "approved" && (
                <button className="btn small" onClick={() => set(p.id, "approved")}>
                  ✅ 通過
                </button>
              )}
              {p.status !== "rejected" && (
                <button className="btn small danger" onClick={() => set(p.id, "rejected")}>
                  退回
                </button>
              )}
              {p.status !== "pending" && (
                <button className="btn small secondary" onClick={() => set(p.id, "pending")}>
                  改回待審核
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
