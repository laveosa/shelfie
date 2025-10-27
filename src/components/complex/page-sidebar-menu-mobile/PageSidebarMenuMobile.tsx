import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import { PanelBottom, PanelTop } from "lucide-react";

import cs from "./PageSidebarMenuMobile.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import { ContextSidebarMenuItem } from "@/components/complex/page-sidebar-menu/PageSidebarMenu.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ContextSidebarService } from "@/utils/services/ContextSidebarService.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import {
  CollectionConfig,
  MenuItem,
} from "@/const/interfaces/complex-components/IPageSidebarMenu.ts";
import { IPageSidebarMenuMobile } from "@/const/interfaces/complex-components/IPageSidebarMenuMobile.ts";

export default function PageSidebarMenuMobile({
  isLoading,
  itemId,
  itemsCollection,
  counter,
  collectionConfig,
}: IPageSidebarMenuMobile): JSX.Element {
  // ==================================================================== STATE MANAGEMENT
  const [_config, setConfig] = useState<CollectionConfig>(null);
  const [_selected, setSelected] = useState<MenuItem>(null);
  const [_isOpen, setIsOpen] = useState<boolean>(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (itemsCollection)
      setConfig(() => {
        const configuration: CollectionConfig =
          ContextSidebarService.getSidebarMenuOptions(
            collectionConfig,
            itemsCollection,
          );
        _getSelectedMenuOptions(configuration);
        return configuration;
      });
  }, [itemsCollection]);

  // ==================================================================== EVENT HANDLERS
  function onToggleIsOpenHandler(value: boolean) {
    if (!_.isNil(value) && value !== _isOpen) {
      setIsOpen(value);
    }
  }

  // ==================================================================== PRIVATE
  function _getSelectedMenuOptions(config: CollectionConfig): MenuItem {
    config.menuItems.map((option: MenuItem) => {
      const fullPath = config.urlBuilder(NavUrlEnum[option.path], "");
      const pathBase = fullPath.replace(/\/$/, "");
      const currentPath = location.pathname.replace(/\/$/, "");
      const isSelected =
        currentPath.startsWith(pathBase) || currentPath === pathBase;

      if (isSelected) {
        setSelected(option);
      }
    });

    return null;
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.pageSidebarMenuMobile} ${_isOpen ? cs.pageSidebarMenuMobileBodyOpen : ""}`}
    >
      <div
        className={cs.pageSidebarMenuMobileHeader}
        onClick={() => onToggleIsOpenHandler(!_isOpen)}
      >
        <div className={cs.pageSidebarMenuMobileHeaderTrigger}>
          {_isOpen ? (
            <SheIcon
              className={cs.headerTrigger}
              icon={PanelBottom}
              iconView={IconViewEnum.BUTTON}
            />
          ) : (
            <SheIcon
              className={cs.headerTrigger}
              icon={PanelTop}
              iconView={IconViewEnum.BUTTON}
            />
          )}
        </div>
        <div className={cs.pageSidebarMenuMobileHeaderInfo}>
          {_selected && (
            <div className={cs.pageSidebarMenuMobileSelectItem}>
              {_selected.label ? (
                <div className={cs.pageSidebarMenuMobileSelectItemLabel}>
                  <span className="she-text">
                    {translate(_selected.labelTransKey, _selected.label)}
                  </span>
                </div>
              ) : (
                <div className={cs.pageSidebarMenuMobileSelectItemLabel}>
                  <span className="she-placeholder">NO LABEL TO DISPLAY</span>
                </div>
              )}
              {_selected.counterId && (
                <Badge className={cs.productMenuCardItemBadge}>
                  {counter && !_.isNil(counter[_selected.counterId]) ? (
                    <span>{counter[_selected.counterId] ?? 0}</span>
                  ) : (
                    <span>0</span>
                  )}
                </Badge>
              )}
            </div>
          )}
        </div>
        <SheLoading
          className={cs.pageSidebarMenuMobileLoading}
          isLoading={isLoading}
        />
      </div>
      <div className={cs.pageSidebarMenuMobileBody}>
        <div
          className={cs.pageSidebarMenuMobileCurtain}
          onClick={() => onToggleIsOpenHandler(!_isOpen)}
        ></div>
        <div className={cs.pageSidebarMenuMobileItemsList}>
          {_config?.menuItems?.map((item, idx) => (
            <div
              key={`item_${item.id}_${idx + 1}`}
              className={cs.pageSidebarMenuMobileItem}
            >
              <ContextSidebarMenuItem
                {...item}
                className={cs.sidebarMenuItemMobile}
                itemId={itemId}
                config={_config}
                counter={counter}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
