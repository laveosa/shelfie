import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IInvoicesPageSlice } from "@/const/interfaces/store-slices/IInvoicesPageSlice.ts";

const initialState: IInvoicesPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isInvoicesCardLoading: false,
  isInvoicePreviewCardLoading: false,
  activeCards: [],
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsInvoicesCardLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isInvoicesCardLoading = action?.payload;
}

function setIsInvoicePreviewCardLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isInvoicePreviewCardLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IInvoicesPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

const InvoicesPageSlice = createSlice({
  name: StoreSliceEnum.INVOICES,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsInvoicesCardLoading,
    setIsInvoicePreviewCardLoading,
    refreshActiveCards,
  },
});

export const InvoicesPageSliceActions = InvoicesPageSlice.actions;
export default InvoicesPageSlice;
