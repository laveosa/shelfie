import { UserModel } from "@/const/models/UserModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export interface IAppSlice {
  user: UserModel;
  token: string;
  loading: boolean;
  preferences: PreferencesModel;
}
