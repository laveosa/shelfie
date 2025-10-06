import { ImageModel } from "@/const/models/ImageModel.ts";

export interface LocationModel {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  countryId?: number;
  countryName?: string;
  lat?: null;
  locationAppId?: string;
  locationId?: number;
  locationName?: string;
  long?: null;
  state?: string;
  postCode?: string;
  address?: string;
  isDeleted?: boolean;
  pictures?: ImageModel[];
  photos?: ImageModel[];
}

export const LocationModelDefault: LocationModel = {
  addressLine1: undefined,
  addressLine2: undefined,
  city: undefined,
  state: undefined,
  postCode: undefined,
  countryId: undefined,
  countryName: undefined,
  lat: undefined,
  locationId: undefined,
  locationName: undefined,
  long: undefined,
  address: undefined,
};
