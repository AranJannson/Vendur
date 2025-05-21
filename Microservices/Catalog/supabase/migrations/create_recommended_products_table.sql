create table public.recommended_products (
  id bigserial primary key,
  user_id text not null,
  item_id bigint not null,
  score double precision not null default 1,
  recommended_at timestamp with time zone default now(),

  constraint recommended_products_user_item_unique unique (user_id, item_id),
  constraint recommended_products_item_id_fkey foreign key (item_id) references items(id) on delete cascade
);
