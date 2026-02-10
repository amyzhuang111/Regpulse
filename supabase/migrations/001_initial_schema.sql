-- RegPulse Initial Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'analyst' check (role in ('admin', 'analyst', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "Service role full access on profiles"
  on profiles for all
  using (true)
  with check (true);

-- ============================================================
-- RULES (regulatory rules library)
-- ============================================================
create table if not exists rules (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  description text not null,
  category text not null,
  authority text not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  keywords text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table rules enable row level security;
create policy "Service role full access on rules"
  on rules for all
  using (true)
  with check (true);

-- ============================================================
-- CALLS (uploaded audio / transcribed calls)
-- ============================================================
create table if not exists calls (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  agent_name text not null default 'Unknown Agent',
  customer_name text,
  status text not null default 'pending' check (status in ('active', 'completed', 'failed', 'pending')),
  duration_seconds integer,
  transcript text,
  audio_storage_path text,
  risk_score integer not null default 0,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

alter table calls enable row level security;
create policy "Service role full access on calls"
  on calls for all
  using (true)
  with check (true);

-- ============================================================
-- VIOLATIONS
-- ============================================================
create table if not exists violations (
  id uuid primary key default uuid_generate_v4(),
  call_id uuid not null references calls(id) on delete cascade,
  rule_id uuid not null references rules(id),
  user_id text not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  confidence integer not null check (confidence between 0 and 100),
  description text not null,
  transcript_excerpt text not null,
  timestamp_ms integer,
  ai_reasoning text,
  status text not null default 'open' check (status in ('open', 'acknowledged', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table violations enable row level security;
create policy "Service role full access on violations"
  on violations for all
  using (true)
  with check (true);

-- ============================================================
-- EVIDENCE
-- ============================================================
create table if not exists evidence (
  id uuid primary key default uuid_generate_v4(),
  violation_id uuid not null references violations(id) on delete cascade,
  type text not null check (type in ('audio_clip', 'transcript_snippet', 'screenshot')),
  content text not null,
  storage_path text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table evidence enable row level security;
create policy "Service role full access on evidence"
  on evidence for all
  using (true)
  with check (true);

-- ============================================================
-- SEED: 8 regulatory rules
-- ============================================================
insert into rules (code, name, description, category, authority, severity, keywords) values
  ('SEC-10B-5', 'Anti-Fraud Provision',
   'Prohibits fraud, misrepresentation, and deceit in connection with the purchase or sale of securities. Includes making untrue statements of material fact or omitting material facts.',
   'Securities Fraud', 'SEC', 'critical',
   '{"guaranteed returns","no risk","can''t lose","sure thing","promise","guaranteed profit"}'),

  ('REG-BI', 'Regulation Best Interest',
   'Requires broker-dealers to act in the best interest of retail customers when making recommendations, without placing their own financial interests ahead of the customer''s interests.',
   'Best Interest', 'SEC', 'high',
   '{"best for you","perfect fit","only option","must buy","can''t miss","exclusive opportunity"}'),

  ('FINRA-2111', 'Suitability',
   'Requires that a firm or associated person have a reasonable basis to believe a recommended transaction or investment strategy is suitable for the customer.',
   'Suitability', 'FINRA', 'high',
   '{"suitable for everyone","one size fits all","don''t need to know","trust me","skip the paperwork"}'),

  ('FINRA-2210', 'Communications with the Public',
   'Requires that all member communications be fair, balanced, and not misleading. Prohibits exaggerated, unwarranted, or misleading claims.',
   'Communications', 'FINRA', 'medium',
   '{"always goes up","never loses","top performer","beat the market","outperform"}'),

  ('FTC-ACT-SEC5', 'FTC Act Section 5 - Unfair/Deceptive Practices',
   'Prohibits unfair or deceptive acts or practices in or affecting commerce. Covers false advertising, misleading claims, and unfair business practices.',
   'Consumer Protection', 'FTC', 'high',
   '{"free","no obligation","limited time","act now","risk-free","money-back guarantee"}'),

  ('SEC-206-4-1', 'Marketing Rule',
   'Regulates investment adviser advertisements and marketing materials. Prohibits untrue statements, unsubstantiated claims about performance, and misleading use of testimonials.',
   'Marketing', 'SEC', 'medium',
   '{"past performance","track record","historical returns","testimonial","endorsement"}'),

  ('SEC-204-2', 'Books and Records',
   'Requires investment advisers to maintain accurate books and records, including all communications related to recommendations and transactions.',
   'Record Keeping', 'SEC', 'low',
   '{"off the record","don''t write this down","between us","unofficial"}'),

  ('REG-S-P', 'Privacy of Consumer Financial Information',
   'Requires financial institutions to protect consumers'' personal financial information and provide privacy notices.',
   'Privacy', 'SEC', 'medium',
   '{"social security","account number","password","personal information","share your data"}')
on conflict (code) do nothing;

-- ============================================================
-- INDEXES for common queries
-- ============================================================
create index if not exists idx_violations_call_id on violations(call_id);
create index if not exists idx_violations_severity on violations(severity);
create index if not exists idx_violations_status on violations(status);
create index if not exists idx_violations_created_at on violations(created_at desc);
create index if not exists idx_calls_user_id on calls(user_id);
create index if not exists idx_calls_status on calls(status);
create index if not exists idx_evidence_violation_id on evidence(violation_id);
