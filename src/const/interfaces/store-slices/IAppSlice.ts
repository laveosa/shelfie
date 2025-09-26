import { UserModel } from "@/const/models/UserModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { UserOrganizationModel } from "@/const/models/UserOrganizationModel.ts";

export interface IAppSlice {
  loading?: boolean;
  isUserMenuLoading?: boolean;
  isUserOrganizationsLoading?: boolean;
  user?: UserModel;
  token?: string;
  preferences?: PreferencesModel;
  userOrganizations?: UserOrganizationModel[];
}
