import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { OrderCountersModel } from "@/const/models/CounterModel.ts";

const initialState: IOrdersPageSlice = {
  isLoading: false,
  isOrdersCardLoading: false,
  isOrdersGridLoading: false,
  activeCards: [],
  sortingOptions: [],
  ordersGridRequestModel: {},
  selectedOrder: null,
  customersGridRequestModel: {},
  variantsGridRequestModel: {},
  brands: [],
  categories: [],
  colorsForFilter: [],
  sizesForFilter: [],
  stockActionsGridRequestModel: {},
  productCounter: null,
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

function refreshCustomersGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.customersGridRequestModel =
    action?.payload || state.customersGridRequestModel;
}

function refreshVariantsGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.variantsGridRequestModel =
    action?.payload || state.variantsGridRequestModel;
}

function refreshBrands(
  state: IOrdersPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IOrdersPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshSizesForFilter(
  state: IOrdersPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.sizesForFilter = action?.payload || state.sizesForFilter;
}

function refreshColorsForFilter(
  state: IOrdersPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.colorsForFilter = action?.payload || state.colorsForFilter;
}

function refreshStockActionsGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.stockActionsGridRequestModel =
    action?.payload || state.stockActionsGridRequestModel;
}

function refreshProductCounter(
  state: IOrdersPageSlice,
  action: PayloadAction<OrderCountersModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
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
    refreshOrdersGridRequestModel,
    refreshSelectedOrder,
    refreshCustomersGridRequestModel,
    refreshVariantsGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSizesForFilter,
    refreshColorsForFilter,
    refreshStockActionsGridRequestModel,
    refreshProductCounter,
  },
});

export const OrdersPageSliceActions = OrdersPageSlice.actions;
export default OrdersPageSlice;
