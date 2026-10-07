"use client";
import TopBar from "@/components/TopBar";
import { MilkEgg } from "@/components/Mascot";
import { formatTime } from "@/lib/client";
import { useLive } from "@/lib/hooks";

type P = { id: string; number: number; landmark: string; created_at: string };

export default function PhotosPage() {
  const { data } = useLive<P[]>("/api/photos", 60_000);
  return (
    <>
      <TopBar />
      <main className="wrap">
        <div className="page-head">
          <div className="label">FIELD RECORDS · 目擊紀錄</div>
          <h1>奶蛙旅行相簿</h1>
          <p>奶蛙每一站的合照，審核通過後會出現在這裡。</p>
        </div>
        {data && data.length === 0 && (
          <div className="card center">
            <MilkEgg size={70} />
            <p style={{ color: "var(--ink-2)", marginBottom: 0 }}>還沒有紀錄。奶蛋還沒孵化，快帶奶蛙去第一站吧！</p>
          </div>
        )}
        <div className="gallery">
          {data?.map((p) => (
            <figure key={p.id}>
              <a href={`/api/photos/${p.id}`} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/photos/${p.id}`} alt={`第 ${p.number} 站 ${p.landmark}`} loading="lazy" />
              </a>
              <figcaption>
                {p.landmark}
                <span>
                  OBS #{String(p.number).padStart(3, "0")} ·{" "}
                  {formatTime(new Date(p.created_at).getTime(), true)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}
