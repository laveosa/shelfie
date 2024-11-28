import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export interface ISheSidebarItem extends IBaseComponent {
  title: string;
  icon?: any;
  url: NavUrlEnum;
}
