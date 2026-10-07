"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { post, useAdmin } from "./util";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false, loading: () => <div className="map" /> });

type L = {
  id?: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  radius_m: number;
  night_ok: boolean;
  enabled: boolean;
  hint: string;
  notes: string;
  uses?: number;
};

const CATS: Record<string, string> = {
  landmark: "地標",
  academic: "系館",
  sports: "運動",
  food: "餐飲",
  dorm: "宿舍",
  life: "生活",
};

const EMPTY: L = { name: "", category: "landmark", lat: 24.1213, lng: 120.6755, radius_m: 80, night_ok: false, enabled: true, hint: "", notes: "" };

export default function Landmarks() {
  const { data, error, reload } = useAdmin<L[]>("/api/admin/landmarks");
  const [edit, setEdit] = useState<L | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    if (!edit) return;
    try {
      await post("/api/admin/landmarks", edit);
      setEdit(null);
      setMsg("已儲存。若改了啟用狀態或「晚上可去」，記得到「時程」重新排程。");
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  async function remove(l: L) {
    if (!confirm(`刪除「${l.name}」？`)) return;
    try {
      await post("/api/admin/landmarks", { op: "delete", id: l.id });
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  const focus = edit ?? data?.[0];

  return (
    <>
      <div className="note info">
        標記「需確認」的地點，請在活動前實地走一趟：站在預計擺奶蛙的位置，用手機 Google 地圖長按取得座標，再貼到這裡。範圍半徑建議 60–100 公尺，大的地點（湖、操場）可以設大一點。
      </div>
      {msg && <div className="note ok">{msg}</div>}
      {error && <div className="note bad">{error}</div>}

      {focus && (
        <div className="card">
          <MapView
            target={{ lat: focus.lat, lng: focus.lng, name: focus.name || "新地點" }}
            radius={focus.radius_m}
            extra={(data ?? []).filter((l) => l.enabled && l.id !== focus.id)}
            height={320}
          />
        </div>
      )}

      {edit && (
        <div className="card">
          <h2>{edit.id ? `編輯：${edit.name}` : "新增地點"}</h2>
          <div className="stats" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            <label className="field">
              名稱
              <input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </label>
            <label className="field">
              類別
              <select className="input" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>
                {Object.entries(CATS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              座標（緯度, 經度）— 可直接貼上 Google 地圖的座標
              <input
                className="input"
                defaultValue={`${edit.lat}, ${edit.lng}`}
                key={edit.id ?? "new"}
                onChange={(e) => {
                  const m = e.target.value.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
                  if (m) setEdit({ ...edit, lat: Number(m[1]), lng: Number(m[2]) });
                }}
              />
            </label>
            <label className="field">
              範圍半徑（公尺）
              <input
                className="input"
                type="number"
                value={edit.radius_m}
                onChange={(e) => setEdit({ ...edit, radius_m: Number(e.target.value) })}
              />
            </label>
            <label className="field">
              提示（選填，會顯示在前台）
              <input className="input" value={edit.hint} onChange={(e) => setEdit({ ...edit, hint: e.target.value })} placeholder="例如：正門口的階梯前" />
            </label>
            <label className="field">
              備註（只有後台看得到）
              <input className="input" value={edit.notes} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} />
            </label>
          </div>
          <div className="row" style={{ marginTop: 12, gap: 16, flexWrap: "wrap" }}>
            <label className="row">
              <input type="checkbox" checked={edit.enabled} onChange={(e) => setEdit({ ...edit, enabled: e.target.checked })} /> 啟用
            </label>
            <label className="row">
              <input type="checkbox" checked={edit.night_ok} onChange={(e) => setEdit({ ...edit, night_ok: e.target.checked })} /> 晚上可去 🌙
            </label>
            <span className="spacer" />
            <button className="btn small secondary" onClick={() => setEdit(null)}>
              取消
            </button>
            <button className="btn small" onClick={save}>
              儲存
            </button>
          </div>
        </div>
      )}

      <div className="card table-wrap">
        <div className="row">
          <h2 style={{ margin: 0 }}>📍 地點（{data?.filter((l) => l.enabled).length ?? 0} 個啟用）</h2>
          <span className="spacer" />
          <button className="btn small" onClick={() => setEdit({ ...EMPTY })}>
            ＋ 新增地點
          </button>
        </div>
        <table className="t">
          <thead>
            <tr>
              <th>名稱</th>
              <th>類別</th>
              <th>半徑</th>
              <th>晚上</th>
              <th>排入次數</th>
              <th>備註</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((l) => (
              <tr key={l.id} className={l.enabled ? "" : "dim"}>
                <td>
                  <b>{l.name}</b>
                  {!l.enabled && "（停用）"}
                </td>
                <td>{CATS[l.category] ?? l.category}</td>
                <td>{l.radius_m}m</td>
                <td>{l.night_ok ? "🌙" : ""}</td>
                <td>{l.uses}</td>
                <td className="small" style={{ whiteSpace: "normal", minWidth: 160 }}>
                  {l.notes.includes("需確認") ? <span className="tag">需確認</span> : null}
                  {l.notes.replace("需確認：", "")}
                </td>
                <td>
                  <div className="btn-row" style={{ flexWrap: "nowrap" }}>
                    <button className="btn small secondary" onClick={() => setEdit(l)}>
                      編輯
                    </button>
                    {!l.uses && (
                      <button className="btn small ghost" onClick={() => remove(l)}>
                        刪除
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
