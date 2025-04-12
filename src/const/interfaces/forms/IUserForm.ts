import { ISheForm } from "@/const/interfaces/forms/ISheForm.ts";
import { UserModel } from "@/const/models/UserModel.ts";

export interface IUserForm extends ISheForm<UserModel> {
  genders?: string[];
  positions?: any[];
}
