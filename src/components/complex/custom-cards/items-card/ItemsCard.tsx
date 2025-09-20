import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Image } from "lucide-react";

import cs from "./ItemsCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  IItemsCard,
  IItemsCardItem,
} from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";

export default function ItemsCard({
  title,
  items,
  selectedId,
  isLoading,
  skeletonQuantity,
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
      className={cs.productsCard}
      title={title}
      loading={isLoading}
      view="borderless"
      width="300px"
      minWidth="300px"
      showToggleButton
    >
      <div className={cs.productsList}>
        {isLoading ? (
          <div>
            {_createSkeletonArray(skeletonQuantity ?? 10).map((_, index) => (
              <div key={index} className={cs.skeletonItems}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[140px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {items?.map((item: IItemsCardItem) => (
              <div key={item.id} onClick={() => onClickHandler(item)}>
                <div
                  className={`${cs.productsListItem} ${
                    _selectedId == item.id ? cs.selected : ""
                  }`}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={cs.productItemImage}
                    />
                  ) : (
                    <div className={cs.productItemPlaceholderIcon}>
                      <Image />
                    </div>
                  )}
                  <div className={cs.productItemName}>{item.name}</div>
                </div>
                <Separator orientation="horizontal" />
              </div>
            ))}
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
