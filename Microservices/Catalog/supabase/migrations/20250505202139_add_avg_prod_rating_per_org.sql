create or replace function public.average_org_product_ratings()
returns table (
  org_id       integer,
  org_name     text,
  average_rating numeric
)
language sql
as $$
  select
    o.id        as org_id,
    o.name      as org_name,
    avg(r.rating)::numeric as average_rating
  from reviews r
  join items i        on i.id        = r.item_id
  join organisations o on o.id        = i.org_id
  group by o.id, o.name
$$;