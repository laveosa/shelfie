import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

const initialState: IOrderShipmentPageSlice = {
  isProductMenuCardLoading: false,
  isShipmentDetailsCardLoading: false,
  isShipmentConfigurationCardLoading: false,
  isSelectEntityCardLoading: false,
  isSelectShipmentForOrderCardLoading: false,
  isSelectCustomerAddressCardLoading: false,
  isProductsGridLoading: false,
  isOrderShipmentsGridLoading: false,
  isShipmentsGridLoading: false,
  isSelectEntityGridLoading: false,
  isSelectShipmentForOrderGridLoading: false,
  isCustomerAddressesGridLoading: false,
  activeCards: [],
  orderShipments: [],
  selectedShipment: null,
  selectedCustomer: null,
  shipmentsGridRequestModel: {},
  addressesGridRequestModel: {},
  managedCustomer: null,
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
    setIsProductsGridLoading,
    setIsOrderShipmentsGridLoading,
    setIsShipmentsGridLoading,
    setIsSelectEntityGridLoading,
    setIsSelectShipmentForOrderGridLoading,
    setIsCustomerAddressesGridLoading,
    setIsCustomerCardLoading,
    refreshActiveCards,
    refreshOrderShipments,
    refreshSelectedShipment,
    refreshSelectedCustomer,
    resetSelectedCustomer,
    refreshShipmentsGridRequestModel,
    refreshAddressesGridRequestModel,
    refreshManagedCustomer,
    resetManagedCustomer,
  },
});

export const OrderShipmentPageSliceActions = OrderShipmentPageSlice.actions;
export default OrderShipmentPageSlice;
