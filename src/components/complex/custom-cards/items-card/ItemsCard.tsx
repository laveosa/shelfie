import React, { useEffect, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";

export default function ItemsCard({ data, onAction, selectedItem, ...props }) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // Find the index of the item with the matching productId
    const matchingItemIndex = data.findIndex(
      (item) => String(item.productId) === String(selectedItem),
    );

    if (matchingItemIndex !== -1) {
      setSelectedId(matchingItemIndex);
      // If we want to trigger the onAction for the initial selection
      onAction(data[matchingItemIndex]);
    }
  }, [selectedItem, data, onAction]);

  const handleItemClick = (item, index) => {
    setSelectedId(index);
    onAction(item);
  };

  return (
    <div>
      <SheProductCard
        title="Products"
        showToggleButton={true}
        className={cs.productsCard}
        {...props}
      >
        <div className={cs.productsList}>
          {data.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => handleItemClick(item, index)}
            >
              <div
                className={`${cs.productsListItem} ${selectedId === index ? cs.selected : ""}`}
              >
                <img
                  src={item.image?.thumbnailUrl || placeholderImage}
                  alt={item.productName}
                  className={cs.productItemImage}
                />
                <div className={cs.productItemName}>{item.productName}</div>
              </div>
              <Separator orientation="horizontal" />
            </div>
          ))}
        </div>
      </SheProductCard>
    </div>
  );
}
