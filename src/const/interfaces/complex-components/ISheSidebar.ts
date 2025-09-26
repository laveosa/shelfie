import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { ISheSidebarGroup } from "@/const/interfaces/complex-components/ISheSidebarGroup.ts";
import { UserOrganizationModel } from "@/const/models/UserOrganizationModel.ts";
import { UserModel } from "@/const/models/UserModel.ts";

export interface ISheSidebar extends IBaseComponent {
  isSidebarHeaderLoading?: boolean;
  groups?: ISheSidebarGroup[];
  user?: UserModel;
  userOrganizations?: UserOrganizationModel[];
  onSelectedOrganizations?: (id: number) => void;
}
