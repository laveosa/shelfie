import { OrderModel } from "@/const/models/OrderModel.ts";
import { StatusModel } from "@/const/models/StatusModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IOrderConfigurationCard {
  isLoading?: boolean;
  isDiscountsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  order?: OrderModel;
  statuses?: StatusModel[];
  shipmentsRate?: any[];
  shipmentGridModel?: GridRequestModel;
  discountGridModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
