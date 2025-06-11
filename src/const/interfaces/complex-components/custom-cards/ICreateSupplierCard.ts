import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ICreateSupplierCard {
  isLoading?: boolean;
  countryList?: CountryCodeModel[];
  managedSupplier?: SupplierModel;
  onAction?: (identifier: string, payload?: any) => void;
}
