export interface SupplierModel {
  photo: string;
  supplierId: number;
  supplierName: string;
  id: number;
  appId: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}

export const SupplierModelDefault: SupplierModel = {
  photo: null,
  supplierId: null,
  supplierName: "",
  id: null,
  appId: "",
  name: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  postalCode: null,
  country: "",
};
