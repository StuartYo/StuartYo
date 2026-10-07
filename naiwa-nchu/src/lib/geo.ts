/** 兩點之間的距離（公尺） */
export function distanceM(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * 判斷是否在範圍內：GPS 本身有誤差，所以允許把一部分誤差算進去（最多 30 公尺），
 * 避免明明站在奶蛙旁邊卻被判定太遠。
 */
export function withinFence(distance: number, accuracy: number, radius: number) {
  return distance - Math.min(Math.max(accuracy, 0), 30) <= radius;
}
