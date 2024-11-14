import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IUsersPageSlice } from "@/const/interfaces/store-slices/IUsersPageSlice.ts";

const initialState: IUsersPageSlice = {};

const UsersPageSlice = createSlice({
  name: StoreSliceEnum.USERS,
  initialState,
  reducers: {},
});

export const UsersPageSliceActions = UsersPageSlice.actions;
export default UsersPageSlice;
