export interface AddressRequestModel {
  alias?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryId?: number;
  addressId?: number;
}

export const AddressRequestModelDefault: AddressRequestModel = {
  alias: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  countryId: 0,
};
