import { UserModel } from "@/const/models/UserModel.ts";

export interface IProfilePageSlice {
  isProfilePageLoading?: boolean;
  userDetails?: UserModel;
}
