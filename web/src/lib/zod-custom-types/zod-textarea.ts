import { z } from "zod";
import { zodAddMeta } from "../zod-utils";

export const zTextArea = (params?: any) =>
  zodAddMeta(z.string(params).brand("ZodTextArea"), {
    renderComponent: "ZodTextArea",
  });

export type ZodTextArea = z.infer<ReturnType<typeof zTextArea>>;
