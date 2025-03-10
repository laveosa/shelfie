import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";

export default function ItemsCard({ data, onAction, selectedItem, ...props }) {
  const [selectedId, setSelectedId] = useState(Number(selectedItem));

  const handleItemClick = (item) => {
    setSelectedId(item.productId);
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
            <div key={item.id || index} onClick={() => handleItemClick(item)}>
              <div
                className={`${cs.productsListItem} ${selectedId === item.productId ? cs.selected : ""}`}
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
