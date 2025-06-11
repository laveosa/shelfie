import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";

const initialState: IPurchaseProductsPageSlice = {};

const PurchaseProductsPageSlice = createSlice({
  name: StoreSliceEnum.PURCHASE_PRODUCTS,
  initialState,
  reducers: {},
});

export const PurchaseProductsPageSliceActions =
  PurchaseProductsPageSlice.actions;
export default PurchaseProductsPageSlice;
