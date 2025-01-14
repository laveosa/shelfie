import { UserModel } from "@/const/models/UserModel.ts";

export interface ResponseAuthModel {
  token?: string;
  resetToken?: string;
  tokenInterval?: string;
  user?: UserModel;
  hiddenPhoneNumber?: string;
}
