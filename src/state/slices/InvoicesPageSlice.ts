import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IInvoicesPageSlice } from "@/const/interfaces/store-slices/IInvoicesPageSlice.ts";
import { GridModel } from "@/const/models/GridModel.ts";

const initialState: IInvoicesPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isInvoicesCardLoading: false,
  isInvoicePreviewCardLoading: false,
  isInvoiceCardGridLoading: false,
  isFileUploaderLoading: false,
  activeCards: [],
  invoicesGridRequestModel: {},
  invoices: [],
  previewUrl: null,
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

function setIsInvoiceCardGridLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isInvoiceCardGridLoading = action?.payload;
}

function setIsFileUploaderLoading(
  state: IInvoicesPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFileUploaderLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IInvoicesPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshInvoicesGridRequestModel(
  state: IInvoicesPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.invoicesGridRequestModel =
    action?.payload || state.invoicesGridRequestModel;
}

function refreshInvoices(
  state: IInvoicesPageSlice,
  action: PayloadAction<any[]>,
) {
  state.invoices = action?.payload || state.invoices;
}

function refreshPreviewUrl(
  state: IInvoicesPageSlice,
  action: PayloadAction<string>,
) {
  state.previewUrl = action?.payload || state.previewUrl;
}

const InvoicesPageSlice = createSlice({
  name: StoreSliceEnum.INVOICES,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsInvoicesCardLoading,
    setIsInvoicePreviewCardLoading,
    setIsInvoiceCardGridLoading,
    setIsFileUploaderLoading,
    refreshActiveCards,
    refreshInvoicesGridRequestModel,
    refreshInvoices,
    refreshPreviewUrl,
  },
});

export const InvoicesPageSliceActions = InvoicesPageSlice.actions;
export default InvoicesPageSlice;
