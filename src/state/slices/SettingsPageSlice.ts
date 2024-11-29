import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISettingsPageSlice } from "@/const/interfaces/store-slices/ISettingsPageSlice.ts";

const initialState: ISettingsPageSlice = {};

const SettingsPageSlice = createSlice({
  name: StoreSliceEnum.SETTINGS,
  initialState,
  reducers: {},
});

export const SettingsPageSliceActions = SettingsPageSlice.actions;
export default SettingsPageSlice;
