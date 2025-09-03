import { ImageModel } from "@/const/models/ImageModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface SupplierModel {
  photo?: any;
  supplierId?: any;
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
  locationId?: number;
  isDeleted?: boolean;
  photos?: ImageModel[];
  address?: string;
  location?: LocationModel;
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
  locationId: null,
  isDeleted: false,
};
