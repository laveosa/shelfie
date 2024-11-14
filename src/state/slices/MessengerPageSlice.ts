import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";

const initialState: IMessengerPageSlice = {};

const MessengerPageSlice = createSlice({
  name: StoreSliceEnum.MESSENGER,
  initialState,
  reducers: {},
});

export const MessengerPageSliceActions = MessengerPageSlice.actions;
export default MessengerPageSlice;
