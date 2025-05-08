create or replace function average_price_per_category()
returns table (
  category text,
  average_price numeric
)
language sql
as $$
  select
    category,
    avg(price)::numeric as average_price
  from items
  group by category
  order by category
$$;
