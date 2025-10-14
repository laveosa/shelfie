import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface IShipmentDetailsPageSlice {
  isShipmentConfigurationCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isSelectShipmentForOrderCardLoading?: boolean;
  isSelectCustomerAddressCardLoading?: boolean;
  isCustomerCardLoading?: boolean;
  isCustomerAddressCardLoading?: boolean;
  isSelectOrderForShipmentCardLoading?: boolean;
  isProductsGridLoading?: boolean;
  isOrderShipmentsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  isSelectEntityGridLoading?: boolean;
  isSelectShipmentForOrderGridLoading?: boolean;
  isCustomerAddressesGridLoading?: boolean;
  isOrdersGridLoading?: boolean;
  activeCards?: any[];
  orderShipments?: ShipmentModel[];
  selectedShipment?: ShipmentModel;
  selectedCustomer?: CustomerModel;
  shipmentsGridRequestModel?: GridRequestModel;
  addressesGridRequestModel?: GridRequestModel;
  managedCustomer?: CustomerModel;
  managedAddress?: AddressModel;
  countryCodesList?: CountryCodeModel[];
  ordersGridRequestModel?: GridRequestModel;
  activeCardForCustomers?: string;
  orderStockActions?: any[];
}
