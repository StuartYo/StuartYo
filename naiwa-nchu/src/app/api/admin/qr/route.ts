import type { NextRequest } from "next/server";
import QRCode from "qrcode";
import { route } from "@/lib/http";

/** 貼在奶蛙身上的 QR Code（SVG，可直接列印放大不失真） */
export const GET = route(
  async (req: NextRequest) => {
    const base = process.env.PUBLIC_URL?.replace(/\/$/, "") ?? req.nextUrl.origin;
    const svg = await QRCode.toString(`${base}/scan`, { type: "svg", margin: 2, errorCorrectionLevel: "H" });
    return new Response(svg, {
      headers: { "content-type": "image/svg+xml", "content-disposition": 'inline; filename="naiwa-qr.svg"' },
    });
  },
  { admin: true },
);
