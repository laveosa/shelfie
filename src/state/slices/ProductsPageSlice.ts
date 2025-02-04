import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

const initialState: IProductsPageSlice = {
  loading: false,
  products: null,
  columnsPreferences: null,
  brands: [],
  categories: [],
  sortingOptions: [],
};

function setLoading(state: IProductsPageSlice, action: PayloadAction<boolean>) {
  state.loading = action?.payload || state.loading;
}

function refreshProducts(
  state: IProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshBrands(
  state: IProductsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IProductsPageSlice,
  action: PayloadAction<ProductCategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshSortingOptions(
  state: IProductsPageSlice,
  action: PayloadAction<GridSortingModel[]>,
) {
  state.sortingOptions = action?.payload || state.sortingOptions;
}

const ProductsPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCTS,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshBrands,
    refreshCategories,
    refreshSortingOptions,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
