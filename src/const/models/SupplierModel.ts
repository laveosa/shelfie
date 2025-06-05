export interface SupplierModel {
  photo: string;
  supplierId: number;
  supplierName: string;
  id: number;
  appId: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postCode: number;
  countryId: string;
}

export const SupplierModelDefault: SupplierModel = {
  photo: null,
  supplierId: null,
  supplierName: "",
  id: null,
  appId: "",
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postCode: null,
  countryId: "",
};
