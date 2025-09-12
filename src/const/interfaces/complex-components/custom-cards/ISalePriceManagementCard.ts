import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { PurchaseCountersModel } from "@/const/models/CounterModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface ISalePriceManagementCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  preferences?: PreferencesModel;
  sortingOptions?: GridSortingModel[];
  brands?: BrandModel[];
  categories?: CategoryModel[];
  colors?: TraitOptionModel[];
  sizes?: TraitOptionModel[];
  taxes?: TaxTypeModel[];
  gridRequestModel?: GridRequestModel;
  purchaseSummary?: PurchaseCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
}
