
import { pgTable, serial, text, varchar, integer, date, decimal } from "drizzle-orm/pg-core";

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name'),
  price: decimal('price'),
  discount: integer('discount'),
  category: text('category'),
});

export const items_stock = pgTable('stock', {
  id: serial('id').primaryKey(),
  item_id: varchar('item_id').references(items.id as any),
  quantity: text('quantity'),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  item_id: varchar('item_id').references(items.id as any),
  reviewText: text('reviewText'),
  rating: integer('rating'),
  created_at: date('reviewTime'),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  item_id: varchar('item_id').references(items.id as any),
  quantity: integer('quantity'),

});


        