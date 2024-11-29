import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupportPageSlice } from "@/const/interfaces/store-slices/ISupportPageSlice.ts";

const initialState: ISupportPageSlice = {};

const SupportPageSlice = createSlice({
  name: StoreSliceEnum.SUPPORT,
  initialState,
  reducers: {},
});

export const SupportPageSliceActions = SupportPageSlice.actions;
export default SupportPageSlice;
