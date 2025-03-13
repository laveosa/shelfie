import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";

const initialState: IManageVariantsPageSlice = {
  loading: false,
  variants: [],
  traits: [],
  typesOfTraits: [],
  activeCards: [],
  contextId: null,
  productCounter: null,
  colorOption: [{ color: null, optionName: null }],
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

function refreshTypesOfTraits(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TypeOfTraitModel[]>,
) {
  state.typesOfTraits = action?.payload || state.typesOfTraits;
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

function refreshColorOption(
  state: IManageVariantsPageSlice,
  action: PayloadAction<any>,
) {
  state.colorOption = action?.payload || state.colorOption;
}

const ManageVariantsPageSlice = createSlice({
  name: StoreSliceEnum.MANAGE_VARIANTS,
  initialState,
  reducers: {
    setLoading,
    refreshVariants,
    refreshTypesOfTraits,
    refreshProductCounter,
    refreshActiveCards,
    refreshContextId,
    refreshColorOption,
  },
});

export const ManageVariantsPageSliceActions = ManageVariantsPageSlice.actions;
export default ManageVariantsPageSlice;
