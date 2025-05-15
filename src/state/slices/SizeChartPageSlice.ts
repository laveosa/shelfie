import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ISizeChartPageSlice } from "@/const/interfaces/store-slices/ISizeChartPageSlice.ts";

const initialState: ISizeChartPageSlice = {
  activeCards: [],
  productCounter: null,
};

function refreshActiveCards(
  state: ISizeChartPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: ISizeChartPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

const SizeChartPageSlice = createSlice({
  name: StoreSliceEnum.SIZE_CHART,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshProductCounter,
  },
});

export const SizeChartPageSliceActions = SizeChartPageSlice.actions;
export default SizeChartPageSlice;
