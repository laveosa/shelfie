import { UserModel } from "@/const/models/UserModel.ts";

export interface IUserForm {
  data?: UserModel;
  notDisabledSubmit?: boolean;
  onSubmit?(value: UserModel): void;
  onCancel?(value: UserModel): void;
}
