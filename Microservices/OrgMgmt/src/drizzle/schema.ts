import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const organisations = pgTable("organisations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  email: text("email").notNull().unique(),
  telephone: text("telephone"),
  website: text("website"),
  address: text("address"),
  created_at: text("created_at").default("NOW()"),
  is_verified: text("is_verified").default("false"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name"),
  organisation_id: integer("organisation_id").notNull().references(() => organisations.id),
});

export const items_stock = pgTable("stock", {
  id: serial("id").primaryKey(),
  item_id: varchar("item_id").references((items.id as any)),
  quantity: text("quantity"),
});