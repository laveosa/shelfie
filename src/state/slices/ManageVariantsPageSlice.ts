import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";

const initialState: IManageVariantsPageSlice = {
  loading: false,
  variants: [],
  traits: [],
  typesOfTraits: [],
  activeCards: [],
  contextId: null,
  traitId: null,
  productCounter: null,
  colorOptionsGridModel: null,
  sizeOptionsGridModel: {
    pager: {},
    items: [],
  },
  gridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  traitOptions: [],
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

function refreshTraits(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.traits = action?.payload || state.traits;
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

function refreshTraitId(
  state: IManageVariantsPageSlice,
  action: PayloadAction<number>,
) {
  state.traitId = action?.payload || state.traitId;
}

function refreshTraitOption(
  state: IManageVariantsPageSlice,
  action: PayloadAction<any>,
) {
  state.traitOptions = action?.payload || state.traitOptions;
}

function refreshColorOptionsGridModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.colorOptionsGridModel = action?.payload || state.colorOptionsGridModel;
}

function refreshSizeOptionsGridModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.sizeOptionsGridModel = action?.payload || state.sizeOptionsGridModel;
}

function refreshGridRequestModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.gridRequestModel = action?.payload || state.gridRequestModel;
}

const ManageVariantsPageSlice = createSlice({
  name: StoreSliceEnum.MANAGE_VARIANTS,
  initialState,
  reducers: {
    setLoading,
    refreshVariants,
    refreshTraits,
    refreshTypesOfTraits,
    refreshProductCounter,
    refreshActiveCards,
    refreshContextId,
    refreshTraitId,
    refreshTraitOption,
    refreshColorOptionsGridModel,
    refreshSizeOptionsGridModel,
    refreshGridRequestModel,
  },
});

export const ManageVariantsPageSliceActions = ManageVariantsPageSlice.actions;
export default ManageVariantsPageSlice;
