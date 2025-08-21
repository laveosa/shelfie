import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export interface IShipmentsCard {
  isLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  preferences?: PreferencesModel[];
  shipmentsGridModel?: GridModel;
  shipmentsGridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
