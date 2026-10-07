"use client";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/client";
import Overview from "./Overview";
import Photos from "./Photos";
import Schedule from "./Schedule";
import Landmarks from "./Landmarks";
import Departments from "./Departments";
import Scans from "./Scans";
import SettingsTab from "./SettingsTab";
import { post, useAdmin } from "./util";

const TABS = [
  ["overview", "總覽"],
  ["photos", "照片審核"],
  ["schedule", "時程"],
  ["landmarks", "地點"],
  ["departments", "系所"],
  ["scans", "打卡紀錄"],
  ["settings", "設定"],
] as const;
type Tab = (typeof TABS)[number][0];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    api("/api/admin/settings").then(
      () => {
        const h = location.hash.slice(1) as Tab;
        if (TABS.some(([k]) => k === h)) setTab(h);
        setAuthed(true);
      },
      (e) => setAuthed(e instanceof ApiError && e.status === 401 ? false : true),
    );
  }, []);

  if (authed === null) return <main className="wrap muted center" style={{ paddingTop: 40 }}>載入中…</main>;
  if (!authed) return <Login onDone={() => setAuthed(true)} />;

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner" style={{ maxWidth: 1100 }}>
          <span className="brand">🐸 奶蛙後台</span>
          <span className="spacer" />
          <a href="/" target="_blank" className="small">
            看前台 ↗
          </a>
          <button
            className="btn ghost small"
            onClick={async () => {
              await post("/api/admin/logout", {});
              setAuthed(false);
            }}
          >
            登出
          </button>
        </div>
      </header>
      <main className="wrap wide">
        <PendingTabs tab={tab} setTab={(t) => ((location.hash = t), setTab(t))} />
        {tab === "overview" && <Overview go={(t) => ((location.hash = t), setTab(t as Tab))} />}
        {tab === "photos" && <Photos />}
        {tab === "schedule" && <Schedule />}
        {tab === "landmarks" && <Landmarks />}
        {tab === "departments" && <Departments />}
        {tab === "scans" && <Scans />}
        {tab === "settings" && <SettingsTab />}
      </main>
    </>
  );
}

function PendingTabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const { data } = useAdmin<{ counts: { pending_photos: number; flagged: number } }>("/api/admin/overview", 15_000);
  return (
    <nav className="admin-tabs">
      {TABS.map(([k, label]) => (
        <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>
          {label}
          {k === "photos" && data?.counts.pending_photos ? <span className="count">{data.counts.pending_photos}</span> : null}
        </button>
      ))}
    </nav>
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <main className="wrap" style={{ paddingTop: 40 }}>
      <form
        className="card"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await post("/api/admin/login", { password: pw });
            onDone();
          } catch (e) {
            setErr(e instanceof Error ? e.message : String(e));
          }
        }}
      >
        <h2>🐸 奶蛙管理後台</h2>
        <input className="input" type="password" placeholder="管理員密碼" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
        {err && <div className="note bad">{err}</div>}
        <button className="btn" style={{ marginTop: 12 }}>
          登入
        </button>
      </form>
    </main>
  );
}
