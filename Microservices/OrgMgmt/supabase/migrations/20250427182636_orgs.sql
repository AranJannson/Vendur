create table public.orgs (
  id text not null,
  created_at timestamp with time zone not null default now(),
  name text not null,
  description text not null,
  email text not null,
  telephone text not null,
  address text not null,
  product_type text null,
  shipping_type text null,
  is_verified boolean not null default false,
  constraint orgs_pkey primary key (id),
  constraint orgs_email_key unique (email),
  constraint orgs_telephone_key unique (telephone),
  constraint orgs_name_key unique (name)
) TABLESPACE pg_default;