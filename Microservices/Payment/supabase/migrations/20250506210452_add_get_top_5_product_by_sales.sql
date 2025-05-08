create or replace function get_top_5_products_by_sales()
returns table (
  item_id bigint,
  name text,
  total_quantity bigint,
  total_sales double precision
)
language sql
as $$
  select
    i.id as item_id,
    i.name,
    sum(o.quantity) as total_quantity,
    sum(o.quantity * i.price) as total_sales
  from
    orders o
  join
    items i on o.item_id = i.id
  group by
    i.id, i.name
  order by
    total_sales desc
  limit 5;
$$;
