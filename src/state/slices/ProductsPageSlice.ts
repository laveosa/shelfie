import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

const initialState: IProductsPageSlice = {};

const ProductsPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCTS,
  initialState,
  reducers: {
    setLoading: (
      state: IProductsPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isLoading = payload;
    },
    setProducts: (
      state: IProductsPageSlice,
      { payload }: PayloadAction<ProductModel[]>,
    ) => {
      state.products = payload;
    },
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
