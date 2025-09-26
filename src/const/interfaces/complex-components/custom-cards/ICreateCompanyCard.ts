import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

export interface ICreateCompanyCard {
  isLoading?: boolean;
  isCompanyPhotosGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  countryCodes?: CountryCodeModel[];
  images?: ImageModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
