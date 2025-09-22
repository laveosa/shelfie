import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Image } from "lucide-react";

import cs from "./ItemsCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import {
  IItemsCard,
  IItemsCardItem,
} from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";
import StorageService from "@/utils/services/StorageService.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export default function ItemsCard({
  title,
  items,
  selectedId,
  isLoading,
  skeletonQuantity = 10,
  onAction,
}: IItemsCard) {
  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<IItemsCardItem[]>(null);
  const [_selectedId, setSelectedId] = useState<number>(null);
  const [_isMinimized, setIsMinimized] = useState<boolean>(null);
  const [_animationFlag, setAnimationFlag] = useState<boolean>(false);

  const isMinimizedStorageKey = "isMinimizedStorageKey";

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setTimeout(() => setAnimationFlag(true));
  }, []);

  useEffect(() => {
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
    if (items && items.length > 0 && !_.isEqual(items, _items)) setItems(items);
    if (
      selectedId &&
      !_.isNil(selectedId) &&
      !_.isEqual(selectedId, _selectedId)
    )
      setSelectedId(selectedId);
  }, [items, selectedId]);

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(item: IItemsCardItem) {
    setSelectedId(item.id);
    onAction?.({ item: item.originalItem, type: item.type });
  }

  function onMinimizedHandler(value: boolean) {
    if (!_.isNil(value) && value !== _isMinimized) {
      setIsMinimized(value);
      StorageService.setLocalStorage(isMinimizedStorageKey, value);
    }
  }

  // ==================================================================== PRIVATE
  function _createSkeletonArray(quantity: number): object[] {
    return Array.from({ length: quantity }, () => ({}));
  }

  function _getItemInnerLayout(item) {
    return (
      <div
        className={`${cs.itemsCardListItem} ${
          _selectedId == item.id ? cs.selected : ""
        }`}
      >
        <SheIcon
          className={cs.listItemIcon}
          icon={item.imageUrl || Image}
          iconView={IconViewEnum.BUTTON}
          minWidth="20px"
          maxWidth="20px"
        />
        <span className={`${cs.listItemText} she-text`}>{item.name}</span>
      </div>
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheProductCard
      className={`${cs.itemsCard} ${_animationFlag ? cs.itemsCardWithAnimation : ""}`}
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
        {isLoading ? (
          <div className={cs.itemsCardSkeletonListContainer}>
            {_createSkeletonArray(skeletonQuantity).map((_, index) => (
              <div key={index} className={cs.skeletonItem}>
                <Skeleton className={cs.skeletonItemImage} />
                <div className={cs.skeletonItemInfoBlock}>
                  <Skeleton className={cs.skeletonItemInfoTitle} />
                  <Skeleton className={cs.skeletonItemInfoDescription} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {items?.map((item: IItemsCardItem) => (
              <div
                className={cs.itemsCardListItemWrapper}
                key={item.id}
                onClick={() => onClickHandler(item)}
              >
                {_isMinimized ? (
                  <SheTooltip
                    text={item.name}
                    side="right"
                    align="center"
                    delayDuration={200}
                  >
                    {_getItemInnerLayout(item)}
                  </SheTooltip>
                ) : (
                  _getItemInnerLayout(item)
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </SheProductCard>
  );
}
