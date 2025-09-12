import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel";

import { AddressModel } from "@/const/models/AddressModel";
import { CustomerCounterModel } from "@/const/models/CustomerCounterModel";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";
import { CountryCodeModel } from "@/const/models/CountryCodeModel";
import { GridSortingModel } from "@/const/models/GridSortingModel";
import _ from "lodash";

const initialState: ICustomersPageSlice = {
  isLoading: false,
  isCustomersLoading: false,
  isCustomerBasicDataLoading: false,
  isCustomerMenuCardLoading: false,
  isCustomerAddressesLoading: false,
  isCustomerAddressDetailsLoading: false,
  isCustomerOpenCartLoading: false,
  customers: [],
  customersGridRequestModel: {},
  customerAddressesGridRequestModel: {},
  selectedCustomer: null,
  selectedCustomerAddress: null,
  selectedCustomerAddressId: null,
  createCustomerAddress: false,
  customerCounter: {
    addressesAmount: undefined,
    openCartsAmount: undefined,
    ordersAmount: undefined,
  },
  activeCards: [],
  countryList: [],
  sortingOptions: [],
  customerAddresses: [],
};

function setIsLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsCustomerMenuCardLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerMenuCardLoading = action?.payload;
}

function refreshSortingOptions(
  state: ICustomersPageSlice,
  action: PayloadAction<GridSortingModel[]>,
) {
  state.sortingOptions = action?.payload || state.sortingOptions;
}

function refreshCustomers(
  state: ICustomersPageSlice,
  action: PayloadAction<CustomerModel[]>,
) {
  state.customers = action?.payload || state.customers;
}

function setIsCustomersLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomersLoading = action?.payload;
}

function refreshSelectedCustomer(
  state: ICustomersPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.selectedCustomer = action?.payload || state.selectedCustomer;
}

function refreshCustomersGridRequestModel(
  state: ICustomersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  if (_.isEqual(state.customersGridRequestModel, action?.payload)) {
    return;
  }

  state.customersGridRequestModel =
    action?.payload || state.customersGridRequestModel;
}

function refreshCustomerAddressesGridRequestModel(
  state: ICustomersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  if (_.isEqual(state.customerAddressesGridRequestModel, action?.payload)) {
    return;
  }

  state.customerAddressesGridRequestModel =
    action?.payload || state.customerAddressesGridRequestModel;
}

function setIsCustomerBasicDataLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerBasicDataLoading = action?.payload;
}

function resetSelectedCustomer(state: ICustomersPageSlice) {
  state.selectedCustomer = null;
}

function setCreateCustomerAddress(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.createCustomerAddress = action?.payload;
}

function setIsCustomerAddressesLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressesLoading = action?.payload;
}

function setIsCustomerAddressDetailsLoading(
  state: ICustomersPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerAddressDetailsLoading = action?.payload;
}

function refreshSelectedCustomerAddress(
  state: ICustomersPageSlice,
  action: PayloadAction<AddressRequestModel>,
) {
  state.selectedCustomerAddress =
    action?.payload || state.selectedCustomerAddress;
}

function refreshSelectedCustomerAddressId(
  state: ICustomersPageSlice,
  action: PayloadAction<number>,
) {
  state.selectedCustomerAddressId =
    action?.payload || state.selectedCustomerAddressId;
}

function refreshCustomerAddresses(
  state: ICustomersPageSlice,
  action: PayloadAction<AddressModel[]>,
) {
  state.customerAddresses = action?.payload || state.customerAddresses;
}
function refreshActiveCards(
  state: ICustomersPageSlice,
  action: PayloadAction<string[]>,
) {
  state.activeCards = action.payload;
}

function refreshCountryList(
  state: ICustomersPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryList = action.payload;
}

function refreshCustomerCounter(
  state: ICustomersPageSlice,
  action: PayloadAction<CustomerCounterModel>,
) {
  state.customerCounter = action.payload;
}

const CustomersPageSlice = createSlice({
  name: StoreSliceEnum.CUSTOMERS,
  initialState,
  reducers: {
    setIsLoading,
    refreshSelectedCustomer,
    resetSelectedCustomer,
    setCreateCustomerAddress,
    setIsCustomersLoading,
    refreshCustomers,
    refreshCustomersGridRequestModel,
    refreshCustomerAddressesGridRequestModel,
    setIsCustomerBasicDataLoading,
    setIsCustomerMenuCardLoading,
    setIsCustomerAddressesLoading,
    setIsCustomerAddressDetailsLoading,
    refreshSelectedCustomerAddress,
    refreshCustomerAddresses,
    refreshSelectedCustomerAddressId,
    refreshActiveCards,
    refreshCountryList,
    refreshCustomerCounter,
    refreshSortingOptions,
  },
});

export const CustomersPageSliceActions = CustomersPageSlice.actions;
export default CustomersPageSlice;
