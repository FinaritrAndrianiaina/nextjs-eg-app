import { bumpVersion } from "@/lib/bump-version";
import { DbService } from "@/modules/database";
import { eq } from "drizzle-orm";
import { systemsInfoTable } from "../tables/schema";
import { SelectSystemsInfo } from "../types";

export class SystemService {
  constructor(private readonly db: DbService) {}

  async getSystemInfo() {
    return (await this.db.select().from(systemsInfoTable).limit(1)).at(0);
  }

  async updatePreferences(
    version: string,
    preferences: SelectSystemsInfo["preferences"]
  ) {
    const currentSystemInfo = (
      await this.db
        .select()
        .from(systemsInfoTable)
        .where(eq(systemsInfoTable.version, version))
        .limit(1)
    ).at(0);

    if (!currentSystemInfo) {
      throw new Error("Active system info not found");
    }

    const newVersion = bumpVersion(version, "minor");
    await this.db
      .update(systemsInfoTable)
      .set({ isActive: false })
      .where(eq(systemsInfoTable.version, version));
    return await this.db.insert(systemsInfoTable).values({
      ...currentSystemInfo,
      preferences,
      version: newVersion,
      isActive: true,
    });
  }
}
