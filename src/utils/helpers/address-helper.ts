import { AddressModel } from "@/const/models/AddressModel";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";

export function convertAddressToRequestModel(
  address: AddressModel,
): AddressRequestModel {
  return {
    alias: address.alias,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    countryId: address.countryId,
  };
}

export function createAddressRequestModel(
  alias: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  state: string,
  postalCode: string,
  countryId: number,
): AddressRequestModel {
  return {
    alias,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    countryId,
  };
}
