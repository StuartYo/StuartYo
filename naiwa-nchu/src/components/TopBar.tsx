import Link from "next/link";
import Ticker from "./Ticker";
import type { State } from "@/lib/hooks";

export function BrandMark({ size }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" className="brand-mark" style={size ? { width: size, height: size, display: "inline-block" } : undefined} aria-hidden>
      <circle cx="20" cy="22" r="16" fill="var(--frog)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="12" cy="11" r="6.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="28" cy="11" r="6.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="10.5" cy="11" r="2.6" fill="var(--ink)" />
      <circle cx="29.5" cy="11" r="2.6" fill="var(--ink)" />
      <path d="M13 25q7 6 14 0" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function TopBar({ right, state }: { right?: React.ReactNode; state?: State | null }) {
  return (
    <header className="topbar">
      <Ticker state={state} />
      <div className="topbar-bar">
        <div className="topbar-inner">
          <Link href="/" className="brand">
            <BrandMark />
            <span>
              <span className="brand-name">奶蛙觀測站</span>
              <span className="brand-sub">NCHU · NAIWA-OBS</span>
            </span>
          </Link>
          {right}
        </div>
      </div>
    </header>
  );
}
