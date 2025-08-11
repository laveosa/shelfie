import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export interface IOrdersCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  preferences?: PreferencesModel;
  sortingOptions?: GridSortingModel[];
  ordersGridModel?: GridModel;
  ordersGridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
