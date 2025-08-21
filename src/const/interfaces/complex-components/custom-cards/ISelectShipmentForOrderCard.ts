import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface ISelectShipmentForOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  shipmentsGridModel?: GridModel;
  services?: any[];
  statuses?: any[];
  customer?: CustomerModel;
  onAction?: (identifier: string, payload?: any) => void;
}
