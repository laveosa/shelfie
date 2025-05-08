import React, { useEffect, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import { IItemsCard } from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";
import { Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function ItemsCard({
  isLoading,
  data,
  title,
  onAction,
  selectedItem,
  ...props
}: IItemsCard) {
  const [selectedId, setSelectedId] = useState(Number(selectedItem));

  const handleItemClick = (item) => {
    setSelectedId(item.productId);
    onAction(item);
  };

  useEffect(() => {
    setSelectedId(Number(selectedItem));
  }, [selectedItem]);

  return (
    <div>
      <SheProductCard
        title={title}
        width="300px"
        minWidth="300px"
        showToggleButton={true}
        className={cs.productsCard}
        {...props}
      >
        <div className={cs.productsList}>
          {isLoading ? (
            <div>
              {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((_, index) => (
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
              {data?.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => handleItemClick(item)}
                >
                  <div
                    className={`${cs.productsListItem} ${selectedId === item.productId ? cs.selected : ""}`}
                  >
                    {item.image?.thumbnailUrl ? (
                      <img
                        src={item.image?.thumbnailUrl}
                        alt={item.productName}
                        className={cs.productItemImage}
                      />
                    ) : (
                      <div className={cs.productItemPlaceholderIcon}>
                        <Image />
                      </div>
                    )}
                    <div className={cs.productItemName}>{item.productName}</div>
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
