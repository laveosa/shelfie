import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const initialState: IProfilePageSlice = {
  isProfilePageLoading: false,
  userDetails: null,
};

//----------------------------------------------------- LOADERS

function setIsProfilePageLoading(
  state: IProfilePageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProfilePageLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshUserDetails(
  state: IProfilePageSlice,
  action: PayloadAction<UserModel>,
) {
  state.userDetails = action?.payload || state.userDetails;
}

const ProfilePageSlice = createSlice({
  name: StoreSliceEnum.PROFILE,
  initialState,
  reducers: {
    setIsProfilePageLoading,
    refreshUserDetails,
  },
});

export const ProfilePageSliceActions = ProfilePageSlice.actions;
export default ProfilePageSlice;
