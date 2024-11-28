import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { ISheSidebarItem } from "@/const/interfaces/complex-components/ISheSidebarItem.ts";

export interface ISheSidebarGroup extends IBaseComponent {
  items?: ISheSidebarItem[];
  title?: string;
}
