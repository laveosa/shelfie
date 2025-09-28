import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export interface ICompanyConfigurationCard {
  isLoading?: boolean;
  company: CompanyModel;
  countryCodes?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
