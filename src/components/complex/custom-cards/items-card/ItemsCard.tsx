import React, { useEffect, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import { IItemsCard } from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";
import { Image } from "lucide-react";

export default function ItemsCard({
  data,
  title,
  onAction,
  selectedItem,
  ...props
}: IItemsCard) {
  const [selectedId, setSelectedId] = useState(Number(selectedItem));

  const handleItemClick = (item) => {
    setSelectedId(item.variantId ?? item.productId);
    onAction(item);
  };

  useEffect(() => {
    setSelectedId(Number(selectedItem));
  }, [selectedItem]);

  return (
    <div>
      <SheProductCard
        title={title}
        showToggleButton={true}
        className={cs.productsCard}
        {...props}
      >
        <div className={cs.productsList}>
          {data.map((item, index) => (
            <div key={item.id || index} onClick={() => handleItemClick(item)}>
              <div
                className={`${cs.productsListItem} ${selectedId === (item.variantId ?? item.productId) ? cs.selected : ""}`}
              >
                {item.image?.thumbnailUrl ? (
                  <img
                    src={item.image?.thumbnailUrl}
                    alt={item.productName ?? item.variantName}
                    className={cs.productItemImage}
                  />
                ) : (
                  <div className={cs.productItemPlaceholderIcon}>
                    <Image />
                  </div>
                )}
                {/*<img*/}
                {/*  src={item.image?.thumbnailUrl || placeholderImage}*/}
                {/*  alt={item.productName ?? item.variantName}*/}
                {/*  className={cs.productItemImage}*/}
                {/*/>*/}
                <div className={cs.productItemName}>
                  {item.productName ?? item.variantName}
                </div>
              </div>
              <Separator orientation="horizontal" />
            </div>
          ))}
        </div>
      </SheProductCard>
    </div>
  );
}
