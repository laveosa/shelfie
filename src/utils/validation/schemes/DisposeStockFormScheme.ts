import { z } from "zod";

import { DisposeStockModel } from "@/const/models/DisposeStockModel.ts";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const nonemptyMessage = "field is required";

const disposeStockFormScheme: z.ZodObject<IZodSchema<DisposeStockModel>> =
  z.object({
    unitAmount: z
      .number({ required_error: nonemptyMessage })
      .min(0, "min value length 0"),
    reason: z.number({ required_error: nonemptyMessage }),
  });

export default disposeStockFormScheme;
