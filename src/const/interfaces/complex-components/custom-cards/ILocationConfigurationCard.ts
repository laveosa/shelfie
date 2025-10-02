import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface ILocationConfigurationCard {
  isLoading?: boolean;
  location: LocationModel;
  countryCodes?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
