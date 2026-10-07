/**
 * 中興大學校本部地標（座標 WGS84）
 * 來源：公開的 OpenStreetMap 衍生資料、校內學生專案標記的 Google Maps 座標、
 * OoLoo 校園共享機車站點、YouBike 站點資料，互相比對誤差多在 5–35 公尺內。
 * 標註「需確認」的地點，活動前請實地走一趟、或在後台地圖上確認位置。
 * 已排除：綜合大樓（施工中）、校外地點。
 */
export type SeedLandmark = {
  name: string;
  category: "landmark" | "academic" | "sports" | "food" | "dorm" | "life";
  lat: number;
  lng: number;
  radius_m?: number;
  night_ok: boolean;
  enabled?: boolean;
  notes?: string;
};

export const LANDMARKS: SeedLandmark[] = [
  // 地標
  { name: "校門口（興大路正門）", category: "landmark", lat: 24.12389, lng: 120.675016, night_ok: true },
  { name: "惠蓀堂", category: "landmark", lat: 24.123237, lng: 120.676103, radius_m: 90, night_ok: true },
  { name: "圓廳", category: "landmark", lat: 24.123334, lng: 120.67702, night_ok: true },
  { name: "小禮堂", category: "landmark", lat: 24.123419, lng: 120.677755, night_ok: true },
  { name: "行政大樓", category: "landmark", lat: 24.122343, lng: 120.674273, night_ok: true },
  { name: "圖書館（總圖）", category: "landmark", lat: 24.119829, lng: 120.674308, night_ok: true },
  { name: "中興湖", category: "landmark", lat: 24.1213, lng: 120.674384, radius_m: 120, night_ok: true },
  { name: "雲平樓", category: "landmark", lat: 24.119658, lng: 120.672594, night_ok: true },
  { name: "東二門（國光路側門）", category: "landmark", lat: 24.121369, lng: 120.679047, night_ok: true },
  { name: "興大康橋", category: "landmark", lat: 24.117382, lng: 120.674069, night_ok: true },
  { name: "獸醫教學醫院", category: "landmark", lat: 24.118287, lng: 120.678861, night_ok: false },
  // 系館
  { name: "人文大樓", category: "academic", lat: 24.123361, lng: 120.672769, night_ok: true },
  { name: "萬年樓（語言中心）", category: "academic", lat: 24.122875, lng: 120.672795, night_ok: false },
  { name: "社管大樓", category: "academic", lat: 24.120826, lng: 120.673272, night_ok: false },
  { name: "農環大樓", category: "academic", lat: 24.121239, lng: 120.675435, night_ok: false },
  { name: "化工暨材料大樓", category: "academic", lat: 24.122583, lng: 120.67541, night_ok: false },
  { name: "電機大樓", category: "academic", lat: 24.122478, lng: 120.676288, night_ok: false },
  { name: "資訊科學大樓", category: "academic", lat: 24.121249, lng: 120.677093, night_ok: false },
  {
    name: "理學大樓",
    category: "academic",
    lat: 24.121085,
    lng: 120.677432,
    night_ok: false,
    enabled: false,
    notes: "需確認：兩個來源座標差 300 公尺以上，確認後再啟用",
  },
  { name: "機械館", category: "academic", lat: 24.1201, lng: 120.677282, night_ok: false },
  { name: "作物科學大樓", category: "academic", lat: 24.12054, lng: 120.676818, night_ok: false },
  { name: "水保館", category: "academic", lat: 24.12166, lng: 120.677375, night_ok: false },
  { name: "土木環工大樓", category: "academic", lat: 24.12068, lng: 120.678195, night_ok: false },
  { name: "森林系二館", category: "academic", lat: 24.122374, lng: 120.677648, night_ok: false },
  { name: "應經一館", category: "academic", lat: 24.121309, lng: 120.678471, night_ok: false },
  { name: "國農大樓", category: "academic", lat: 24.123027, lng: 120.678642, night_ok: false },
  { name: "生機大樓", category: "academic", lat: 24.119952, lng: 120.678418, night_ok: false },
  { name: "動科大樓", category: "academic", lat: 24.118659, lng: 120.678479, night_ok: false },
  // 運動
  { name: "體育館", category: "sports", lat: 24.118841, lng: 120.675783, night_ok: true },
  { name: "田徑場", category: "sports", lat: 24.118115, lng: 120.673268, radius_m: 120, night_ok: true },
  {
    name: "籃球場",
    category: "sports",
    lat: 24.118626,
    lng: 120.674507,
    radius_m: 100,
    night_ok: true,
    notes: "需確認：另一個來源差約 120 公尺",
  },
  { name: "排球場", category: "sports", lat: 24.117938, lng: 120.674701, night_ok: true },
  { name: "網球場", category: "sports", lat: 24.11882, lng: 120.675542, night_ok: true },
  // 吃的
  { name: "學生餐廳", category: "food", lat: 24.123685, lng: 120.677066, night_ok: false, notes: "路易莎在一樓，營業約 07:00–19:00" },
  // 宿舍
  { name: "女生宿舍", category: "dorm", lat: 24.123637, lng: 120.680183, night_ok: true, notes: "需確認：國光路東側" },
  { name: "舊男宿", category: "dorm", lat: 24.118945, lng: 120.672713, night_ok: true },
  { name: "興大二村", category: "dorm", lat: 24.121855, lng: 120.679572, night_ok: true, notes: "需確認：國光路東側" },
];
