import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { EnvironmentService } from "@/utils/services/EnvironmentServise.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const initialState: IAppSlice = {
  user: storageService.getLocalStorage(StorageKeyEnum.USER),
  token: storageService.getLocalStorage(StorageKeyEnum.TOKEN),
};

function refreshUser(state: IAppSlice, action: PayloadAction<UserModel>) {
  const data: UserModel = action?.payload || null;
  storageService.setLocalStorage(StorageKeyEnum.USER, data);
  state.user = storageService.getLocalStorage(StorageKeyEnum.USER);
}

function refreshToken(state: IAppSlice, action: PayloadAction<any>) {
  const data = action?.payload || null;
  storageService.setLocalStorage(StorageKeyEnum.TOKEN, data);
  state.token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);
}

function logOut(state: IAppSlice) {
  refreshUser(state, null);
  refreshToken(state, null);
  window.location.href = EnvironmentService.isLocalEnvironment()
    ? `${NavUrlEnum.LOCAL}${NavUrlEnum.AUTH}`
    : `${NavUrlEnum.DEV}${NavUrlEnum.AUTH}`;
}

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    refreshUser,
    refreshToken,
    logOut,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
