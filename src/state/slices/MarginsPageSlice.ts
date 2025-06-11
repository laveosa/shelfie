import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMarginsPageSlice } from "@/const/interfaces/store-slices/IMarginsPageSlice.ts";

const initialState: IMarginsPageSlice = {};

const MarginsPageSlice = createSlice({
  name: StoreSliceEnum.MARGINS,
  initialState,
  reducers: {},
});

export const MarginsPageSliceActions = MarginsPageSlice.actions;
export default MarginsPageSlice;
