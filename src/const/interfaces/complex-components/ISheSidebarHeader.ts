import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheSidebarHeader extends IBaseComponent {
  items?: CompanyModel[];
}
