import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

const initialState: IPurchaseProductsPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isPurchaseProductsCardLoading: false,
  isPurchasesProductsGridLoading: false,
  isProductsGridLoading: false,
  isProductConfigurationCardLoading: false,
  isManageProductCardLoading: false,
  activeCards: [],
  activeTab: "purchaseProducts",
  selectedProduct: null,
  purchaseProducts: [],
  purchasesProductsGridModel: {
    pager: {},
    items: [],
  },
  purchasesProductsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  brands: [],
  categories: [],
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

function setIsProductConfigurationCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductConfigurationCardLoading = action?.payload;
}

function setIsManageProductCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageProductCardLoading = action?.payload;
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

function refreshSelectedProduct(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.selectedProduct = action?.payload || state.selectedProduct;
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

function refreshBrands(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
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
    setIsProductConfigurationCardLoading,
    setIsManageProductCardLoading,
    refreshActiveCards,
    refreshActiveTab,
    refreshSelectedProduct,
    refreshPurchaseProducts,
    refreshPurchasesProductsGridModel,
    refreshPurchasesProductsGridRequestModel,
    refreshBrands,
    refreshCategories,
  },
});

export const PurchaseProductsPageSliceActions =
  PurchaseProductsPageSlice.actions;
export default PurchaseProductsPageSlice;
