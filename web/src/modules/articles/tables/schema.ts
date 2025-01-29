import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const articlesTable = sqliteTable("articles", {
  id: text().primaryKey().notNull(),
  title: text(),
  subtitle: text(),
  publishedDate: text(),
  imageUrl: text(),
  tags: text({ mode: "json" }),
  excerpt: text(),
  readTime: text(),
  isFeatured: int({ mode: "boolean" }),
  url: text(),
});
