import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IVariantConfigurationCard {
  variant?: VariantModel;
  data?: GridModel;
}
