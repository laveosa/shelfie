import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { PurchaseCountersModel } from "@/const/models/CounterModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface ISalePriceManagementCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  preferences?: PreferencesModel;
  taxes?: TaxTypeModel[];
  gridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  purchaseSummary?: PurchaseCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
}
