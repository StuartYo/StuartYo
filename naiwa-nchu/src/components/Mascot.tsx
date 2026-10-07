/**
 * 奶蛙吉祥物。有放真實圖片（src/data/naiwa-art.ts）就用圖片，否則用內建的手繪版：
 * 圓胖、奶黃色、奶白肚子、兩顆往不同方向看的眼睛。
 * mood：idle 平常｜happy 開放打卡｜lost 迷路｜sleep 夜間｜party 打卡成功
 */
import { NAIWA_ART } from "@/data/naiwa-art";

export type Mood = "idle" | "happy" | "lost" | "sleep" | "party";

export default function Mascot({
  mood = "idle",
  size = 120,
  flip = false,
  className = "",
}: {
  mood?: Mood;
  size?: number;
  flip?: boolean;
  className?: string;
}) {
  const art = NAIWA_ART[mood] ?? NAIWA_ART.default;
  if (art)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={art}
        alt=""
        width={size}
        height={size}
        className={`mascot-img mood-${mood} ${flip ? "flip" : ""} ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  const eyesClosed = mood === "sleep";
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`mascot mascot-${mood} ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <g className="mascot-body">
        {/* 影子 */}
        <ellipse cx="100" cy="188" rx="58" ry="7" fill="var(--ink)" opacity=".18" />
        {/* 身體 */}
        <path
          d="M100 40c-44 0-70 34-70 78 0 38 26 64 70 64s70-26 70-64c0-44-26-78-70-78z"
          fill="var(--frog)"
          stroke="var(--ink)"
          strokeWidth="5"
        />
        {/* 奶白肚子 */}
        <path d="M100 104c-26 0-42 18-42 40 0 20 18 30 42 30s42-10 42-30c0-22-16-40-42-40z" fill="var(--milk)" stroke="var(--ink)" strokeWidth="4" />
        {/* 小手 */}
        <path d="M42 132c-10 4-14 14-8 20" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <path d="M158 132c10 4 14 14 8 20" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        {/* 眼睛 */}
        <g className="mascot-eyes">
          {[62, 138].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="50" r="27" fill="var(--frog)" stroke="var(--ink)" strokeWidth="5" />
              {eyesClosed ? (
                <path d={`M${cx - 13} 52q13 10 26 0`} fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
              ) : (
                <>
                  <circle cx={cx} cy="50" r="17" fill="#fff" stroke="var(--ink)" strokeWidth="4" />
                  {/* 兩顆眼睛看不同方向，奶蛙的抽象感 */}
                  <circle className="mascot-pupil" cx={cx + (i === 0 ? -5 : 6)} cy={mood === "lost" ? 56 : 47} r="7.5" fill="var(--ink)" />
                </>
              )}
            </g>
          ))}
        </g>
        {/* 腮紅 */}
        <ellipse cx="54" cy="96" rx="11" ry="6" fill="var(--blush)" opacity=".85" />
        <ellipse cx="146" cy="96" rx="11" ry="6" fill="var(--blush)" opacity=".85" />
        {/* 嘴巴 */}
        {mood === "happy" || mood === "party" ? (
          <path d="M78 88q22 26 44 0z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
        ) : mood === "lost" ? (
          <path d="M84 98q16-12 32 0" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        ) : (
          <path d="M80 88q20 16 40 0" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        )}
        {mood === "lost" && <path d="M146 66q6 12 0 16q-6-4 0-16z" fill="#8fd3ff" stroke="var(--ink)" strokeWidth="3" />}
        {mood === "sleep" && (
          <text x="160" y="30" fontSize="28" fontWeight="900" fill="var(--ink)" fontFamily="var(--font-mono)">
            z
          </text>
        )}
      </g>
    </svg>
  );
}

/** 奶蛋：還沒孵化的奶蛙，用在空狀態 */
export function MilkEgg({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className="milk-egg" aria-hidden>
      <path d="M50 6C26 6 10 46 10 72c0 24 18 40 40 40s40-16 40-40C90 46 74 6 50 6z" fill="var(--milk)" stroke="var(--ink)" strokeWidth="4" />
      <path d="M22 70l10-8 9 9 9-9 9 9 9-9 10 8" fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="38" cy="50" r="3.5" fill="var(--ink)" />
      <circle cx="62" cy="50" r="3.5" fill="var(--ink)" />
      <ellipse cx="30" cy="58" rx="5" ry="3" fill="var(--blush)" />
      <ellipse cx="70" cy="58" rx="5" ry="3" fill="var(--blush)" />
    </svg>
  );
}

/** 奶豆：小小的豆子，當作項目符號 */
export function MilkBean({ size = 18, color = "var(--gold)" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 40 30" width={size} height={size * 0.75} className="milk-bean" aria-hidden>
      <path d="M6 16C4 6 16 2 22 6s8 0 12 4 2 14-8 16S8 26 6 16z" fill={color} stroke="var(--ink)" strokeWidth="3" />
      <circle cx="16" cy="14" r="1.8" fill="var(--ink)" />
      <circle cx="24" cy="14" r="1.8" fill="var(--ink)" />
    </svg>
  );
}
