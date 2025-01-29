import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { systemsInfoTable } from "../tables/schema";

export type SelectSystemsInfo = typeof systemsInfoTable.$inferSelect;

export const updatePreferencesSystemInfoSchema = createSelectSchema(
  systemsInfoTable,
  {
    isActive: z.boolean(),
    preferences: z
      .object({
        theme: z.string().nonempty(),
      })
      .required(),
  }
);
