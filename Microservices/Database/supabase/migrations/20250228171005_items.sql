create table public.items (
  id serial not null,
  created_at timestamp with time zone null default now(),
  name text not null,
  image text null,
  price numeric(10, 2) not null,
  description text null,
  category text not null,
  discount integer null,
  org_id integer null,
  constraint items_pkey primary key (id)
) TABLESPACE pg_default;