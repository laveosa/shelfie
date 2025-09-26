import { ImageModel } from "@/const/models/ImageModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface CompanyModel {
  id?: number;
  title?: string;
  description?: string;
  isActive?: boolean;
  image?: string;
  companyId?: number;
  appId?: string;
  companyName?: string;
  isDeleted?: boolean;
  locationId?: number;
  thumbnailUrl?: string;
  address?: string;
  isSelected?: boolean;
  nip?: string;
  customerCareEmail?: string;
  photos?: ImageModel[];
  locations?: LocationModel[];
  countryId?: number;
}

export const CompanyModelDefault: CompanyModel = {
  id: undefined,
  title: undefined,
  description: undefined,
  isActive: undefined,
  image: undefined,
  companyId: undefined,
  appId: undefined,
  companyName: undefined,
  isDeleted: undefined,
  locationId: undefined,
  thumbnailUrl: undefined,
  address: undefined,
  isSelected: undefined,
  nip: undefined,
  customerCareEmail: undefined,
  photos: [],
  locations: [],
  countryId: undefined,
};
