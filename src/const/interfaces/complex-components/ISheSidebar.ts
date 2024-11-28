import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { ISheSidebarGroup } from "@/const/interfaces/complex-components/ISheSidebarGroup.ts";

export interface ISheSidebar extends IBaseComponent {
  groups?: ISheSidebarGroup[];
}
