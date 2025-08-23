import { UserModel } from "@/const/models/UserModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";

export interface IUserForm {
  data?: UserModel;
  genders?: ISheSelectItem<string>[];
  positions?: ISheSelectItem<string>[];
  badges?: ISheBadge<any>[];
  notDisabledSubmit?: boolean;
  onSubmit?(value: UserModel): void;
  onCancel?(value: UserModel): void;
}
