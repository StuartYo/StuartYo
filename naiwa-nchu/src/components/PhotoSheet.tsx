"use client";
import { useEffect, useRef, useState } from "react";
import Sheet from "./Sheet";
import Mascot from "./Mascot";
import { api, ApiError, compressImage, fingerprint, GeoError, getBestPosition } from "@/lib/client";

/** 拍「奶蛙＋地標＋手勢」合照並上傳，開放這個時段的打卡 */
export default function PhotoSheet({
  place,
  gesture,
  onDone,
  onClose,
}: {
  place: string;
  gesture: string;
  onDone: () => void;
  onClose: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [step, setStep] = useState<"idle" | "locating" | "uploading" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setErr(null);
    try {
      const b = await compressImage(f);
      setBlob(b);
      setUrl(URL.createObjectURL(b));
    } catch {
      setErr("讀取照片失敗，請再拍一次");
    }
  }

  async function upload() {
    if (!blob) return;
    setErr(null);
    try {
      setStep("locating");
      const pos = await getBestPosition();
      setStep("uploading");
      const form = new FormData();
      form.set("photo", blob, "photo.jpg");
      form.set("lat", String(pos.lat));
      form.set("lng", String(pos.lng));
      form.set("accuracy", String(pos.accuracy));
      form.set("fp", await fingerprint());
      await api("/api/photo", { method: "POST", body: form });
      setStep("done");
      onDone();
    } catch (e) {
      setStep("idle");
      if (e instanceof GeoError && e.code === "denied") setErr("需要定位權限，才能確認你在現場。請到瀏覽器設定允許定位後再試一次。");
      else setErr(e instanceof ApiError || e instanceof GeoError ? e.message : "上傳失敗，請再試一次");
    }
  }

  if (step === "done")
    return (
      <Sheet onClose={onClose}>
        <div className="done">
          <Mascot size={110} mood="party" className="center-block" />
          <h3 style={{ marginTop: 6 }}>謝謝你把奶蛙帶來！</h3>
          <p className="muted">這個時段已經開放打卡了，快叫附近的同學一起來掃 QR Code～</p>
        </div>
        <button className="btn" onClick={onClose}>
          回去打卡
        </button>
      </Sheet>
    );

  return (
    <Sheet onClose={onClose}>
      <h3>拍一張奶蛙合照</h3>
      <p className="small muted" style={{ margin: 0 }}>只要有一個人上傳，這個時段就會開放給大家打卡。</p>
      <ul className="checklist">
        <li>
          <span className="n">1</span>
          <span>
            <b>奶蛙</b>要入鏡 🐸（沒有奶蛙的話，這一小時的分數會作廢）
          </span>
        </li>
        <li>
          <span className="n">2</span>
          <span>
            看得出是<b>「{place}」</b>
          </span>
        </li>
        <li>
          <span className="n">3</span>
          <span>
            有一隻手比出 <span className="gesture">{gesture}</span>
            <br />
            <span className="small muted">只要拍到手就好，不用露臉；想入鏡也很歡迎！</span>
          </span>
        </li>
      </ul>

      <input ref={input} type="file" accept="image/*" capture="environment" hidden onChange={onPick} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && <img src={url} alt="預覽" className="preview" />}
      {err && <div className="note bad">{err}</div>}

      <div className="stack" style={{ marginTop: 14 }}>
        {!blob ? (
          <button className="btn" onClick={() => input.current?.click()}>
            📷 打開相機
          </button>
        ) : (
          <>
            <button className="btn" onClick={upload} disabled={step !== "idle"}>
              {step === "locating" ? "確認位置中…" : step === "uploading" ? "上傳中…" : "上傳這張"}
            </button>
            <button className="btn secondary" onClick={() => input.current?.click()} disabled={step !== "idle"}>
              重拍
            </button>
          </>
        )}
      </div>
    </Sheet>
  );
}
