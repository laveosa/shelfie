import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDashboardPageSlice } from "@/const/interfaces/store-slices/IDashboardPageSlice.ts";

const initialState: IDashboardPageSlice = {};

const DashboardPageSlice = createSlice({
  name: StoreSliceEnum.DASHBOARD,
  initialState,
  reducers: null,
});

export const DashboardPageSliceActions = DashboardPageSlice.actions;
export default DashboardPageSlice;
