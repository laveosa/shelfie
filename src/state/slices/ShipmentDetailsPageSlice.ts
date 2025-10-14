import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

const initialState: IShipmentDetailsPageSlice = {
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
  orderStockActions: [],
};

//----------------------------------------------------- LOADERS

function setIsShipmentConfigurationCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentConfigurationCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsSelectShipmentForOrderCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectShipmentForOrderCardLoading = action?.payload;
}

function setIsSelectCustomerAddressCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectCustomerAddressCardLoading = action?.payload;
}

function setIsCustomerCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerCardLoading = action?.payload;
}

function setIsCustomerAddressCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressCardLoading = action?.payload;
}

function setIsSelectOrderForShipmentCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectOrderForShipmentCardLoading = action?.payload;
}

function setIsProductsGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsGridLoading = action?.payload;
}

function setIsOrderShipmentsGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrderShipmentsGridLoading = action?.payload;
}

function setIsShipmentsGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentsGridLoading = action?.payload;
}

function setIsSelectEntityGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityGridLoading = action?.payload;
}

function setIsSelectShipmentForOrderGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectShipmentForOrderGridLoading = action?.payload;
}

function setIsCustomerAddressesGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressesGridLoading = action?.payload;
}

function setIsOrdersGridLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrdersGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshOrderShipments(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<ShipmentModel[]>,
) {
  state.orderShipments = action?.payload || state.orderShipments;
}

function refreshSelectedShipment(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<ShipmentModel>,
) {
  state.selectedShipment = action?.payload || state.selectedShipment;
}

function refreshSelectedCustomer(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.selectedCustomer = action?.payload || state.selectedCustomer;
}

function resetSelectedCustomer(state: IShipmentDetailsPageSlice) {
  state.selectedCustomer = null;
}

function refreshShipmentsGridRequestModel(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.shipmentsGridRequestModel =
    action?.payload || state.shipmentsGridRequestModel;
}

function refreshAddressesGridRequestModel(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.addressesGridRequestModel =
    action?.payload || state.addressesGridRequestModel;
}

function refreshManagedCustomer(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.managedCustomer = action?.payload || state.managedCustomer;
}

function resetManagedCustomer(state: IOrderShipmentPageSlice) {
  state.managedCustomer = null;
}

function refreshManagedAddress(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<AddressModel>,
) {
  state.managedAddress = action?.payload || state.managedAddress;
}

function resetManagedAddress(state: IShipmentDetailsPageSlice) {
  state.managedAddress = null;
}

function refreshCountryCodesList(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodesList = action?.payload || state.countryCodesList;
}

function refreshOrdersGridRequestModel(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.ordersGridRequestModel =
    action?.payload || state.ordersGridRequestModel;
}

function refreshActiveCardForCustomers(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<string>,
) {
  state.activeCardForCustomers =
    action?.payload || state.activeCardForCustomers;
}

function resetActiveCardForCustomers(state: IShipmentDetailsPageSlice) {
  state.activeCardForCustomers = undefined;
}

function refreshOrderStockActions(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.orderStockActions = action?.payload || state.orderStockActions;
}

const ShipmentDetailsPageSlice = createSlice({
  name: StoreSliceEnum.SHIPMENT_DETAILS,
  initialState,
  reducers: {
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
    refreshOrderStockActions,
  },
});

export const ShipmentDetailsPageSliceActions = ShipmentDetailsPageSlice.actions;
export default ShipmentDetailsPageSlice;
