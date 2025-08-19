import { UserModel } from "@/const/models/UserModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IUserForm {
  model?: UserModel;
  genders?: ISheSelectItem<string>[];
  positions?: ISheSelectItem<string>[];
  onSubmit?(value: UserModel): void;
  onCancel?(value: UserModel): void;
}
