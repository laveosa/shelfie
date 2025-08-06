import { AddressModel } from "@/const/models/AddressModel";
import { CustomerModel } from "@/const/models/CustomerModel";
import { GridModel } from "@/const/models/GridModel";
import { GridRequestModel } from "@/const/models/GridRequestModel";

export interface ICustomersPageSlice {
    isLoading: boolean;
    isCustomersLoading: boolean;
    isCustomerBasicDataLoading: boolean;
    isCustomerMenuCardLoading: boolean;
    isCustomerAddressesLoading: boolean;
    isCustomerAddressDetailsLoading: boolean;
    isCustomerOpenCartLoading: boolean;
    customers: CustomerModel[];
    customersGridModel: GridModel;
    customersGridRequestModel: GridRequestModel;
    customerAddressesGridModel: GridModel;
    customerAddressesGridRequestModel: GridRequestModel;
    selectedCustomer: CustomerModel | null;
    selectedCustomerAddress: AddressRequestModel | null;
    selectedCustomerAddressId: number | null;
    customerAddresses: AddressModel[];
    customerCounter: CustomerCounterModel;
    activeCards: string[];
    countryList: CountryCodeModel[];
    createCustomerAddress: boolean;
    sortingOptions: GridSortingModel[];
}
