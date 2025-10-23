import React from "react";

import * as Icons from "lucide-react";

import productMenuItems from "@/const/jsons/context-sidebar/product-menu-items.json";
import purchaseMenuItems from "@/const/jsons/context-sidebar/purchase-menu-items.json";
import salesMenuItems from "@/const/jsons/context-sidebar/sales-menu-items.json";
import orderMenuItems from "@/const/jsons/context-sidebar/order-menu-items.json";
import customerMenuItems from "@/const/jsons/context-sidebar/customer-menu-items.json";

import { LucideIconType } from "@/const/types/LucideIconType.ts";
import { MenuItem } from "@/const/interfaces/complex-components/IPageSidebarMenu.ts";

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
