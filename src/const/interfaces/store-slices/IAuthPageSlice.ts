import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";

export interface IAuthPageSlice {
  isLoading?: boolean;
  authModel?: RequestAuthModel;
  authFormView?: AuthFormViewEnum;
}
