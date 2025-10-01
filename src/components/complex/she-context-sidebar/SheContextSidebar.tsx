import React, { useEffect, useState } from "react";

import cs from "./SheContextSidebar.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { ISheContextSidebar } from "@/const/interfaces/complex-components/ISheContextSidebar.ts";
import {
  IItemsCardItem,
  IItemsCardItemOption,
} from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";

export default function SheContextSidebar({
  className = "",
  style,
  children,
  activeTab,
  listTitle,
  listItems,
  showListItems,
  hideSidebarBlock,
  selectedId,
  isListLoading,
  menuTitle,
  menuCollectionType,
  counter,
  itemId,
  activeCards,
  skeletonQuantity,
  onAction,
}: ISheContextSidebar) {
  // ==================================================================== STATE MANAGEMENT
  const [_listItems, setListItems] = useState<IItemsCardItem[]>([]);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (listItems && listItems.length > 0)
      setListItems(_listItemsConvertor(listItems));
  }, [listItems]);

  // ==================================================================== LOGIC

  // ==================================================================== PRIVATE
  function _listItemsConvertor(items: any[]): IItemsCardItem[] {
    switch (activeTab) {
      case "products":
        return _itemsCardItemsConvertor(items, {
          idKey: "productId",
          nameKey: "productName",
          imageKeyPath: "image.thumbnailUrl",
          type: "product",
        });
      case "variants":
        return _itemsCardItemsConvertor(items, {
          idKey: "variantId",
          nameKey: "variantName",
          imageKeyPath: "photo.thumbnailUrl",
          type: "variant",
        });
      default:
        return null;
    }
  }

  function _itemsCardItemsConvertor(
    items: any[],
    options: IItemsCardItemOption,
  ): IItemsCardItem[] {
    const { idKey, nameKey, imageKeyPath, type } = options;

    return items?.map((item) => ({
      id: Number(item[idKey]),
      name: item[nameKey],
      type,
      imageUrl:
        imageKeyPath &&
        imageKeyPath.split(".").reduce((acc, key) => acc?.[key], item),
      originalItem: item,
    }));
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.sheContextSidebar} ${className}`}
      style={{ ...style }}
    >
      {!hideSidebarBlock && (
        <div className={cs.sheContextSidebarMenuAndListContainer}>
          {showListItems && (
            <div className={cs.sheContextSidebarList}>
              <ItemsCard
                isLoading={isListLoading}
                title={listTitle ? listTitle : activeTab.toString()}
                items={_listItems}
                selectedId={selectedId}
                skeletonQuantity={skeletonQuantity}
                onAction={onAction}
              />
            </div>
          )}
          <div className={cs.sheContextSidebarMenu}>
            <ProductMenuCard
              title={
                menuTitle
                  ? menuTitle
                  : itemId
                    ? "Manage Product"
                    : "Create Product"
              }
              itemsCollection={menuCollectionType}
              counter={counter}
              itemId={itemId}
              activeCards={activeCards}
            />
          </div>
        </div>
      )}
      <div className={cs.sheContextSidebarContextContainer}>{children}</div>
    </div>
  );
}
