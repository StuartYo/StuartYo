-- 奶蛙巡迴賽 資料庫結構（PostgreSQL / Supabase）
-- 可重複執行：所有物件都用 IF NOT EXISTS 建立。

create extension if not exists pgcrypto;

create table if not exists settings (
  key   text primary key,
  value jsonb not null
);

create table if not exists landmarks (
  id        serial primary key,
  name      text not null unique,
  category  text not null default 'landmark',
  lat       double precision not null,
  lng       double precision not null,
  radius_m  integer not null default 80,
  night_ok  boolean not null default false,
  enabled   boolean not null default true,
  hint      text not null default '',
  notes     text not null default ''
);

create table if not exists departments (
  id        serial primary key,
  college   text not null,
  name      text not null unique,
  short     text not null,
  kind      text not null default '學士班',
  students  integer,
  weight_override double precision,
  enabled   boolean not null default true
);

-- 每個時段（預設 60 分鐘一個，共 120 個）
create table if not exists slots (
  idx          integer primary key,
  landmark_id  integer not null references landmarks(id),
  gesture      text not null,
  voided       boolean not null default false,
  lost_notified boolean not null default false
);

create table if not exists devices (
  id          uuid primary key default gen_random_uuid(),
  dept_id     integer references departments(id),
  year        text,
  fp_hash     text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create table if not exists photos (
  id          uuid primary key default gen_random_uuid(),
  slot_idx    integer not null references slots(idx) on delete cascade,
  device_id   uuid references devices(id) on delete set null,
  path        text not null,
  lat         double precision,
  lng         double precision,
  accuracy    double precision,
  distance_m  double precision,
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now(),
  reviewed_at timestamptz
);
create index if not exists photos_slot_idx on photos(slot_idx, status);

create table if not exists scans (
  id          bigserial primary key,
  slot_idx    integer not null references slots(idx) on delete cascade,
  device_id   uuid not null references devices(id) on delete cascade,
  dept_id     integer not null references departments(id),
  year        text,
  lat         double precision,
  lng         double precision,
  accuracy    double precision,
  distance_m  double precision,
  ip          text,
  fp_hash     text,
  flags       text[] not null default '{}',
  excluded    boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (slot_idx, device_id)
);
create index if not exists scans_dept_idx on scans(dept_id);
create index if not exists scans_slot_fp_idx on scans(slot_idx, fp_hash);
