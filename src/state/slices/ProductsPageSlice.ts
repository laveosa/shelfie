import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

const initialState: IProductsPageSlice = {
  loading: false,
  products: null,
  columnsPreferences: null,
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

function refreshColumnsPreferences(
  state: IProductsPageSlice,
  action: PayloadAction<any>,
) {
  state.columnsPreferences = action?.payload || state.columnsPreferences;
}

const ProductsPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCTS,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshColumnsPreferences,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
