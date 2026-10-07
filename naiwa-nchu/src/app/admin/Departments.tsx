"use client";
import { useState } from "react";
import { post, useAdmin } from "./util";

type D = {
  id: number;
  college: string;
  name: string;
  short: string;
  kind: string;
  students: number | null;
  weight_override: number | null;
  enabled: boolean;
  weight: number;
};

export default function Departments() {
  const { data, error, reload } = useAdmin<{ median: number; rows: D[] }>("/api/admin/departments");
  const [msg, setMsg] = useState<string | null>(null);

  async function save(d: D, patch: Partial<D>) {
    try {
      await post("/api/admin/departments", { ...d, ...patch });
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <>
      <div className="card">
        <h2>🧮 加權方式</h2>
        <p className="sub" style={{ marginTop: 0 }}>
          每次打卡分數 = √(人數中位數 {data?.median ?? "…"}) ÷ √(該系人數)，限制在 0.5–3 分之間。
          人數是 114 學年度教育部公開資料（各年級合計），可以直接修改；也可以填「手動分數」覆蓋計算結果。
        </p>
      </div>
      {msg && <div className="note bad">{msg}</div>}
      {error && <div className="note bad">{error}</div>}
      <div className="card table-wrap">
        <table className="t">
          <thead>
            <tr>
              <th>學院</th>
              <th>系所</th>
              <th>簡稱</th>
              <th>人數</th>
              <th>每次分數</th>
              <th>手動分數</th>
              <th>參賽</th>
            </tr>
          </thead>
          <tbody>
            {data?.rows.map((d) => (
              <tr key={d.id} className={d.enabled ? "" : "dim"}>
                <td className="small">{d.college}</td>
                <td>
                  {d.name}
                  {d.kind === "學士學位學程" && <span className="tag g" style={{ marginLeft: 4 }}>學程</span>}
                </td>
                <td>
                  <input className="input" defaultValue={d.short} style={{ width: 100 }} onBlur={(e) => e.target.value !== d.short && save(d, { short: e.target.value })} />
                </td>
                <td>
                  <input
                    className="input"
                    type="number"
                    defaultValue={d.students ?? ""}
                    style={{ width: 80 }}
                    onBlur={(e) => Number(e.target.value) !== d.students && save(d, { students: e.target.value === "" ? null : Number(e.target.value) })}
                  />
                </td>
                <td>
                  <b>{d.weight}</b>
                </td>
                <td>
                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    placeholder="自動"
                    defaultValue={d.weight_override ?? ""}
                    style={{ width: 80 }}
                    onBlur={(e) => {
                      const v = e.target.value === "" ? null : Number(e.target.value);
                      if (v !== d.weight_override) save(d, { weight_override: v });
                    }}
                  />
                </td>
                <td>
                  <input type="checkbox" checked={d.enabled} onChange={(e) => save(d, { enabled: e.target.checked })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeviceFix depts={data?.rows ?? []} />
    </>
  );
}

function DeviceFix({ depts }: { depts: D[] }) {
  const [code, setCode] = useState("");
  const [deptId, setDeptId] = useState("");
  const [move, setMove] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <div className="card">
      <h2>🔧 幫同學改系所</h2>
      <p className="sub" style={{ marginTop: 0 }}>
        有人選錯系又已經打過卡時，請對方在網站右上角點自己的系級，就會看到 6 碼裝置代碼。
      </p>
      <div className="row" style={{ flexWrap: "wrap" }}>
        <input className="input" style={{ width: 140 }} placeholder="裝置代碼" value={code} onChange={(e) => setCode(e.target.value)} />
        <select className="input" style={{ width: 220 }} value={deptId} onChange={(e) => setDeptId(e.target.value)}>
          <option value="">改成哪個系？</option>
          {depts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <label className="row small">
          <input type="checkbox" checked={move} onChange={(e) => setMove(e.target.checked)} />
          之前的打卡也一起轉過去
        </label>
        <button
          className="btn small"
          disabled={!code || !deptId}
          onClick={async () => {
            try {
              await post("/api/admin/devices", { code, deptId: Number(deptId), moveScans: move });
              setMsg("已更改 ✅");
            } catch (e) {
              setMsg(e instanceof Error ? e.message : String(e));
            }
          }}
        >
          更改
        </button>
      </div>
      {msg && <div className="note info">{msg}</div>}
    </div>
  );
}
