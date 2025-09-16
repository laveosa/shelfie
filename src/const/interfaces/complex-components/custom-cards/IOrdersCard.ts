import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export interface IOrdersCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  preferences?: PreferencesModel;
  sortingOptions?: GridSortingModel[];
  ordersGridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
