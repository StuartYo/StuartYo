"use client";
import { useEffect, useMemo, useState } from "react";
import Sheet from "./Sheet";
import { api, ApiError, fingerprint } from "@/lib/client";
import type { Dept, Me } from "@/lib/hooks";

const YEARS = ["大一", "大二", "大三", "大四", "大五以上"];

/** 第一次打卡前選系級。打卡之後就鎖定，避免同一支手機幫不同系刷分。 */
export default function DeptSheet({ me, onDone, onClose }: { me: Me | null; onDone: (m: Me) => void; onClose: () => void }) {
  const [depts, setDepts] = useState<Dept[] | null>(null);
  const [q, setQ] = useState("");
  const [deptId, setDeptId] = useState<number | null>(me?.deptId ?? null);
  const [year, setYear] = useState<string | null>(me?.year && me.year !== "來賓" ? me.year : null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api<Dept[]>("/api/departments").then(setDepts, (e) => setErr(e.message));
  }, []);

  const groups = useMemo(() => {
    const k = q.trim().toLowerCase();
    // 只比對系名，避免打「資」就把「農業暨自然資源學院」整個學院都列出來
    const list = (depts ?? []).filter((d) => !k || d.name.includes(k) || d.short.includes(k));
    const m = new Map<string, Dept[]>();
    for (const d of list) m.set(d.college, [...(m.get(d.college) ?? []), d]);
    return [...m.entries()];
  }, [depts, q]);

  const selected = depts?.find((d) => d.id === deptId);
  const locked = me?.deptId && !me.canChangeDept;

  async function save() {
    if (!deptId || !year) return;
    setBusy(true);
    setErr(null);
    try {
      const m = await api<Me>("/api/me", { method: "POST", body: JSON.stringify({ deptId, year, fp: await fingerprint() }) });
      onDone(m);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  if (locked)
    return (
      <Sheet onClose={onClose}>
        <h3>你代表 {me.deptName} 參賽 🐸</h3>
        <p className="sub muted">
          {me.year}・已打卡 {me.totalScans} 次。為了公平，打過卡之後就不能更換系所。
        </p>
        <div className="note info">
          如果當初選錯了，請把這組裝置代碼給工作人員：<b style={{ fontSize: 18, letterSpacing: 2 }}>{me.code}</b>
        </div>
        <button className="btn secondary" style={{ marginTop: 14 }} onClick={onClose}>
          好
        </button>
      </Sheet>
    );

  return (
    <Sheet onClose={onClose}>
      <h3>你是哪個系的？</h3>
      <p className="small muted" style={{ margin: 0 }}>選好之後，這支手機每次打卡都會幫這個系加分。第一次打卡後就不能更改。</p>

      <input
        className="input"
        style={{ marginTop: 12 }}
        placeholder="搜尋，例如：資管、機械、獸醫"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        inputMode="search"
      />
      <div className="dept-list">
        {!depts && <div className="muted small" style={{ padding: 14 }}>載入中…</div>}
        {depts && groups.length === 0 && <div className="muted small" style={{ padding: 14 }}>找不到「{q}」</div>}
        {groups.map(([college, list]) => (
          <div key={college}>
            <div className="dept-group">{college}</div>
            {list.map((d) => (
              <button key={d.id} className={`dept-item ${deptId === d.id ? "sel" : ""}`} onClick={() => setDeptId(d.id)}>
                <span>{d.name}</span>
                <span className="w">每次 {d.weight} 分</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, fontWeight: 700 }}>年級</div>
      <div className="chips">
        {YEARS.map((y) => (
          <button key={y} className={`chip ${year === y ? "sel" : ""}`} onClick={() => setYear(y)}>
            {y}
          </button>
        ))}
      </div>

      {err && <div className="note bad">{err}</div>}
      <button className="btn" style={{ marginTop: 16 }} disabled={!deptId || !year || busy} onClick={save}>
        {busy ? "儲存中…" : selected && year ? `我是 ${selected.short} ${year}` : "選擇系所和年級"}
      </button>
    </Sheet>
  );
}
