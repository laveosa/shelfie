import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierCard {
  countryList?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
