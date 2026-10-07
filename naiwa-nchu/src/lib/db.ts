import postgres from "postgres";

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

function get(): postgres.Sql {
  if (globalForDb.sql) return globalForDb.sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("缺少環境變數 DATABASE_URL");
  // prepare: false 讓 Supabase 的 transaction pooler（port 6543）也能用
  return (globalForDb.sql = postgres(url, { prepare: false, max: 5, idle_timeout: 20 }));
}

/** 第一次查詢時才連線，讓 build 時不需要資料庫 */
export const sql = new Proxy(function () {} as unknown as postgres.Sql, {
  apply: (_t, _this, args) => (get() as unknown as (...a: unknown[]) => unknown)(...args),
  get: (_t, prop) => {
    const real = get();
    const v = Reflect.get(real, prop);
    return typeof v === "function" ? v.bind(real) : v;
  },
});
