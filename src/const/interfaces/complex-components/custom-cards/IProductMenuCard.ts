import React from "react";
import { CounterModel } from "@/const/models/CounterModel.ts";

export interface IProductMenuCard {
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
  id?: string;
  counterId?: string;
  icon?: React.ReactElement;
  label?: string;
  path?: string;
}

export interface CollectionConfig {
  menuItems?: MenuItem[];
  defaultEnabledItem?: string;
  pathBase?: string;
  urlBuilder?: (path: string, itemId?: string) => string;
  disableItemsWithoutId?: boolean;
}
