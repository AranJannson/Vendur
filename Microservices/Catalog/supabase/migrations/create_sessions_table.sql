create table public.sessions (
  session_id bigint primary key,
  user_id text not null,
  created_at timestamp with time zone default now()
);
