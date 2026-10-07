"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import BoardList from "./BoardList";
import DeptSheet from "./DeptSheet";
import PhotoSheet from "./PhotoSheet";
import {
  api,
  ApiError,
  fingerprint,
  formatCountdown,
  formatTime,
  GeoError,
  getBestPosition,
  inAppBrowser,
  type Position,
} from "@/lib/client";
import { useLive, useMe, useNow, type Board, type State } from "@/lib/hooks";
import TopBar from "./TopBar";
import Mascot, { type Mood } from "./Mascot";

const MapView = dynamic(() => import("./MapView"), { ssr: false, loading: () => <div className="map" /> });

type Result = { idx: number } & (
  | { kind: "ok"; points: number; dept: string; pending: boolean }
  | { kind: "error"; code: string; message: string; distance?: number }
);

const noSubscribe = () => () => {};

const STATUS_TEXT: Record<string, string> = {
  waiting: "等待奶蛙抵達",
  lost: "奶蛙好像迷路了",
  open: "開放打卡中",
  confirmed: "開放打卡中",
  void: "本時段暫停",
};

export default function Hub({ fromQr = false }: { fromQr?: boolean }) {
  const { data: state, receivedAt, error: stateErr, reload: reloadState } = useLive<State>("/api/state", 10_000);
  const { data: board, reload: reloadBoard } = useLive<Board>("/api/leaderboard", 20_000);
  const cur = state?.current;
  // 換時段時重新讀取「這個時段打過卡沒」
  const { me, setMe, reload: reloadMe } = useMe(cur?.idx);
  const now = useNow(state?.serverNow, receivedAt);
  const [sheet, setSheet] = useState<null | "dept" | "photo">(null);
  const [afterDept, setAfterDept] = useState(false);
  const [busy, setBusy] = useState<null | "locating" | "sending">(null);
  const [rawResult, setResult] = useState<Result | null>(null);
  const [pos, setPos] = useState<Position | null>(null);
  const app = useSyncExternalStore(noSubscribe, inAppBrowser, () => null);
  // 結果只屬於當時的時段，換時段就不顯示
  const result = rawResult && rawResult.idx === cur?.idx ? rawResult : null;

  // 時段結束時立刻更新
  useEffect(() => {
    if (cur && now >= cur.endsAt) reloadState();
    if (state?.next && !state.next.landmark && now >= state.next.revealAt) reloadState();
  }, [now, cur, state?.next, reloadState]);

  async function checkin(deptJustChosen = false) {
    if (!deptJustChosen && !me?.deptId) {
      setAfterDept(true);
      setSheet("dept");
      return;
    }
    if (!cur) return;
    const idx = cur.idx;
    setResult(null);
    try {
      setBusy("locating");
      const p = await getBestPosition();
      setPos(p);
      setBusy("sending");
      const r = await api<{ points: number; dept: string; pending: boolean }>("/api/checkin", {
        method: "POST",
        body: JSON.stringify({ ...p, fp: await fingerprint() }),
      });
      setResult({ idx, kind: "ok", ...r });
      reloadMe();
      reloadBoard();
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.code === "already") reloadMe();
        if (e.code === "not_open") reloadState();
        setResult({ idx, kind: "error", code: e.code, message: e.message, distance: e.data.distance as number | undefined });
      } else if (e instanceof GeoError) setResult({ idx, kind: "error", code: `geo_${e.code}`, message: e.message });
      else setResult({ idx, kind: "error", code: "unknown", message: "發生錯誤，請再試一次" });
    } finally {
      setBusy(null);
    }
  }

  const chip = (
    <button className="me-chip" onClick={() => setSheet("dept")}>
      {me?.deptShort ? `${me.deptShort}・${me.year}` : "選擇系級"}
    </button>
  );

  const night = (() => {
    const h = new Date(now + 8 * 3600_000).getUTCHours();
    return h >= 22 || h < 7;
  })();
  const mood: Mood = !cur
    ? "idle"
    : cur.status === "lost"
      ? "lost"
      : cur.status === "void"
        ? "sleep"
        : result?.kind === "ok" || me?.scannedCurrent
          ? "party"
          : cur.status === "open" || cur.status === "confirmed"
            ? "happy"
            : night
              ? "sleep"
              : "idle";

  return (
    <>
      <TopBar right={me !== undefined ? chip : null} state={state} />
      <main className="wrap">
        {app && <InAppNotice app={app} />}
        {!state && !stateErr && (
          <div className="card center" style={{ padding: 30 }}>
            <Mascot size={90} />
            <div className="label" style={{ marginTop: 8 }}>正在搜尋奶蛙訊號…</div>
          </div>
        )}
        {stateErr && !state && <div className="note bad">{stateErr}</div>}

        {(state?.phase === "unscheduled" || state?.phase === "before") && (
          <section className="card hero center">
            <div className="label">NAIWA MIGRATION · SEASON 01</div>
            <div className="mirror-pair">
              <Mascot size={92} mood="happy" />
              <div className="bubbles">
                <span className="bubble l">我是奶蛙</span>
                <span className="bubble r">我才是奶蛙</span>
              </div>
              <Mascot size={92} mood="idle" flip />
            </div>
            <h1 style={{ fontSize: 34 }}>流動的奶蛙<br />即將降臨中興</h1>
            {state.phase === "before" && state.startsAt ? (
              <>
                <div className="clock" style={{ justifyContent: "center" }}>
                  <span className="digits">{formatCountdown(state.startsAt - now)}</span>
                </div>
                <p className="small" style={{ color: "var(--ink-2)" }}>
                  {formatTime(state.startsAt, true)} 開始・第一站會在開始前{" "}
                  {Math.round((state.startsAt - (state.next?.revealAt ?? state.startsAt)) / 60000)} 分鐘公布
                </p>
                {!me?.deptId && (
                  <button className="btn" onClick={() => setSheet("dept")}>
                    先登記我的系級
                  </button>
                )}
              </>
            ) : (
              <p style={{ color: "var(--ink-2)" }}>
                連續 {state.slotCount} 小時、每小時一個新地點。
                <br />
                跟著奶蛙走遍中興，幫你的系拿下奶蛙獎座 🏆
              </p>
            )}
          </section>
        )}

        {state?.phase === "ended" && (
          <section className="card hero center">
            <Mascot size={120} mood="sleep" />
            <h1 style={{ fontSize: 32, marginTop: 6 }}>本季遷徙結束</h1>
            <p style={{ color: "var(--ink-2)" }}>奶蛙已經回去睡覺了。謝謝大家陪奶蛙走遍中興，最後結果請看排行榜和 IG 公告。</p>
            <Link href="/leaderboard" className="btn">
              看排行榜
            </Link>
          </section>
        )}

        {state?.phase === "running" && cur && (
          <>
            <section className="card hero">
              <div className="hero-top">
                <div className="obs-no">
                  OBS <b>#{String(cur.number).padStart(3, "0")}</b> / {state.slotCount}
                </div>
                <div className={`badge ${cur.status}`}>
                  <span className="pulse" />
                  {STATUS_TEXT[cur.status]}
                </div>
              </div>
              <div className="hero-mascot">
                <Mascot size={128} mood={mood} />
              </div>
              <div className="label" style={{ marginTop: 14 }}>目擊地點</div>
              <div className="place">{cur.landmark.name}</div>
              {cur.landmark.hint && <div className="hint">{cur.landmark.hint}</div>}
              <div className="clock">
                <span className="digits">{formatCountdown(cur.endsAt - now)}</span>
                <span className="unit">
                  剩餘時間
                  <br />
                  UNTIL {formatTime(cur.endsAt)}
                </span>
              </div>
              <MapView
                target={cur.landmark}
                radius={cur.landmark.radius}
                me={result?.kind === "error" && result.code === "too_far" ? pos : null}
              />
            </section>

            <section className="card">
              <Action
                state={state}
                me={me}
                busy={busy}
                result={result}
                fromQr={fromQr}
                onCheckin={() => checkin()}
                onPhoto={() => setSheet("photo")}
              />
            </section>

            <NextStop state={state} now={now} />
          </>
        )}

        {board && state && state.phase !== "unscheduled" && state.phase !== "before" && (
          <>
            <div className="row" style={{ marginTop: 28 }}>
              <div className="section-title" style={{ margin: "0 4px" }}>
                各系族群數量 <span className="label">LEADERBOARD</span>
              </div>
              <span className="spacer" />
              <Link href="/leaderboard" className="small" style={{ fontWeight: 700 }}>
                全部 →
              </Link>
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              {board.frozenAt && <div className="note warn" style={{ marginTop: 0 }}>🙈 排行榜已凍結，最後結果揭曉前保密！</div>}
              <BoardList rows={board.rows} myDeptId={me?.deptId} limit={5} />
            </div>
          </>
        )}
      </main>

      {sheet === "dept" && (
        <DeptSheet
          me={me ?? null}
          onClose={() => {
            setSheet(null);
            setAfterDept(false);
          }}
          onDone={(m) => {
            setMe(m);
            setSheet(null);
            if (afterDept) {
              setAfterDept(false);
              setTimeout(() => checkin(true), 50);
            }
          }}
        />
      )}
      {sheet === "photo" && cur && (
        <PhotoSheet
          place={cur.landmark.name}
          gesture={cur.gesture}
          onClose={() => setSheet(null)}
          onDone={() => {
            reloadState();
            reloadMe();
          }}
        />
      )}
    </>
  );
}

function Action({
  state,
  me,
  busy,
  result,
  fromQr,
  onCheckin,
  onPhoto,
}: {
  state: State;
  me: ReturnType<typeof useMe>["me"];
  busy: null | "locating" | "sending";
  result: Result | null;
  fromQr: boolean;
  onCheckin: () => void;
  onPhoto: () => void;
}) {
  const cur = state.current!;
  const open = cur.status === "open" || cur.status === "confirmed";

  if (cur.status === "void")
    return <div className="note warn" style={{ marginTop: 0 }}>這個時段暫停計分，下個時段見！</div>;

  if (result?.kind === "ok" || me?.scannedCurrent) {
    return (
      <div className="done">
        <div className="stamp">已目擊 ✓</div>
        {result?.kind === "ok" ? (
          <div className="pts">
            +{result.points} <small>分 → {result.dept}</small>
          </div>
        ) : (
          <div className="pts" style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 400 }}>
            這一站已經打過卡囉
          </div>
        )}
        <p className="small" style={{ marginBottom: 0, color: "var(--ink-2)" }}>
          {result?.kind === "ok" && result.pending
            ? "分數會在工作人員確認合照後正式生效，排行榜上會先顯示為「待確認」。"
            : "下個時段換地點後再來打卡吧！"}
        </p>
        {!me?.uploadedCurrent && (
          <button className="btn ghost small" style={{ margin: "8px auto 0" }} onClick={onPhoto}>
            也想上傳合照放進奶蛙相簿 📸
          </button>
        )}
      </div>
    );
  }

  const err = result?.kind === "error" ? result : null;
  const weightHint = me?.deptShort ? `幫 ${me.deptShort} 打卡` : "打卡";

  return (
    <div>
      {!open && (
        <>
          {cur.status === "lost" ? (
            <div className="note bad" style={{ marginTop: 0 }}>
              <b>奶蛙好像迷路了⋯⋯</b>有看到奶蛙的同學，請幫忙把我帶到「{cur.landmark.name}」，謝謝你 🥺
            </div>
          ) : (
            <div className="note warn" style={{ marginTop: 0 }}>
              <b>奶蛙還在路上。</b>等有人把奶蛙帶到這裡、上傳合照後，就會開放打卡。
            </div>
          )}
          <div className="stack" style={{ marginTop: 14 }}>
            <button className="btn gold big" onClick={onPhoto}>
              📸 我帶奶蛙到了！拍合照
            </button>
            <p className="small muted center" style={{ margin: 0 }}>
              {fromQr ? "你剛掃了奶蛙身上的 QR Code，代表奶蛙就在你旁邊吧？" : "人已經在現場也可以先等等，開放後這頁會自動更新。"}
            </p>
          </div>
        </>
      )}

      {open && (
        <>
          <button className="btn big" onClick={onCheckin} disabled={!!busy || me === undefined}>
            {busy === "locating" ? "📡 確認位置中…" : busy === "sending" ? "送出中…" : `📍 我在現場，${weightHint}！`}
          </button>
          <p className="small muted center" style={{ margin: "8px 0 0" }}>
            需要開啟定位，確認你在「{cur.landmark.name}」附近 {cur.landmark.radius} 公尺內
          </p>
        </>
      )}

      {err && (
        <div className={`note ${err.code === "too_far" || err.code === "low_accuracy" ? "warn" : "bad"}`}>
          {err.message}
          {err.code === "geo_denied" && <LocationHelp />}
          {err.code === "too_far" && <div className="small" style={{ marginTop: 4 }}>地圖上藍點是你目前的位置。</div>}
        </div>
      )}
    </div>
  );
}

function NextStop({ state, now }: { state: State; now: number }) {
  const next = state.next;
  if (!next) return <div className="note info">這是本季最後一站了！</div>;
  return (
    <section className="card forecast">
      <div className="label">NEXT · 下一站預報</div>
      {next.landmark ? (
        <>
          <div className="place-sm" style={{ marginTop: 4 }}>→ {next.landmark.name}</div>
          <div className="sub">
            {formatTime(next.startsAt)} 開始（{formatCountdown(next.startsAt - now)} 後）・幫忙把奶蛙搬過去吧！
          </div>
        </>
      ) : (
        <div className="sub" style={{ marginTop: 4 }}>
          <span className="place-sm" style={{ letterSpacing: ".2em" }}>？？？</span>
          <br />
          會在 {formatTime(next.revealAt)} 公布（{formatCountdown(next.revealAt - now)} 後），{formatTime(next.startsAt)} 開始
        </div>
      )}
    </section>
  );
}

function LocationHelp() {
  return (
    <details style={{ marginTop: 8 }}>
      <summary>怎麼開啟定位？</summary>
      <ul className="small" style={{ paddingLeft: 18, margin: "6px 0 0" }}>
        <li>iPhone：設定 → 隱私權與安全性 → 定位服務 → 開啟，並把 Safari 設成「使用 App 期間」；回到這頁重新整理。</li>
        <li>Android：點網址列左邊的圖示 → 權限 → 位置 → 允許；並確認手機的「定位」已開啟。</li>
        <li>如果你是從 LINE / IG 打開的，請改用 Safari 或 Chrome 開啟這個網址。</li>
      </ul>
    </details>
  );
}

function InAppNotice({ app }: { app: NonNullable<ReturnType<typeof inAppBrowser>> }) {
  const name = { line: "LINE", instagram: "Instagram", facebook: "Facebook", threads: "Threads" }[app];
  const href =
    app === "line"
      ? (() => {
          const u = new URL(location.href);
          u.searchParams.set("openExternalBrowser", "1");
          return u.toString();
        })()
      : null;
  return (
    <div className="note warn">
      你正在用 {name} 內建的瀏覽器，定位和相機可能不穩定。
      {href ? (
        <>
          {" "}
          <a href={href}>
            <b>點這裡用預設瀏覽器開啟</b>
          </a>
        </>
      ) : (
        "建議點右上角「⋯」選擇用瀏覽器開啟。"
      )}
    </div>
  );
}
