import { OrderModel } from "@/const/models/OrderModel.ts";
import { StatusModel } from "@/const/models/StatusModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IOrderConfigurationCard {
  isLoading?: boolean;
  isDiscountsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  order?: OrderModel;
  statuses?: StatusModel[];
  shipmentsRate?: any[];
  shipmentGridModel?: GridModel;
  discountGridModel?: GridModel;
  onAction?: (identifier: string, payload?: any) => void;
}
