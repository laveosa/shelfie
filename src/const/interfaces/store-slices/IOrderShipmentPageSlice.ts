import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface IOrderShipmentPageSlice {
  isProductMenuCardLoading?: boolean;
  isShipmentDetailsCardLoading?: boolean;
  isShipmentConfigurationCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isSelectShipmentForOrderCardLoading?: boolean;
  isProductsGridLoading?: boolean;
  isOrderShipmentsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  isSelectEntityGridLoading?: boolean;
  isSelectShipmentForOrderGridLoading?: boolean;
  activeCards?: any[];
  orderShipments?: ShipmentModel[];
  selectedShipment?: ShipmentModel;
  selectedCustomer?: CustomerModel;
  shipmentsGridModel?: GridModel;
  shipmentsGridRequestModel?: GridRequestModel;
}
