import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierCard {
  isLoading?: boolean;
  isSupplierPhotosGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  countryList?: CountryCodeModel[];
  managedSupplier?: any;
  onAction?: (identifier: string, payload?: any) => void;
}
