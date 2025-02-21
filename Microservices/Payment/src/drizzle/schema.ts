
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const items_stock = pgTable('stock', {
  id: serial('id').primaryKey(),
  item_id: varchar('item_id').references(items.id as any),
  quantity: text('quantity'),
});
        