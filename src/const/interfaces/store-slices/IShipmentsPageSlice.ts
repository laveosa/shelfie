import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";

export interface IShipmentsPageSlice {
  isProductMenuCardLoading?: boolean;
  isShipmentsCardLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  activeCards?: any[];
  activeTab?: string;
  shipmentsGridModel?: GridModel;
  shipmentsGridRequestModel?: GridRequestModel;
  selectedShipment?: ShipmentModel;
}
