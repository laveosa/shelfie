import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface IShipmentsCard {
  isLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  preferences?: PreferencesModel[];
  sortingOptions?: GridSortingModel[];
  customersList?: SupplierModel[];
  shipmentsGridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
