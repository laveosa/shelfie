import React from "react";

import * as Icons from "lucide-react";

import productMenuItems from "@/const/jsons/context-sidebar/product-menu-items.json";
import purchaseMenuItems from "@/const/jsons/context-sidebar/purchase-menu-items.json";
import salesMenuItems from "@/const/jsons/context-sidebar/sales-menu-items.json";
import orderMenuItems from "@/const/jsons/context-sidebar/order-menu-items.json";
import customerMenuItems from "@/const/jsons/context-sidebar/customer-menu-items.json";

import { LucideIconType } from "@/const/types/LucideIconType.ts";
import {
  CollectionConfig,
  MenuItem,
} from "@/const/interfaces/complex-components/IPageSidebarMenu.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export class ContextSidebarService {
  public static getProductMenuItems(): MenuItem[] {
    return productMenuItems.map((item) => this.updatedMenuItem(item));
  }

  public static getPurchaseMenuItems(): MenuItem[] {
    return purchaseMenuItems.map((item) => this.updatedMenuItem(item));
  }

  public static getSalesMenuItems(): MenuItem[] {
    return salesMenuItems.map((item) => this.updatedMenuItem(item));
  }

  public static getOrderMenuItems(): MenuItem[] {
    return orderMenuItems.map((item) => this.updatedMenuItem(item));
  }

  public static getCustomerMenuItems(): MenuItem[] {
    return customerMenuItems.map((item) => this.updatedMenuItem(item));
  }

  public static getSidebarMenuOptions(
    collectionConfig,
    itemsCollection,
  ): CollectionConfig {
    const collectionConfigs: Record<string, CollectionConfig> = {
      products: {
        menuItems: this.getProductMenuItems(),
        defaultEnabledItem: "basic_data",
        pathBase: NavUrlEnum.PRODUCTS,
        urlBuilder: (path: string, itemId?: string) =>
          `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
        disableItemsWithoutId: true,
      },
      purchases: {
        menuItems: this.getPurchaseMenuItems(),
        defaultEnabledItem: "supplier",
        pathBase: NavUrlEnum.PRODUCTS,
        urlBuilder: (path: string, itemId?: string) =>
          `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
        disableItemsWithoutId: true,
      },
      sales: {
        menuItems: this.getSalesMenuItems(),
        pathBase: NavUrlEnum.ORDERS,
        urlBuilder: (path: string) => `${NavUrlEnum.SALES}${path}`,
        disableItemsWithoutId: false,
      },
      order: {
        menuItems: this.getOrderMenuItems(),
        defaultEnabledItem: "order",
        pathBase: NavUrlEnum.ORDER_DETAILS,
        urlBuilder: (path: string, itemId?: string) =>
          `${NavUrlEnum.SALES}${path}/${itemId || ""}`,
        disableItemsWithoutId: false,
      },
      customer: {
        menuItems: this.getCustomerMenuItems(),
        defaultEnabledItem: "customer",
        pathBase: NavUrlEnum.CUSTOMER_BASIC_DATA,
        urlBuilder: (path: string, itemId?: string) =>
          `${NavUrlEnum.CUSTOMERS}${path}/${itemId || ""}`,
        disableItemsWithoutId: false,
      },
    };

    const config = collectionConfig || collectionConfigs[itemsCollection];

    if (!config) {
      console.warn(`No configuration found for collection: ${itemsCollection}`);
      return null;
    }

    return config;
  }

  // ====================================================== PRIVATE
  private static updatedMenuItem(item: MenuItem): MenuItem {
    return {
      ...item,
      icon: this.getIconByName(item.icon as string),
    };
  }

  private static getIconByName(
    iconName: string,
    props?: React.ComponentProps<"svg">,
  ): React.ReactElement | any {
    const IconComponent = Icons[
      iconName as LucideIconType
    ] as React.ComponentType<any>;

    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found in lucide-react`);
      return null;
    }

    return props ? React.createElement(IconComponent, props) : IconComponent;
  }
}
