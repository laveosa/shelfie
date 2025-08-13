import { AddressModel } from "@/const/models/AddressModel";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";

/**
 * Converts a AddressModel to AddressRequestModel
 * Extracts only the fields needed for API requests: alias, addressLine1, addressLine2, city, state, postalCode, countryId
 * @param address - The AddressModel to convert
 * @returns AddressRequestModel with the required fields
 */
export function convertAddressToRequestModel(address: AddressModel): AddressRequestModel {
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

/**
 * Creates a CustomerRequestModel from individual fields
 * Useful when creating a new customer from form data
 * @param alias - Address's alias
 * @param addressLine1 - Address's address line 1
 * @param addressLine2 - Address's address line 2
 * @param city - Address's city
 * @param state - Address's state
 * @param postalCode - Address's postal code
 * @param countryId - Address's country id
 * @returns AddressRequestModel
 */
export function createAddressRequestModel(
    alias: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    postalCode: string,
    countryId: number
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

