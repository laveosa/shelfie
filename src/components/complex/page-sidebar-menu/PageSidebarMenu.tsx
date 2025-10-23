import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import { Image } from "lucide-react";

import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import StorageService from "@/utils/services/StorageService.ts";
import { ContextSidebarService } from "@/utils/services/ContextSidebarService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import {
  CollectionConfig,
  IPageSidebarMenu,
  MenuItem,
} from "@/const/interfaces/complex-components/IPageSidebarMenu.ts";

export default function PageSidebarMenu({
  isLoading,
  title,
  itemId,
  itemsCollection,
  counter,
  collectionConfig,
}: IPageSidebarMenu): JSX.Element {
  // ==================================================================== STATE MANAGEMENT
  const [_config, setConfig] = useState<CollectionConfig>(null);
  const [_isMinimized, setIsMinimized] = useState<boolean>(null);
  const [_animationFlag, setAnimationFlag] = useState<boolean>(false);

  const navigation = useNavigation();
  const isMinimizedStorageKey = "isMinimizedProductMenuStorageKey";

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setTimeout(() => setAnimationFlag(false));
    const isMinimizedStorageValue: boolean = StorageService.getLocalStorage(
      isMinimizedStorageKey,
    );

    if (
      !_.isNil(isMinimizedStorageValue) &&
      isMinimizedStorageValue !== _isMinimized
    )
      setIsMinimized(isMinimizedStorageValue);
  }, []);

  useEffect(() => {
    setConfig(_getCollectionConfig());
  }, [itemsCollection]);

  useEffect(() => {
    if (navigation.state === "idle") {
      setAnimationFlag(false);
      setTimeout(() => setAnimationFlag(true), 1000);
    }
  }, [navigation.state]);

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
      customer: {
        menuItems: ContextSidebarService.getCustomerMenuItems(),
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

  function _getItemInnerLayout(item, ref?) {
    return (
      <ContextSidebarMenuItem
        {...item}
        ref={ref}
        itemId={itemId}
        config={_config}
        counter={counter}
      />
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheProductCard
      className={`${cs.productMenuCard} ${_animationFlag ? cs.withAnimation : ""}`}
      headerClassName={cs.productMenuCardHeader}
      title={title}
      loading={isLoading}
      minWidth="240px"
      maxWidth="240px"
      showToggleButton
      isMinimized={_isMinimized}
      onIsMinimizedChange={onMinimizedHandler}
    >
      <div className={cs.productMenuCardList}>
        {_config?.menuItems.map((item, idx) => (
          <div
            key={`item_${item.id}_${idx + 1}`}
            className={cs.productMenuCardItemWrapper}
          >
            {_isMinimized ? (
              <SheTooltip
                text={item.label}
                textTransKey={item.labelTransKey}
                side="right"
                align="center"
              >
                <div>{_getItemInnerLayout(item)}</div>
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
  ref,
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
    if (!hasDynamicId) {
      isDisabled = config.defaultEnabledItem
        ? id !== config.defaultEnabledItem
        : false;
    }
  }

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(_path: string) {
    if (currentPath && !currentPath.includes(_path)) {
      const url = config.urlBuilder(_path, itemId);
      navigate(url);
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div
      ref={ref}
      className={`${cs.productMenuCardItem} ${isSelected ? cs.selected : ""} ${isDisabled ? "disabled" : ""}`}
      onClick={() => onClickHandler(NavUrlEnum[path])}
    >
      <SheIcon
        className={cs.productMenuCardItemIcon}
        icon={icon || Image}
        iconView={IconViewEnum.BUTTON}
        minWidth="20px"
        maxWidth="20px"
      />
      <div className={cs.productMenuCardItemTextContainer}>
        <span className={`${cs.productMenuCardItemText} "she-text"`}>
          {translate(labelTransKey, {}, label)}
        </span>
        {counterId && (
          <Badge className={cs.productMenuCardItemBadge}>
            {counter && !_.isNil(counter[counterId]) ? (
              <span>{counter[counterId] ?? 0}</span>
            ) : (
              <span>0</span>
            )}
          </Badge>
        )}
      </div>
    </div>
  );
}
