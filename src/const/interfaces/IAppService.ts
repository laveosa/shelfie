import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { UserModel } from "@/const/models/UserModel.ts";

export interface IAppService extends IAppSlice {
  refreshUser?: (data: UserModel) => void;
  refreshToken?: (data: any) => void; // TODO replace type to "TokenModel"
  logOut?: () => void;
}
