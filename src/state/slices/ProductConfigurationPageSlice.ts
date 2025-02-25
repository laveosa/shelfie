import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { IProductConfigurationPageSlice } from "@/const/interfaces/store-slices/IProductConfigurationPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

const initialState: IProductConfigurationPageSlice = {
  loading: false,
  products: [],
  product: null,
  activeCards: [],
  brandsList: [],
  categoriesList: [],
  brand: {},
  category: {},
  contextId: null,
  productCounter: null,
};

function setLoading(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<boolean>,
) {
  state.loading = action?.payload;
}

function refreshProducts(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProduct(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.product = action?.payload || state.product;
}

function refreshActiveCards(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshBrandsList(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brandsList = action?.payload || state.brandsList;
}

function refreshCategoriesList(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categoriesList = action?.payload || state.categoriesList;
}

function refreshBrand(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<BrandModel>,
) {
  state.brand = action?.payload || state.brand;
}

function refreshCategory(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<CategoryModel>,
) {
  state.category = action?.payload || state.category;
}

function refreshContextId(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

function refreshProductCounter(
  state: IProductConfigurationPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

const ProductConfigurationPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_CONFIGURATION,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshProduct,
    refreshActiveCards,
    refreshBrandsList,
    refreshCategoriesList,
    refreshBrand,
    refreshCategory,
    refreshContextId,
    refreshProductCounter,
  },
});

export const ProductConfigurationPageSliceActions =
  ProductConfigurationPageSlice.actions;
export default ProductConfigurationPageSlice;
