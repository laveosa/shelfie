import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface IFindProductsCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variants?: any[];
  gridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  sortingOptions?: GridSortingModel[];
  preferences?: PreferencesModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  brands?: BrandModel[];
  categories?: CategoryModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
