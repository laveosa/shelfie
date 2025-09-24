import { UserModel } from "@/const/models/UserModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export interface IAppSlice {
  loading?: boolean;
  isUserMenuLoading?: boolean;
  user?: UserModel;
  token?: string;
  preferences?: PreferencesModel;
}
