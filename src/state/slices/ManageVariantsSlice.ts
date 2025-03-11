import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

const initialState: IManageVariantsPageSlice = {
  loading: false,
  variants: [],
  traits: [],
  activeCards: [],
  contextId: null,
  productCounter: null,
};

function setLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.loading = action?.payload;
}

function refreshVariants(
  state: IManageVariantsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variants = action?.payload || state.variants;
}

function refreshProductCounter(
  state: IManageVariantsPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshActiveCards(
  state: IManageVariantsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshContextId(
  state: IManageVariantsPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

const ManageVariantsPageSlice = createSlice({
  name: StoreSliceEnum.MANAGE_VARIANTS,
  initialState,
  reducers: {
    setLoading,
    refreshVariants,
    refreshProductCounter,
    refreshActiveCards,
    refreshContextId,
  },
});

export const ManageVariantsPageSliceActions = ManageVariantsPageSlice.actions;
export default ManageVariantsPageSlice;
