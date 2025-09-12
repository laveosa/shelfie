import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ShipmentModel } from "@/const/models/ShipmentModel.ts";

const initialState: IShipmentsPageSlice = {
  isProductMenuCardLoading: false,
  isShipmentsCardLoading: false,
  isShipmentsGridLoading: false,
  activeCards: [],
  activeTab: "allShipments",
  shipmentsGridRequestModel: {},
  selectedShipment: null,
};

//----------------------------------------------------- LOADERS

function setIsProductMenuCardLoading(
  state: IShipmentsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsShipmentsCardLoading(
  state: IShipmentsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentsCardLoading = action?.payload;
}

function setIsShipmentsGridLoading(
  state: IShipmentsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentsGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IShipmentsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshActiveTab(
  state: IShipmentsPageSlice,
  action: PayloadAction<string>,
) {
  state.activeTab = action?.payload || state.activeTab;
}

function refreshShipmentsGridRequestModel(
  state: IShipmentsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.shipmentsGridRequestModel =
    action?.payload || state.shipmentsGridRequestModel;
}

function refreshSelectedShipment(
  state: IShipmentsPageSlice,
  action: PayloadAction<ShipmentModel>,
) {
  state.selectedShipment = action?.payload || state.selectedShipment;
}

const ShipmentsPageSlice = createSlice({
  name: StoreSliceEnum.SHIPMENTS,
  initialState,
  reducers: {
    setIsProductMenuCardLoading,
    setIsShipmentsCardLoading,
    setIsShipmentsGridLoading,
    refreshActiveCards,
    refreshActiveTab,
    refreshShipmentsGridRequestModel,
    refreshSelectedShipment,
  },
});

export const ShipmentsPageSliceActions = ShipmentsPageSlice.actions;
export default ShipmentsPageSlice;
