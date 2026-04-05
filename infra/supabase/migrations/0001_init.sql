create extension if not exists pgcrypto;

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  anonymous_token text not null,
  created_at timestamptz not null default timezone('utc', now()),
  last_seen_at timestamptz not null default timezone('utc', now()),
  device_type text not null default 'mobile',
  locale text not null default 'ja-JP',
  constraint sessions_anonymous_token_key unique (anonymous_token)
);

create table if not exists public.hero_assets (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  name text not null,
  asset_type text not null check (asset_type in ('image', 'sprite', '3d')),
  storage_path text not null,
  thumbnail_path text,
  is_active boolean not null default false,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint hero_assets_version_key unique (version)
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions (id) on delete cascade,
  kind text not null check (kind in ('scene', 'style_ref', 'ar_capture', 'target_image', 'generated')),
  bucket text not null,
  storage_path text not null,
  mime_type text not null,
  width integer,
  height integer,
  file_size bigint,
  visibility text not null default 'private' check (visibility in ('private', 'public')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.spot_presets (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text not null,
  prompt_template text not null,
  default_ar_mode text not null check (default_ar_mode in ('world', 'target', 'face')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  constraint spot_presets_slug_key unique (slug)
);

create table if not exists public.style_presets (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text not null,
  prompt_template text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  constraint style_presets_slug_key unique (slug)
);

create table if not exists public.ar_targets (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  target_upload_id uuid references public.uploads (id) on delete set null,
  spot_preset_id uuid references public.spot_presets (id) on delete set null,
  is_active boolean not null default true,
  metadata_json jsonb not null default '{}'::jsonb,
  constraint ar_targets_slug_key unique (slug)
);

create table if not exists public.ar_captures (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  mode text not null check (mode in ('world', 'target', 'face')),
  capture_upload_id uuid not null references public.uploads (id) on delete cascade,
  target_id uuid references public.ar_targets (id) on delete set null,
  pose_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  source_capture_id uuid references public.ar_captures (id) on delete set null,
  scene_upload_id uuid references public.uploads (id) on delete set null,
  style_upload_id uuid references public.uploads (id) on delete set null,
  hero_asset_version text not null,
  spot_preset_id uuid references public.spot_presets (id) on delete set null,
  style_preset_id uuid references public.style_presets (id) on delete set null,
  free_text text,
  aspect_ratio text not null check (aspect_ratio in ('1:1', '4:5', '9:16')),
  provider text not null,
  model_id text not null,
  status text not null check (status in ('queued', 'preprocessing', 'prompt_built', 'generating', 'storing', 'completed', 'failed', 'blocked')),
  error_code text,
  error_message text,
  request_json jsonb not null default '{}'::jsonb,
  timing_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  started_at timestamptz,
  completed_at timestamptz
);

create table if not exists public.generation_outputs (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.generation_jobs (id) on delete cascade,
  upload_id uuid not null references public.uploads (id) on delete cascade,
  variant_no integer not null default 1,
  is_selected boolean not null default false,
  has_c2pa boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.share_pages (
  id uuid primary key default gen_random_uuid(),
  output_id uuid not null references public.generation_outputs (id) on delete cascade,
  slug text not null,
  is_public boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  constraint share_pages_slug_key unique (slug)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  output_id uuid not null references public.generation_outputs (id) on delete cascade,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions (id) on delete cascade,
  event_name text not null,
  event_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists uploads_session_created_at_idx on public.uploads (session_id, created_at desc);
create index if not exists spot_presets_active_sort_idx on public.spot_presets (is_active, sort_order);
create index if not exists style_presets_active_sort_idx on public.style_presets (is_active, sort_order);
create index if not exists ar_targets_active_idx on public.ar_targets (is_active);
create index if not exists ar_captures_session_created_at_idx on public.ar_captures (session_id, created_at desc);
create index if not exists generation_jobs_session_created_at_idx on public.generation_jobs (session_id, created_at desc);
create index if not exists generation_jobs_status_created_at_idx on public.generation_jobs (status, created_at desc);
create index if not exists generation_outputs_job_idx on public.generation_outputs (job_id, created_at desc);
create index if not exists reports_status_created_at_idx on public.reports (status, created_at desc);
create index if not exists analytics_events_session_created_at_idx on public.analytics_events (session_id, created_at desc);

alter table public.sessions enable row level security;
alter table public.hero_assets enable row level security;
alter table public.uploads enable row level security;
alter table public.spot_presets enable row level security;
alter table public.style_presets enable row level security;
alter table public.ar_targets enable row level security;
alter table public.ar_captures enable row level security;
alter table public.generation_jobs enable row level security;
alter table public.generation_outputs enable row level security;
alter table public.share_pages enable row level security;
alter table public.reports enable row level security;
alter table public.analytics_events enable row level security;

insert into storage.buckets (id, name, public)
values
  ('raw-private', 'raw-private', false),
  ('capture-private', 'capture-private', false),
  ('generated-private', 'generated-private', false),
  ('public-share', 'public-share', true),
  ('admin-assets', 'admin-assets', false)
on conflict (id) do nothing;
