import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";

const initialState: IProfilePageSlice = {
  isProfilePageLoading: false,
  isImageUploaderLoading: false,
  userDetails: null,
  countryCodes: [],
  languagesList: [],
};

//----------------------------------------------------- LOADERS

function setIsProfilePageLoading(
  state: IProfilePageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProfilePageLoading = action?.payload;
}

function setIsImageUploaderLoading(
  state: IProfilePageSlice,
  action: PayloadAction<boolean>,
) {
  state.isImageUploaderLoading = action?.payload;
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

function refreshLanguagesList(
  state: IProfilePageSlice,
  action: PayloadAction<LanguageModel[]>,
) {
  state.languagesList = action?.payload || state.languagesList;
}

const ProfilePageSlice = createSlice({
  name: StoreSliceEnum.PROFILE,
  initialState,
  reducers: {
    setIsProfilePageLoading,
    setIsImageUploaderLoading,
    refreshUserDetails,
    refreshCountryCodes,
    refreshLanguagesList,
  },
});

export const ProfilePageSliceActions = ProfilePageSlice.actions;
export default ProfilePageSlice;
