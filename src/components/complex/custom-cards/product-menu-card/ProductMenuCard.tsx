import { useLocation, useNavigate } from "react-router-dom";
import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import StorageService from "@/utils/services/StorageService.ts";
import { ContextSidebarService } from "@/utils/services/ContextSidebarService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import {
  CollectionConfig,
  IProductMenuCard,
  MenuItem,
} from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { Image } from "lucide-react";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function ProductMenuCard({
  isLoading,
  title,
  itemId,
  itemsCollection,
  counter,
  collectionConfig,
}: IProductMenuCard): JSX.Element {
  // ==================================================================== STATE MANAGEMENT
  const [_config, setConfig] = useState<CollectionConfig>(null);
  const [_isMinimized, setIsMinimized] = useState<boolean>(null);
  const [_animationFlag, setAnimationFlag] = useState<boolean>(false);

  const isMinimizedStorageKey = "isMinimizedProductMenuStorageKey";

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    const isMinimizedStorageValue: boolean = StorageService.getLocalStorage(
      isMinimizedStorageKey,
    );

    if (
      !_.isNil(isMinimizedStorageValue) &&
      isMinimizedStorageValue !== _isMinimized
    )
      setIsMinimized(isMinimizedStorageValue);

    setTimeout(() => setAnimationFlag(true));
  }, []);

  useEffect(() => {
    setConfig(_getCollectionConfig());
  }, [itemsCollection]);

  // ==================================================================== EVENT HANDLERS
  function onMinimizedHandler(value: boolean) {
    if (!_.isNil(value) && value !== _isMinimized) {
      setIsMinimized(value);
      StorageService.setLocalStorage(isMinimizedStorageKey, value);
    }
  }

  // ==================================================================== PRIVATE
  function _getCollectionConfig(): CollectionConfig {
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

    return config;
  }

  function _getItemInnerLayout(item) {
    return (
      <ContextSidebarMenuItem
        {...item}
        itemId={itemId}
        config={_config}
        counter={counter}
      />
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheProductCard
      className={`${cs.productMenuCard} ${_animationFlag ? cs.itemsCardWithAnimation : ""}`}
      headerClassName={cs.itemsCardHeader}
      title={title}
      loading={isLoading}
      minWidth="220px"
      maxWidth="220px"
      showToggleButton
      isMinimized={_isMinimized}
      onIsMinimizedChange={onMinimizedHandler}
    >
      <div className={cs.itemsCardList}>
        {_config?.menuItems.map((item, idx) => (
          <div
            key={`item_${item.id}_${idx + 1}`}
            className={cs.itemsCardListItemWrapper}
          >
            {_isMinimized ? (
              <SheTooltip
                text={item.label}
                textTransKey={item.labelTransKey}
                side="right"
                align="center"
              >
                {_getItemInnerLayout(item)}
              </SheTooltip>
            ) : (
              _getItemInnerLayout(item)
            )}
          </div>
        ))}
      </div>
    </SheProductCard>
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

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(path: string) {
    const url = config.urlBuilder(path, itemId);
    navigate(url);
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.itemsCardListItem} ${isSelected ? cs.selected : ""} ${isDisabled ? "disabled" : ""}`}
      onClick={() => onClickHandler(NavUrlEnum[path])}
    >
      <SheIcon
        className={cs.listItemIcon}
        icon={icon || Image}
        iconView={IconViewEnum.BUTTON}
        minWidth="20px"
        maxWidth="20px"
      />
      <div className={cs.listItemTextContainer}>
        <span className={`${cs.listItemText} "she-text"`}>
          {translate(labelTransKey, {}, label)}
        </span>
        {counter && counterId && !_.isNil(counter[counterId]) && (
          <Badge className={cs.itemBadge}>{counter[counterId] ?? 0}</Badge>
        )}
      </div>
    </div>
  );
}
