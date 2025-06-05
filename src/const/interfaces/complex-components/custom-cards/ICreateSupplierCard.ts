import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierCard {
  isLoading?: boolean;
  countryList?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
