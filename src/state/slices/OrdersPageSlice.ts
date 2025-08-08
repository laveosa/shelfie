import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

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
    filter: {},
  },
  selectedOrder: null,
  customersGridModel: {
    pager: {},
    items: [],
  },
  customersGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
    filter: {},
  },
  variantsGridModel: {
    pager: {},
    items: [],
  },
  variantsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
    filter: {},
  },
  brands: [],
  categories: [],
  colorsForFilter: [],
  sizesForFilter: [],
  stockActionsGridModel: {
    pager: {},
    items: [],
  },
  stockActionsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
    filter: {},
  },
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

function refreshCustomersGridModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.customersGridModel = action?.payload || state.customersGridModel;
}

function refreshCustomersGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.customersGridRequestModel =
    action?.payload || state.customersGridRequestModel;
}

function refreshVariantsGridModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.variantsGridModel = action?.payload || state.variantsGridModel;
}

function variantsOrdersGridRequestModel(
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

function refreshStockActionsGridModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.stockActionsGridModel = action?.payload || state.stockActionsGridModel;
}

function refreshStockActionsGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.stockActionsGridRequestModel =
    action?.payload || state.stockActionsGridRequestModel;
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
    refreshCustomersGridModel,
    refreshCustomersGridRequestModel,
    refreshVariantsGridModel,
    variantsOrdersGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSizesForFilter,
    refreshColorsForFilter,
    refreshStockActionsGridModel,
    refreshStockActionsGridRequestModel,
  },
});

export const OrdersPageSliceActions = OrdersPageSlice.actions;
export default OrdersPageSlice;
