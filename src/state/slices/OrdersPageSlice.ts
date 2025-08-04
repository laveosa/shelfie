import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";

const initialState: IOrdersPageSlice = {
  isLoading: false,
  isOrdersCardLoading: false,
  isOrdersGridLoading: false,
  activeCards: [],
  sortingOptions: [],
  ordersGridModel: {
    pager: {},
    items: [],
  },
  ordersGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  selectedOrder: null,
};

//----------------------------------------------------- LOADERS

function setIsLoading(state: IOrdersPageSlice, action: PayloadAction<boolean>) {
  state.isLoading = action?.payload;
}

function setIsOrdersCardLoading(
  state: IOrdersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrdersCardLoading = action?.payload;
}

function setIsOrdersGridLoading(
  state: IOrdersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrdersGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrdersPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshSortingOptions(
  state: IOrdersPageSlice,
  action: PayloadAction<GridSortingModel[]>,
) {
  state.sortingOptions = action?.payload || state.sortingOptions;
}

function refreshOrdersGridModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.ordersGridModel = action?.payload || state.ordersGridModel;
}

function refreshOrdersGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.ordersGridRequestModel =
    action?.payload || state.ordersGridRequestModel;
}

function refreshSelectedOrder(
  state: IOrdersPageSlice,
  action: PayloadAction<OrderModel>,
) {
  state.selectedOrder = action?.payload || state.selectedOrder;
}

const OrdersPageSlice = createSlice({
  name: StoreSliceEnum.ORDERS,
  initialState,
  reducers: {
    setIsLoading,
    setIsOrdersCardLoading,
    setIsOrdersGridLoading,
    refreshActiveCards,
    refreshSortingOptions,
    refreshOrdersGridModel,
    refreshOrdersGridRequestModel,
    refreshSelectedOrder,
  },
});

export const OrdersPageSliceActions = OrdersPageSlice.actions;
export default OrdersPageSlice;
