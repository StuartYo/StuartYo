import { after } from "next/server";

/**
 * 通知工作人員（選用）。設定 DISCORD_WEBHOOK_URL 後，
 * 新照片待審核、奶蛙迷路時會發訊息到 Discord 頻道。
 * 只能在 Route Handler 裡呼叫（用 after() 在回應送出後才發送）。
 */
export function notify(content: string) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  after(() =>
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => {}),
  );
}
