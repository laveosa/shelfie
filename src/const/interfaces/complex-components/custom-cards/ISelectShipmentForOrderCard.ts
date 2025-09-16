import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface ISelectShipmentForOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  shipmentsGridRequestModel?: GridRequestModel;
  services?: any[];
  statuses?: any[];
  customer?: CustomerModel;
  onAction?: (identifier: string, payload?: any) => void;
}
