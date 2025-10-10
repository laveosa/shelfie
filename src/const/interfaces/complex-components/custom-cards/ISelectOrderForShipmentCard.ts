import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface ISelectOrderForShipmentCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  ordersGridRequestModel?: GridRequestModel;
  customer?: CustomerModel;
  onAction?: (identifier: string, payload?: any) => void;
}
