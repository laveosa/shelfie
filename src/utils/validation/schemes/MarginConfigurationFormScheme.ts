import { z } from "zod";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";
import { MarginModel } from "@/const/models/MarginModel.ts";

const nonemptyMessage = "field is required";

const MarginConfigurationFormScheme: AppSchemeType<MarginModel> = z.object({
  marginName: z.string().nonempty(nonemptyMessage).min(2, "min value length 2"),
  marginRule: z.object({
    desiredProfit: z.any().optional(),
    plannedDiscount: z.any().optional(),
    fixedCosts: z.any().optional(),
    roundTo: z.boolean().optional(),
    nearest9: z.boolean().optional(),
  }),
});

export default MarginConfigurationFormScheme;
