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

  // ==================================================================== SIDE EFFECTS
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
    onAction({ item: item.originalItem, type: item.type });
  }

  // ==================================================================== PRIVATE
  function _createSkeletonArray(quantity: number): object[] {
    return Array.from({ length: quantity }, () => ({}));
  }

  // ==================================================================== LAYOUT
  return (
    <SheProductCard
      className={cs.itemsCard}
      headerClassName={cs.itemsCardHeader}
      title={title}
      loading={isLoading}
      minWidth="260px"
      maxWidth="260px"
      showToggleButton
    >
      <div className={cs.itemsCardList}>
        {isLoading ? (
          <div>
            {_createSkeletonArray(skeletonQuantity ?? 10).map((_, index) => (
              <div key={index} className={cs.skeletonItem}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[140px]" />
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
                  <span className={`${cs.listItemText} she-text`}>
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </SheProductCard>
  );
}
