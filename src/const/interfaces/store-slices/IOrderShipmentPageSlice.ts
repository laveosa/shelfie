import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface IOrderShipmentPageSlice {
  isProductMenuCardLoading?: boolean;
  isShipmentDetailsCardLoading?: boolean;
  isShipmentConfigurationCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isSelectShipmentForOrderCardLoading?: boolean;
  isSelectCustomerAddressCardLoading?: boolean;
  isCustomerCardLoading?: boolean;
  isProductsGridLoading?: boolean;
  isOrderShipmentsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  isSelectEntityGridLoading?: boolean;
  isSelectShipmentForOrderGridLoading?: boolean;
  isCustomerAddressesGridLoading?: boolean;
  activeCards?: any[];
  orderShipments?: ShipmentModel[];
  selectedShipment?: ShipmentModel;
  selectedCustomer?: CustomerModel;
  shipmentsGridRequestModel?: GridRequestModel;
  addressesGridRequestModel?: GridRequestModel;
  managedCustomer?: CustomerModel;
}
