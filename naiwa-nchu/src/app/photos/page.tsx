"use client";
import TopBar from "@/components/TopBar";
import { formatTime } from "@/lib/client";
import { useLive } from "@/lib/hooks";

type P = { id: string; number: number; landmark: string; created_at: string };

export default function PhotosPage() {
  const { data } = useLive<P[]>("/api/photos", 60_000);
  return (
    <>
      <TopBar />
      <main className="wrap">
        <h1 style={{ fontSize: 24, margin: "18px 4px 0" }}>📸 奶蛙旅行相簿</h1>
        <p className="small muted" style={{ margin: "4px 4px 0" }}>奶蛙每一站的合照，審核通過後會出現在這裡。</p>
        {data && data.length === 0 && (
          <div className="card center muted">
            <div className="big-emoji">🐸</div>還沒有照片，快帶奶蛙去第一站吧！
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
                第 {p.number} 站・{p.landmark}
                <span>{formatTime(new Date(p.created_at).getTime(), true)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}
