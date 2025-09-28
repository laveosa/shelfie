import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateCompanyCard {
  isLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  countryCodes?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
  onHandleUpData?: (data: any) => void;
}
