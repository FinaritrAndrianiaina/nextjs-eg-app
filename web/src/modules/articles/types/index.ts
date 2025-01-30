import { zTextArea } from "@/lib/zod-custom-types/zod-textarea";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { articlesTable } from "../tables/schema";

export type SelectArticles = typeof articlesTable.$inferSelect;

export const insertArticlesSchema = createInsertSchema(articlesTable, {
  publishedDate: z.date(),
  isFeatured: z.boolean(),
  excerpt: zTextArea(),
});
