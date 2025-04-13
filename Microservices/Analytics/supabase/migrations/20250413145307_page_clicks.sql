create table public.page_clicks (
  page text not null,
  count integer not null default 0,
  created_at timestamp with time zone null default now(),
  constraint page_clicks_pkey primary key (page)
) TABLESPACE pg_default;