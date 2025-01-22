import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ItemsCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import React, { Fragment } from "react";

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
          {data.map((item) => (
            <Fragment key={item.id}>
              <div key={item.id} className={cs.productsListItem}>
                <img
                  src={item.image.photoUrl}
                  alt={item.productName}
                  className={cs.productItemImage}
                />
                <div className={cs.productItemName}>{item.productName}</div>
              </div>
              <Separator orientation="horizontal" />
            </Fragment>
          ))}
        </div>
      </SheProductCard>
    </div>
  );
}
