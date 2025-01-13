import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { PhoneCodeModel } from "@/const/models/PhoneCodeModel.ts";

export interface IAuthPageSlice {
  isLoading?: boolean;
  authModel?: RequestAuthModel;
  authFormView?: AuthFormViewEnum;
  countryCode?: PhoneCodeModel[];
  hiddenPhoneNumber?: number;
}
