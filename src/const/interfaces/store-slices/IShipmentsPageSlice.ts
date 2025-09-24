import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface IShipmentsPageSlice {
  isProductMenuCardLoading?: boolean;
  isShipmentsCardLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  activeCards?: any[];
  activeTab?: string;
  shipmentsGridRequestModel?: GridRequestModel;
  selectedShipment?: ShipmentModel;
  customersList?: CustomerModel[];
}
