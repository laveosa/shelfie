import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IReturnsPageSlice } from "@/const/interfaces/store-slices/IReturnsPageSlice.ts";

const initialState: IReturnsPageSlice = {};
const ReturnsPageSlice = createSlice({
  name: StoreSliceEnum.RETURNS,
  initialState,
  reducers: {},
});

export const ReturnsPageSliceActions = ReturnsPageSlice.actions;
export default ReturnsPageSlice;
