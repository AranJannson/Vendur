
import { pgTable, serial, text, varchar, date, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const items_stock = pgTable('stock', {
  id: serial('id').primaryKey(),
  item_id: varchar('item_id').references(items.id as any),
  quantity: text('quantity'),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  created_at: date('created_at'),
  item_id: varchar('item_id').references(items.id as any),
  quantity: integer('quantity')

});

export const sellers = pgTable('sellers', {
  seller_id: serial('seller_id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  rating: integer('rating').default(0),
  created_at: timestamp('created_at').defaultNow(),
  is_verified: boolean('is_verified').default(false),
  is_banned: boolean('is_banned').default(false),
})