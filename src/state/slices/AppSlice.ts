import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

const initialState: IAppSlice = {
  user: storageService.getLocalStorage(StorageKeyEnum.USER),
};

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {},
});

export const appActions = AppSlice.actions;
export default AppSlice;
