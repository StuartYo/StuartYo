import Link from "next/link";

export default function TopBar({ right }: { right?: React.ReactNode }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-frog">🐸</span>奶蛙興大巡迴賽
        </Link>
        {right}
      </div>
    </header>
  );
}
