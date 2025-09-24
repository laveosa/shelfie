import { PasswordModel } from "@/const/models/PasswordModel.ts";

export interface IChangePasswordForm {
  data?: PasswordModel;
  notDisabledSubmit?: boolean;
  onSubmit?(value: PasswordModel): void;
  onCancel?(value: PasswordModel): void;
}
