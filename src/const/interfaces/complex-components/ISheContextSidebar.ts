import React, { PropsWithChildren } from "react";

export interface ISheContextSidebar extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  activeTab?: "products" | "variants";
  listTitle?: string;
  listItems?: any[];
  showListItems?: boolean;
  selectedId?: number;
  isListLoading?: boolean;
  menuTitle?: string;
  menuCollectionType?:
    | "products"
    | "purchases"
    | "sales"
    | "order"
    | "customer";
  isMenuLoading?: boolean;
  counter?: any;
  itemId?: number;
  activeCards?: any;
  skeletonQuantity?: number;
  onAction?: (value: any) => void;
}
