import React, { useEffect, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import { IItemsCard } from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";
import { Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function ItemsCard({
  isLoading,
  isItemsLoading,
  data,
  title,
  skeletonQuantity,
  onAction,
  selectedItem,
  ...props
}: IItemsCard) {
  const [selectedId, setSelectedId] = useState(Number(selectedItem));

  function createSkeletonArray(quantity: number): object[] {
    return Array.from({ length: quantity }, () => ({}));
  }

  const handleItemClick = (item) => {
    setSelectedId(item.id);
    onAction({ item: item.originalItem, type: item.type });
  };

  useEffect(() => {
    setSelectedId(Number(selectedItem));
  }, [selectedItem]);

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title={title}
        view="borderless"
        width="300px"
        minWidth="300px"
        showToggleButton
        className={cs.productsCard}
        {...props}
      >
        <div className={cs.productsList}>
          {isItemsLoading ? (
            <div>
              {createSkeletonArray(skeletonQuantity ?? 10).map((_, index) => (
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
              {data?.map((item) => (
                <div key={item.id} onClick={() => handleItemClick(item)}>
                  <div
                    className={`${cs.productsListItem} ${
                      selectedId === item.id ? cs.selected : ""
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
    </div>
  );
}
