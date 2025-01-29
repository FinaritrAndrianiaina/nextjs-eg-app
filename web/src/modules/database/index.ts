import { ContainerConfig } from "@/config";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = function (config: ContainerConfig) {
  return drizzle(config.DB_FILE_NAME);
};

export type DbService = ReturnType<typeof db>;
