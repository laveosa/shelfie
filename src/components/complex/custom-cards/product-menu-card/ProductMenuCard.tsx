import { useLocation, useNavigate } from "react-router-dom";
import React, { JSX } from "react";
import _ from "lodash";

import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ContextSidebarService } from "@/utils/services/ContextSidebarService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import {
  CollectionConfig,
  IProductMenuCard,
  MenuItem,
} from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";

export default function ProductMenuCard({
  isLoading,
  title,
  itemId,
  itemsCollection,
  counter,
  collectionConfig,
  ...props
}: IProductMenuCard): JSX.Element {
  const collectionConfigs: Record<string, CollectionConfig> = {
    products: {
      menuItems: ContextSidebarService.getProductMenuItems(),
      defaultEnabledItem: "basic_data",
      pathBase: NavUrlEnum.PRODUCTS,
      urlBuilder: (path: string, itemId?: string) =>
        `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
      disableItemsWithoutId: true,
    },
    purchases: {
      menuItems: ContextSidebarService.getPurchaseMenuItems(),
      defaultEnabledItem: "supplier",
      pathBase: NavUrlEnum.PRODUCTS,
      urlBuilder: (path: string, itemId?: string) =>
        `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
      disableItemsWithoutId: true,
    },
    sales: {
      menuItems: ContextSidebarService.getSalesMenuItems(),
      pathBase: NavUrlEnum.ORDERS,
      urlBuilder: (path: string) => `${NavUrlEnum.SALES}${path}`,
      disableItemsWithoutId: false,
    },
    order: {
      menuItems: ContextSidebarService.getOrderMenuItems(),
      defaultEnabledItem: "order",
      pathBase: NavUrlEnum.ORDER_DETAILS,
      urlBuilder: (path: string, itemId?: string) =>
        `${NavUrlEnum.SALES}${path}/${itemId || ""}`,
      disableItemsWithoutId: false,
    },
  };

  const config = collectionConfig || collectionConfigs[itemsCollection];

  if (!config) {
    console.warn(`No configuration found for collection: ${itemsCollection}`);
    return null;
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title={title}
        view="borderless"
        width="300px"
        minWidth="300px"
        showToggleButton={true}
        className={cs.productMenuCard}
        {...props}
      >
        <div className={cs.productMenuItems}>
          {config.menuItems.map((item, idx) => (
            <ContextSidebarMenuItem
              key={`${idx}_${itemId}`}
              {...item}
              itemId={itemId}
              config={config}
              counter={counter}
            />
          ))}
        </div>
      </SheProductCard>
    </div>
  );
}

function ContextSidebarMenuItem({
  id,
  itemId,
  counterId,
  icon,
  label,
  labelTransKey,
  path,
  config,
  counter,
}: MenuItem): JSX.Element {
  const { translate } = useAppTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const fullPath = config.urlBuilder(NavUrlEnum[path], "");
  const pathBase = fullPath.replace(/\/$/, "");
  const currentPath = location.pathname.replace(/\/$/, "");
  const isSelected =
    currentPath.startsWith(pathBase) || currentPath === pathBase;
  const hasDynamicId = /\d+/.test(location.pathname);
  let isDisabled = false;

  if (config.disableItemsWithoutId) {
    if (hasDynamicId) {
      isDisabled = isSelected;
    } else {
      isDisabled = config.defaultEnabledItem
        ? id !== config.defaultEnabledItem
        : false;
    }
  }

  function handleMenuItemClick(path: string) {
    const url = config.urlBuilder(path, itemId);
    navigate(url);
  }

  return (
    <div
      className={`${cs.productMenuItem} ${isSelected ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
      onClick={() => !isDisabled && handleMenuItemClick(NavUrlEnum[path])}
      key={id}
    >
      <div className={cs.iconContainer}>{icon}</div>
      <div className={cs.textContainer}>
        <span className="she-text">{translate(labelTransKey, {}, label)}</span>
        {counter && counterId && !_.isNil(counter[counterId]) && (
          <Badge className={cs.itemBadge}>{counter[counterId] ?? 0}</Badge>
        )}
      </div>
    </div>
  );
}
