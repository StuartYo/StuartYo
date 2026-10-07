import type { Metadata, Viewport } from "next";
import "@fontsource/huninn";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = {
  title: "奶蛙觀測站｜興大流動奶蛙",
  description: "跟著奶蛙走遍中興大學！每小時一個新地點，到現場掃碼幫你的系加分。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15190f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
