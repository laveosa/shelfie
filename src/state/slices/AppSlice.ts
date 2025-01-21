import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

const initialState: IAppSlice = {
  user: storageService.getLocalStorage(StorageKeyEnum.USER),
  token: storageService.getLocalStorage(StorageKeyEnum.TOKEN),
};

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    refreshUser: (state: IAppSlice, action) => {
      storageService.setLocalStorage(StorageKeyEnum.USER, action.payload);
      state.user = storageService.getLocalStorage(StorageKeyEnum.USER);
    },
    refreshToken: (state: IAppSlice, action) => {
      storageService.setLocalStorage(StorageKeyEnum.TOKEN, action.payload);
      state.token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);
    },
    logOut: () => {
      AppSliceActions.refreshUser(null);
      AppSliceActions.refreshToken(null);

      // TODO remove this code it's only to test auth logic in local env
      window.location.href = `${NavUrlEnum.LOCAL}${NavUrlEnum.AUTH}`;

      // window.location.href = `${NavUrlEnum.ROOT}${NavUrlEnum.AUTH}`;
    },
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
