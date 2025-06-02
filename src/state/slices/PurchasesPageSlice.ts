import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { IPurchasesPageSlice } from "@/const/interfaces/store-slices/IPurchasesPageSlice.ts";

const initialState: IPurchasesPageSlice = {
  activeCards: [],
  productCounter: null,
};

function refreshActiveCards(
  state: IPurchasesPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: IPurchasesPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

const PurchasesPageSlice = createSlice({
  name: StoreSliceEnum.PURCHASES,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshProductCounter,
  },
});

export const PurchasesPageSliceActions = PurchasesPageSlice.actions;
export default PurchasesPageSlice;
