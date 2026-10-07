import type { Metadata, Viewport } from "next";
import "./globals.css";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = {
  title: "奶蛙興大巡迴賽",
  description: "跟著奶蛙走遍中興大學！每小時一個新地點，到現場掃碼幫你的系加分。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ea",
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
