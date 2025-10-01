import React, { PropsWithChildren } from "react";

export interface ISheContextSidebar extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  activeTab?: "products" | "variants";
  listTitle?: string;
  listItems?: any[];
  showListItems?: boolean;
  hideSidebarBlock?: boolean; //  REMOVE THIS PROPS AND REPLACE WITH RELATED LOGIC THAT WILL KNOW WHEN TO SHOW SIDEBAR BLOCK, WITH ALL INNER COMPONENTS, BASED ON PROVIDED DATA
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
