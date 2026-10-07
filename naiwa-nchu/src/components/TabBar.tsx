"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./TopBar";

const TABS: { href: string; ico: string | null; label: string }[] = [
  { href: "/", ico: null, label: "現在" },
  { href: "/leaderboard", ico: "🏆", label: "排行榜" },
  { href: "/photos", ico: "📸", label: "奶蛙相簿" },
  { href: "/rules", ico: "📜", label: "規則" },
];

export default function TabBar() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <nav className="tabbar">
      <div className="tabbar-inner">
        {TABS.map((t) => {
          const active = t.href === "/" ? path === "/" || path === "/scan" : path.startsWith(t.href);
          return (
            <Link key={t.href} href={t.href} className={active ? "active" : ""}>
              <span className="ico">{t.ico ?? <BrandMark size={22} />}</span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
