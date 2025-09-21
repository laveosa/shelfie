import { UserModel } from "@/const/models/UserModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface IProfilePageSlice {
  isProfilePageLoading?: boolean;
  userDetails?: UserModel;
  countryCodes?: CountryCodeModel[];
}
