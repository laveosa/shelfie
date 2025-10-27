import { CounterModel } from "@/const/models/CounterModel.ts";
import { CollectionConfig } from "@/const/interfaces/complex-components/IPageSidebarMenu.ts";

export interface IPageSidebarMenuMobile {
  isLoading?: boolean;
  itemId?: any;
  itemsCollection: string;
  counter?: CounterModel;
  activeCards?: any;
  collectionConfig?: CollectionConfig;
  onAction?: (identifier: string) => void;
}
