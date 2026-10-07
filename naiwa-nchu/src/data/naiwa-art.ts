/**
 * 奶蛙圖片：把圖檔放進 public/naiwa/，再把檔名填在這裡。
 * 有填的狀態會用真實圖片，沒填的會退回網站內建的手繪奶蛙。
 * 建議用去背 PNG / WebP，正方形、至少 512×512。
 *
 * 例：default: "/naiwa/default.png", happy: "/naiwa/happy.png"
 */
export const NAIWA_ART: Partial<Record<"default" | "idle" | "happy" | "lost" | "sleep" | "party", string>> = {};
