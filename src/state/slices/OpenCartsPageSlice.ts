import { IOpenCartsPageSlice } from "@/const/interfaces/store-slices/IOpenCartsPageSlice.ts";
import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

const initialState: IOpenCartsPageSlice = {};
const OpenCartsPageSlice = createSlice({
  name: StoreSliceEnum.OPEN_CARTS,
  initialState,
  reducers: {},
});

export const OpenCartsPageSliceActions = OpenCartsPageSlice.actions;
export default OpenCartsPageSlice;
