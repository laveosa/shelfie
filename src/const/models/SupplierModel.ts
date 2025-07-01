export interface SupplierModel {
  photo?: any;
  supplierId?: number;
  supplierName?: string;
  id?: number;
  appId?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postCode?: number;
  countryId?: string;
  countryName?: string;
  images?: any[];
  lat?: number;
  long?: number;
  thumbnailUrl?: string;
}

export const SupplierModelDefault: SupplierModel = {
  photo: null,
  supplierId: null,
  supplierName: "",
  id: null,
  appId: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postCode: null,
  countryId: "",
  countryName: "",
  images: [],
};
