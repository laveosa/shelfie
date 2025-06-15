import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

const initialState: IPurchaseProductsPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isPurchaseProductsCardLoading: false,
  isPurchasesProductsGridLoading: false,
  isProductsGridLoading: false,
  activeCards: [],
  activeTab: "purchaseProducts",
  purchaseProducts: [],
  purchasesProductsGridModel: {
    pager: {},
    items: [],
  },
  purchasesProductsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
};

function setIsLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsPurchaseProductsCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchaseProductsCardLoading = action?.payload;
}

function setIsPurchasesProductsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchasesProductsGridLoading = action?.payload;
}

function setIsProductsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsGridLoading = action?.payload;
}

function refreshActiveCards(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshActiveTab(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<string>,
) {
  state.activeTab = action?.payload || state.activeTab;
}

function refreshPurchaseProducts(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.purchaseProducts = action?.payload || state.purchaseProducts;
}

function refreshPurchasesProductsGridModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.purchasesProductsGridModel =
    action?.payload || state.purchasesProductsGridModel;
}

function refreshPurchasesProductsGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchasesProductsGridRequestModel =
    action?.payload || state.purchasesProductsGridRequestModel;
}

const PurchaseProductsPageSlice = createSlice({
  name: StoreSliceEnum.PURCHASE_PRODUCTS,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsPurchaseProductsCardLoading,
    setIsPurchasesProductsGridLoading,
    setIsProductsGridLoading,
    refreshActiveCards,
    refreshActiveTab,
    refreshPurchaseProducts,
    refreshPurchasesProductsGridModel,
    refreshPurchasesProductsGridRequestModel,
  },
});

export const PurchaseProductsPageSliceActions =
  PurchaseProductsPageSlice.actions;
export default PurchaseProductsPageSlice;
