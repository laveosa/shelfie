import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

const initialState: IOrderShipmentPageSlice = {
  isProductMenuCardLoading: false,
  isShipmentDetailsCardLoading: false,
  isShipmentConfigurationCardLoading: false,
  isSelectEntityCardLoading: false,
  isSelectShipmentForOrderCardLoading: false,
  isSelectCustomerAddressCardLoading: false,
  isCustomerCardLoading: false,
  isCustomerAddressCardLoading: false,
  isProductsGridLoading: false,
  isSelectOrderForShipmentCardLoading: false,
  isOrderShipmentsGridLoading: false,
  isShipmentsGridLoading: false,
  isSelectEntityGridLoading: false,
  isSelectShipmentForOrderGridLoading: false,
  isCustomerAddressesGridLoading: false,
  isOrdersGridLoading: false,
  activeCards: [],
  orderShipments: [],
  selectedShipment: null,
  selectedCustomer: null,
  shipmentsGridRequestModel: {},
  addressesGridRequestModel: {},
  managedCustomer: null,
  countryCodesList: null,
  managedAddress: null,
  ordersGridRequestModel: {},
  activeCardForCustomers: undefined,
};

//----------------------------------------------------- LOADERS

function setIsProductMenuCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsShipmentDetailsCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentDetailsCardLoading = action?.payload;
}

function setIsShipmentConfigurationCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentConfigurationCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsSelectShipmentForOrderCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectShipmentForOrderCardLoading = action?.payload;
}

function setIsSelectCustomerAddressCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectCustomerAddressCardLoading = action?.payload;
}

function setIsCustomerCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerCardLoading = action?.payload;
}

function setIsCustomerAddressCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressCardLoading = action?.payload;
}

function setIsSelectOrderForShipmentCardLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectOrderForShipmentCardLoading = action?.payload;
}

function setIsProductsGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsGridLoading = action?.payload;
}

function setIsOrderShipmentsGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrderShipmentsGridLoading = action?.payload;
}

function setIsShipmentsGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentsGridLoading = action?.payload;
}

function setIsSelectEntityGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityGridLoading = action?.payload;
}

function setIsSelectShipmentForOrderGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectShipmentForOrderGridLoading = action?.payload;
}

function setIsCustomerAddressesGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressesGridLoading = action?.payload;
}

function setIsOrdersGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrdersGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshOrderShipments(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<ShipmentModel[]>,
) {
  state.orderShipments = action?.payload || state.orderShipments;
}

function refreshSelectedShipment(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<ShipmentModel>,
) {
  state.selectedShipment = action?.payload || state.selectedShipment;
}

function refreshSelectedCustomer(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.selectedCustomer = action?.payload || state.selectedCustomer;
}

function resetSelectedCustomer(state: IOrderShipmentPageSlice) {
  state.selectedCustomer = null;
}

function refreshShipmentsGridRequestModel(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.shipmentsGridRequestModel =
    action?.payload || state.shipmentsGridRequestModel;
}

function refreshAddressesGridRequestModel(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.addressesGridRequestModel =
    action?.payload || state.addressesGridRequestModel;
}

function refreshManagedCustomer(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.managedCustomer = action?.payload || state.managedCustomer;
}

function resetManagedCustomer(state: IOrderShipmentPageSlice) {
  state.managedCustomer = null;
}

function refreshManagedAddress(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<AddressModel>,
) {
  state.managedAddress = action?.payload || state.managedAddress;
}

function resetManagedAddress(state: IOrderShipmentPageSlice) {
  state.managedAddress = null;
}

function refreshCountryCodesList(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodesList = action?.payload || state.countryCodesList;
}

function refreshOrdersGridRequestModel(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.ordersGridRequestModel =
    action?.payload || state.ordersGridRequestModel;
}

function refreshActiveCardForCustomers(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<string>,
) {
  state.activeCardForCustomers =
    action?.payload || state.activeCardForCustomers;
}

function resetActiveCardForCustomers(state: IOrderShipmentPageSlice) {
  state.activeCardForCustomers = undefined;
}

const OrderShipmentPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_SHIPMENT,
  initialState,
  reducers: {
    setIsProductMenuCardLoading,
    setIsShipmentDetailsCardLoading,
    setIsShipmentConfigurationCardLoading,
    setIsSelectEntityCardLoading,
    setIsSelectShipmentForOrderCardLoading,
    setIsSelectCustomerAddressCardLoading,
    setIsCustomerAddressCardLoading,
    setIsCustomerCardLoading,
    setIsSelectOrderForShipmentCardLoading,
    setIsProductsGridLoading,
    setIsOrderShipmentsGridLoading,
    setIsShipmentsGridLoading,
    setIsSelectEntityGridLoading,
    setIsSelectShipmentForOrderGridLoading,
    setIsCustomerAddressesGridLoading,
    setIsOrdersGridLoading,
    refreshActiveCards,
    refreshOrderShipments,
    refreshSelectedShipment,
    refreshSelectedCustomer,
    resetSelectedCustomer,
    refreshShipmentsGridRequestModel,
    refreshAddressesGridRequestModel,
    refreshManagedCustomer,
    resetManagedCustomer,
    refreshManagedAddress,
    resetManagedAddress,
    refreshCountryCodesList,
    refreshOrdersGridRequestModel,
    refreshActiveCardForCustomers,
    resetActiveCardForCustomers,
  },
});

export const OrderShipmentPageSliceActions = OrderShipmentPageSlice.actions;
export default OrderShipmentPageSlice;
