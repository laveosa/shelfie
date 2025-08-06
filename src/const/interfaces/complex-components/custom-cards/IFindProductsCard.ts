import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface IFindProductsCard {
  isLoading?: boolean;
  variants?: VariantModel[];
  gridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  sortingOptions?: GridSortingModel[];
  preferences?: PreferencesModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
