create table public.basket (

  user_id text not null,

  created_at timestamp with time zone not null default now(),

  items bigint[] null,

  quantities bigint[] null,

  constraint basket_pkey primary key (user_id)

) TABLESPACE pg_default;