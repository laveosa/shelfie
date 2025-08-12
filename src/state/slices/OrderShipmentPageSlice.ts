import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";

const initialState: IOrderShipmentPageSlice = {
  isProductMenuCardLoading: false,
  isShipmentDetailsCardLoading: false,
  isProductsGridLoading: false,
  isShipmentsGridLoading: false,
  activeCards: [],
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

function setIsProductsGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsGridLoading = action?.payload;
}

function setIsShipmentsGridLoading(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentsGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderShipmentPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

const OrderShipmentPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_SHIPMENT,
  initialState,
  reducers: {
    setIsProductMenuCardLoading,
    setIsShipmentDetailsCardLoading,
    setIsProductsGridLoading,
    setIsShipmentsGridLoading,
    refreshActiveCards,
  },
});

export const OrderShipmentPageSliceActions = OrderShipmentPageSlice.actions;
export default OrderShipmentPageSlice;
