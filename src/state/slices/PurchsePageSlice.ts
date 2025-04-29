import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { IPurchasePageSlice } from "@/const/interfaces/store-slices/IPurchasePageSlice.ts";

const initialState: IPurchasePageSlice = {
  activeCards: [],
  productCounter: null,
};

function refreshActiveCards(
  state: IPurchasePageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: IPurchasePageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

const PurchasePageSlice = createSlice({
  name: StoreSliceEnum.PURCHASE,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshProductCounter,
  },
});

export const PurchasePageSliceActions = PurchasePageSlice.actions;
export default PurchasePageSlice;
