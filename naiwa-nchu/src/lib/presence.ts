import { HttpError, num } from "./http";
import { distanceM, withinFence } from "./geo";
import type { SlotRow } from "./event";
import type { Settings } from "./settings";

/** 檢查手機定位是否在這個時段的指定地點範圍內，回傳距離 */
export function checkPresence(body: Record<string, unknown>, slot: SlotRow, s: Settings) {
  const lat = num(body.lat, "lat");
  const lng = num(body.lng, "lng");
  const accuracy = num(body.accuracy, "accuracy");
  if (accuracy > s.maxAccuracyM)
    throw new HttpError(422, "low_accuracy", `定位不夠準（誤差約 ${Math.round(accuracy)} 公尺），請到戶外空曠處再試一次。`, {
      accuracy,
    });
  const distance = distanceM(lat, lng, slot.lat, slot.lng);
  if (!withinFence(distance, accuracy, slot.radius_m))
    throw new HttpError(422, "too_far", `你距離「${slot.name}」大約 ${Math.round(distance)} 公尺，要再靠近一點喔！`, {
      distance: Math.round(distance),
    });
  return { lat, lng, accuracy, distance };
}
