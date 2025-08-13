import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface ISelectShipmentForOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  shipments?: any[];
  customer?: CustomerModel;
  onAction?: (identifier: string, payload?: any) => void;
}
