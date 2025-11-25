import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export interface IOpenCartsCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  preferences?: PreferencesModel;
  sortingOptions?: GridSortingModel[];
  openCartsGridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
