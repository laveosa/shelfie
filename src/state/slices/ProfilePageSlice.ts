import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";

const initialState: IProfilePageSlice = {};

const ProfilePageSlice = createSlice({
  name: StoreSliceEnum.PROFILE,
  initialState,
  reducers: {},
});

export const ProfilePageSliceActions = ProfilePageSlice.actions;
export default ProfilePageSlice;
