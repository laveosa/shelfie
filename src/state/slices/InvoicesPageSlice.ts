import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IInvoicesPageSlice } from "@/const/interfaces/store-slices/IInvoicesPageSlice.ts";

const initialState: IInvoicesPageSlice = {};

const InvoicesPageSlice = createSlice({
  name: StoreSliceEnum.INVOICES,
  initialState,
  reducers: {},
});

export const InvoicesPageSliceActions = InvoicesPageSlice.actions;
export default InvoicesPageSlice;
