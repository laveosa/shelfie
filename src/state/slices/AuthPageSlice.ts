import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";

const initialState: IAuthPageSlice = { isLogIn: true };

const AuthPageSlice = createSlice({
  name: StoreSliceEnum.AUTH,
  initialState,
  reducers: {
    setIsLogin: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isLogIn = payload;
    },
    setIsSignUp: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isSignUp = payload;
    },
    setIsForgotPassword: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isForgotPassword = payload;
    },
    setIsChangePassword: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isChangePassword = payload;
    },
  },
});

export const AuthPageSliceActions = AuthPageSlice.actions;
export default AuthPageSlice;
