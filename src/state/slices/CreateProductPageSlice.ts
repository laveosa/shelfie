import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ICreateProductPageSlice } from "@/const/interfaces/store-slices/ICreateProductPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

const initialState: ICreateProductPageSlice = {
  loading: false,
  products: [],
  activeCards: [],
  brandsList: [],
  categoriesList: [],
  brand: {},
  category: {},
  contextId: null,
};

function setLoading(
  state: ICreateProductPageSlice,
  action: PayloadAction<boolean>,
) {
  state.loading = action?.payload;
}

function refreshProducts(
  state: ICreateProductPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshActiveCards(
  state: ICreateProductPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshBrandsList(
  state: ICreateProductPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brandsList = action?.payload || state.brandsList;
}

function refreshCategoriesList(
  state: ICreateProductPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categoriesList = action?.payload || state.categoriesList;
}

function refreshBrand(
  state: ICreateProductPageSlice,
  action: PayloadAction<BrandModel>,
) {
  state.brand = action?.payload || state.brand;
}

function refreshCategory(
  state: ICreateProductPageSlice,
  action: PayloadAction<CategoryModel>,
) {
  state.category = action?.payload || state.category;
}

function refreshContextId(
  state: ICreateProductPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

const CreateProductPageSlice = createSlice({
  name: StoreSliceEnum.CREATE_PRODUCT,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshActiveCards,
    refreshBrandsList,
    refreshCategoriesList,
    refreshBrand,
    refreshCategory,
    refreshContextId,
  },
});

export const CreateProductPageSliceActions = CreateProductPageSlice.actions;
export default CreateProductPageSlice;
