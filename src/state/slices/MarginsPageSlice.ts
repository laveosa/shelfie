import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMarginsPageSlice } from "@/const/interfaces/store-slices/IMarginsPageSlice.ts";
import { MarginModel } from "@/const/models/MarginModel.ts";

const initialState: IMarginsPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isMarginForPurchaseCardLoading: false,
  isSelectMarginCardLoading: false,
  isMarginListGridLoading: false,
  activeCards: [],
  marginsList: [],
  selectedMargin: null,
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IMarginsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: IMarginsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsMarginForPurchaseCardLoading(
  state: IMarginsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isMarginForPurchaseCardLoading = action?.payload;
}

function setIsSelectMarginCardLoading(
  state: IMarginsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectMarginCardLoading = action?.payload;
}

function setIsMarginListGridLoading(
  state: IMarginsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isMarginListGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IMarginsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshMarginsList(
  state: IMarginsPageSlice,
  action: PayloadAction<MarginModel[]>,
) {
  state.marginsList = action?.payload || state.marginsList;
}

function refreshSelectedMargin(
  state: IMarginsPageSlice,
  action: PayloadAction<MarginModel>,
) {
  state.selectedMargin = action?.payload || state.selectedMargin;
}

const MarginsPageSlice = createSlice({
  name: StoreSliceEnum.MARGINS,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsMarginForPurchaseCardLoading,
    setIsSelectMarginCardLoading,
    setIsMarginListGridLoading,
    refreshActiveCards,
    refreshMarginsList,
    refreshSelectedMargin,
  },
});

export const MarginsPageSliceActions = MarginsPageSlice.actions;
export default MarginsPageSlice;
