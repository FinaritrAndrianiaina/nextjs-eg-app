import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const systemsInfoTable = sqliteTable("systems_info", {
  version: text().primaryKey().notNull(),
  appName: text().notNull(),
  description: text().notNull(),
  preferences: text({ mode: "json" }),
  isActive: int({ mode: "boolean" }).default(true),
});
