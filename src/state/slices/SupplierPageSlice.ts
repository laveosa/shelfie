import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

const initialState: ISupplierPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isSupplierCardLoading: false,
  isSelectSupplierCardLoading: false,
  isSupplierConfigurationCardLoading: false,
  isCreateCompanyCardLoading: false,
  isCompanyConfigurationCardLoading: false,
  isLocationConfigurationCardLoading: false,
  isSupplierPhotosGridLoading: false,
  isSuppliersGridLoading: false,
  isPhotoUploaderLoading: false,
  isCompaniesGridLoading: false,
  isLocationsGridLoading: false,
  activeCards: [],
  purchase: null,
  selectedCompany: null,
  managedCompany: null,
  companiesGridRequestModel: {},
  countryCodes: [],
  managedLocation: undefined,
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsSupplierCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierCardLoading = action?.payload;
}

function setIsSupplierConfigurationCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierConfigurationCardLoading = action?.payload;
}

function setIsCreateCompanyCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateCompanyCardLoading = action?.payload;
}

function setIsCompanyConfigurationCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCompanyConfigurationCardLoading = action?.payload;
}

function setIsLocationConfigurationCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLocationConfigurationCardLoading = action?.payload;
}

function setIsSuppliersGridLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSuppliersGridLoading = action?.payload;
}

function setIsPhotoUploaderLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPhotoUploaderLoading = action?.payload;
}

function setIsCompaniesGridLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCompaniesGridLoading = action?.payload;
}

function setIsLocationsGridLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLocationsGridLoading = action?.payload;
}

//----------------------------------------------------- API
function refreshActiveCards(
  state: ISupplierPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function resetActiveCards(state: ISupplierPageSlice) {
  state.activeCards = [];
}

function refreshPurchase(
  state: ISupplierPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.purchase = action?.payload || state.purchase;
}

function refreshSelectedCompany(
  state: ISupplierPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.selectedCompany = action?.payload || state.selectedCompany;
}

function resetSelectedCompany(state: ISupplierPageSlice) {
  state.selectedCompany = null;
}

function refreshManagedCompany(
  state: ISupplierPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.managedCompany = action?.payload || state.managedCompany;
}

function resetManagedCompany(state: ISupplierPageSlice) {
  state.managedCompany = null;
}

function refreshCompaniesGridRequestModel(
  state: ISupplierPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.companiesGridRequestModel =
    action?.payload || state.companiesGridRequestModel;
}

function refreshCountryCodes(
  state: ISupplierPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodes = action?.payload || state.countryCodes;
}

function refreshManagedLocation(
  state: ISupplierPageSlice,
  action: PayloadAction<LocationModel>,
) {
  state.managedLocation = action?.payload || state.managedLocation;
}

function resetManagedLocation(state: ISupplierPageSlice) {
  state.managedLocation = null;
}

const SupplierPageSlice = createSlice({
  name: StoreSliceEnum.SUPPLIER,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsSupplierCardLoading,
    setIsSupplierConfigurationCardLoading,
    setIsCreateCompanyCardLoading,
    setIsCompanyConfigurationCardLoading,
    setIsLocationConfigurationCardLoading,
    setIsSuppliersGridLoading,
    setIsPhotoUploaderLoading,
    setIsCompaniesGridLoading,
    setIsLocationsGridLoading,
    refreshActiveCards,
    resetActiveCards,
    refreshPurchase,
    refreshSelectedCompany,
    resetSelectedCompany,
    refreshManagedCompany,
    resetManagedCompany,
    refreshCompaniesGridRequestModel,
    refreshCountryCodes,
    refreshManagedLocation,
    resetManagedLocation,
  },
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
