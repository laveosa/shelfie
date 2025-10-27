import React from "react";

import { CounterModel } from "@/const/models/CounterModel.ts";
import { LucideIconType } from "@/const/types/LucideIconType.ts";

export interface IPageSidebarMenu {
  isLoading?: boolean;
  title?: string;
  itemId?: any;
  itemsCollection: string;
  counter?: CounterModel;
  activeCards?: any;
  collectionConfig?: CollectionConfig;
  onAction?: (identifier: string) => void;
}

export interface MenuItem {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  itemId?: any;
  id?: string;
  counterId?: string;
  icon?: React.ReactElement | string | LucideIconType;
  label?: string;
  labelTransKey?: string;
  path?: string;
  config?: CollectionConfig;
  counter?: CounterModel;
}

export interface CollectionConfig {
  menuItems?: MenuItem[];
  defaultEnabledItem?: string;
  pathBase?: string;
  urlBuilder?: (path: string, itemId?: string) => string;
  disableItemsWithoutId?: boolean;
}
