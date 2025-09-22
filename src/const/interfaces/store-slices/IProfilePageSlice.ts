import { UserModel } from "@/const/models/UserModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";

export interface IProfilePageSlice {
  isProfilePageLoading?: boolean;
  isImageUploaderLoading?: boolean;
  userDetails?: UserModel;
  countryCodes?: CountryCodeModel[];
  languagesList?: LanguageModel[];
}
