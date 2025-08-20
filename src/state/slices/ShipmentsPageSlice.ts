import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

const initialState: IShipmentsPageSlice = {
  isProductMenuCardLoading: false,
  isShipmentsCardLoading: false,
  isShipmentsGridLoading: false,
  activeCards: [],
  activeTab: "allShipments",
  shipmentsGridModel: {
    pager: {},
    items: [],
  },
  shipmentsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    filter: {},
  },
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

function refreshShipmentsGridModel(
  state: IShipmentsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.shipmentsGridModel = action?.payload || state.shipmentsGridModel;
}

function refreshShipmentsGridRequestModel(
  state: IShipmentsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.shipmentsGridRequestModel =
    action?.payload || state.shipmentsGridRequestModel;
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
    refreshShipmentsGridModel,
    refreshShipmentsGridRequestModel,
  },
});

export const ShipmentsPageSliceActions = ShipmentsPageSlice.actions;
export default ShipmentsPageSlice;
