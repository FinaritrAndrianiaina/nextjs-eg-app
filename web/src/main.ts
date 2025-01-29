import * as awilix from "awilix";
import "dotenv/config";
import { createTypedContainer } from "./awilix/create-typed-container";
import { ContainerConfig } from "./config";
import { ArticlesService } from "./modules/articles/services/articles.services";
import { db, DbService } from "./modules/database";
import { getLogger } from "./modules/logger";
import { SystemService } from "./modules/system/services/system.services";
import { SessionsContext } from "./sessions-context";

const container = createTypedContainer(
  {
    // Registering a simple value
    config: awilix.asValue<ContainerConfig>({
      DB_FILE_NAME: process.env.DB_FILE_NAME!,
    }),
    // Registering a factory function
    getLogger: awilix.asFunction(getLogger).proxy(),
    db: awilix.asFunction<DbService>(db).classic(),
    systems: awilix.asClass(SystemService).classic(),
    request: awilix
      .asClass(SessionsContext)
      .setLifetime(awilix.Lifetime.SCOPED),
    articles: awilix.asClass(ArticlesService),
  },
  {
    injectionMode: awilix.InjectionMode.CLASSIC,
    strict: true,
  }
);

export default container;
