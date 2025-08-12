import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";

const initialState: IShipmentsPageSlice = {};
const ShipmentsPageSlice = createSlice({
  name: StoreSliceEnum.SHIPMENTS,
  initialState,
  reducers: {},
});

export const ShipmentsPageSliceActions = ShipmentsPageSlice.actions;
export default ShipmentsPageSlice;
