import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

const initialState: IProductsPageSlice = {
  loading: false,
  products: null,
  columnsPreferences: null,
  brands: [],
  categories: [],
  sortingOptions: [],
  productsGridModel: {
    pager: {},
    items: [],
  },
  variantsGridModel: {
    pager: {},
    items: [],
  },
  gridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
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

function refreshProductsGridModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.productsGridModel = action?.payload || state.productsGridModel;
}

function refreshVariantsGridModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.variantsGridModel = action?.payload || state.variantsGridModel;
}

function refreshGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.gridRequestModel = action?.payload || state.gridRequestModel;
}

function refreshBrands(
  state: IProductsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IProductsPageSlice,
  action: PayloadAction<CategoryModel[]>,
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
    refreshProductsGridModel,
    refreshVariantsGridModel,
    refreshGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSortingOptions,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
