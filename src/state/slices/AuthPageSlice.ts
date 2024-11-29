import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";

const initialState: IAuthPageSlice = {};

const AuthPageSlice = createSlice({
  name: StoreSliceEnum.AUTH,
  initialState,
  reducers: {},
});

export const AuthPageSliceActions = AuthPageSlice.actions;
export default AuthPageSlice;
