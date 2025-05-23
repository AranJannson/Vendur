create table public.browsing_history (
  user_id text not null,
  item_ids bigint[] not null default '{}'::bigint[],
  viewed_at timestamp with time zone [] not null default '{}'::timestamp with time zone [],
  constraint browsing_history_pkey primary key (user_id)
) TABLESPACE pg_default;