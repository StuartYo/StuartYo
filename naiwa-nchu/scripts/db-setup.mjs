// 建立資料表並匯入預設地點、系所。可重複執行，不會覆蓋已存在的資料。
// 用法：DATABASE_URL=... npm run db:setup
import { readFile } from "node:fs/promises";
import postgres from "postgres";


const url = process.env.DATABASE_URL;
if (!url) {
  console.error("請設定 DATABASE_URL");
  process.exit(1);
}
const sql = postgres(url, { prepare: false, max: 1 });
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
await sql.unsafe(schema);
console.log("✓ 資料表已建立");

const { LANDMARKS } = await import("../src/data/landmarks.ts");
const { DEPARTMENTS } = await import("../src/data/departments.ts");

let n = 0;
for (const l of LANDMARKS) {
  const r = await sql`
    insert into landmarks (name, category, lat, lng, radius_m, night_ok, enabled, notes)
    values (${l.name}, ${l.category}, ${l.lat}, ${l.lng}, ${l.radius_m ?? 80}, ${l.night_ok}, ${l.enabled ?? true}, ${l.notes ?? ""})
    on conflict (name) do nothing returning id`;
  n += r.length;
}
console.log(`✓ 新增 ${n} 個地點（共 ${LANDMARKS.length} 個預設地點）`);

n = 0;
for (const d of DEPARTMENTS) {
  const r = await sql`
    insert into departments (college, name, short, kind, students)
    values (${d.college}, ${d.name}, ${d.short}, ${d.kind}, ${d.students})
    on conflict (name) do nothing returning id`;
  n += r.length;
}
console.log(`✓ 新增 ${n} 個系所（共 ${DEPARTMENTS.length} 個預設系所）`);
await sql.end();
