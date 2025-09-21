import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

const initialState: IProfilePageSlice = {
  isProfilePageLoading: false,
  userDetails: null,
  countryCodes: [],
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

function refreshCountryCodes(
  state: IProfilePageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodes = action?.payload || state.countryCodes;
}

const ProfilePageSlice = createSlice({
  name: StoreSliceEnum.PROFILE,
  initialState,
  reducers: {
    setIsProfilePageLoading,
    refreshUserDetails,
    refreshCountryCodes,
  },
});

export const ProfilePageSliceActions = ProfilePageSlice.actions;
export default ProfilePageSlice;
