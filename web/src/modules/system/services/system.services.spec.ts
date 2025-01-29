import { DbService } from "@/modules/database";
import { systemsInfoTable } from "../tables/schema";
import { SelectSystemsInfo } from "../types";
import { SystemService } from "./system.services";

const mockSystemInfoResponses = {
  appName: "Test System",
  version: "0..0.1.test",
  description: "Test System Description",
  isActive: true,
  preferences: JSON.stringify({}),
} as SelectSystemsInfo;

describe("SystemService", () => {
  let systemService: SystemService;
  let dbServiceMock: jest.Mocked<DbService>;

  beforeEach(() => {
    dbServiceMock = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([mockSystemInfoResponses]),
        }),
        fields: jest.fn(),
        session: jest.fn(),
        dialect: jest.fn(),
        withList: jest.fn(),
        distinct: jest.fn(),
      }),
    } as unknown as jest.Mocked<DbService>;
    systemService = new SystemService(dbServiceMock);
  });

  it("should return system info", async () => {
    const result = await systemService.getSystemInfo();
    expect(result).toEqual(mockSystemInfoResponses);
    expect(dbServiceMock.select).toHaveBeenCalled();
    expect(dbServiceMock.select().from).toHaveBeenCalledWith(systemsInfoTable);
    expect(
      dbServiceMock.select().from(systemsInfoTable).limit
    ).toHaveBeenCalledWith(1);
  });
});
