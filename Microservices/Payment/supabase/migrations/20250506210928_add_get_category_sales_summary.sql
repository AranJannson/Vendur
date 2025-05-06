create or replace function get_category_sales_summary()
returns table (
  category text,
  total_orders bigint,
  total_quantity bigint
)
language sql
as $$
  select
    i.category,
    count(o.id) as total_orders,
    sum(o.quantity) as total_quantity
  from
    orders o
  join
    items i on o.item_id = i.id
  group by
    i.category
  order by
    total_quantity desc;
$$;
