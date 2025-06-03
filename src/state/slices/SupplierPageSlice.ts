import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPage } from "@/const/interfaces/store-slices/ISupplierPage.ts";

const initialState: ISupplierPage = {};

const SupplierPageSlice = createSlice({
  name: StoreSliceEnum.SUPPLIER,
  initialState,
  reducers: {},
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
