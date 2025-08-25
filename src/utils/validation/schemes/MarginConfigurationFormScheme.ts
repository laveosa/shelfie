import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const nonemptyMessage = "field is required";

const MarginConfigurationFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  marginName: z.string().nonempty(nonemptyMessage).min(2, "min value length 2"),
  marginRule: z.object({
    desiredProfit: z.any().optional(),
    plannedDiscount: z.any().optional(),
    fixedCosts: z.any().optional(),
  }),
  roundTo: z.boolean().optional(),
  nearest9: z.boolean().optional(),
});

export default MarginConfigurationFormScheme;
