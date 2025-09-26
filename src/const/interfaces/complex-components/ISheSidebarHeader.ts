import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { UserOrganizationModel } from "@/const/models/UserOrganizationModel.ts";

export interface ISheSidebarHeader extends IBaseComponent {
  items?: UserOrganizationModel[];
  selectedOrganization?: UserOrganizationModel;
  onSelectOrganization?: (id: number) => void;
}
