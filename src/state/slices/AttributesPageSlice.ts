import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAttributesPageSlice } from "@/const/interfaces/store-slices/IAttributesPageSlice.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

const initialState: IAttributesPageSlice = {
  activeCards: [],
  productCounter: null,
};

function refreshActiveCards(
  state: IAttributesPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: IAttributesPageSlice,
  action: PayloadAction<ProductCountersModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

const AttributesPageSlice = createSlice({
  name: StoreSliceEnum.ATTRIBUTES,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshProductCounter,
  },
});

export const AttributesPageSliceActions = AttributesPageSlice.actions;
export default AttributesPageSlice;
