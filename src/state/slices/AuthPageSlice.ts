import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { PhoneCodeModel } from "@/const/models/PhoneCodeModel.ts";

const initialState: IAuthPageSlice = {
  authFormView: AuthFormViewEnum.SIGN_IN,
  countryCode: [],
  hiddenPhoneNumber: null,
};

const AuthPageSlice = createSlice({
  name: StoreSliceEnum.AUTH,
  initialState,
  reducers: {
    setLoading: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isLoading = payload;
    },
    setAuthFormView: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<AuthFormViewEnum>,
    ) => {
      state.authFormView = payload;
    },
    setCountryCode: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<PhoneCodeModel[]>,
    ) => {
      state.countryCode = payload;
    },
    setHiddenPhoneNumber: (
      state: IAuthPageSlice,
      { payload }: PayloadAction<any>,
    ) => {
      state.hiddenPhoneNumber = payload;
    },
  },
});

export const AuthPageSliceActions = AuthPageSlice.actions;
export default AuthPageSlice;
