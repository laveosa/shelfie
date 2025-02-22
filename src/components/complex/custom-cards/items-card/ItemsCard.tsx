import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";

export default function ItemsCard({ data, ...props }) {
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
            <div key={item.id || index}>
              <div className={cs.productsListItem}>
                <img
                  src={item.image?.photoUrl || placeholderImage}
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
