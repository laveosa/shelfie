import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./OrderConfigurationCard.module.scss";
import { IProductsInOrderCard } from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Plus } from "lucide-react";

export default function OrderConfigurationCard({
  isLoading,
  onAction,
}: IProductsInOrderCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Products in order"
      className={cs.productsInOrderCard}
    >
      <div className={cs.productsInOrderCardContent}>
        <div className={cs.addProductBlock}>
          <span className="she-text">
            No order is complete without a product! Add some!
          </span>
          <SheButton
            variant="secondary"
            value="Add Product"
            icon={Plus}
            onClick={() => onAction("addProduct")}
          />
          {/*<DndGridDataTable columns= data= />*/}
          <div className={cs.productsSummaryBlock}>
            <span className="she-title"></span>
            <div className={cs.productsSummary}>
              <span className="she-text">Products Total</span>
              <span className="she-text"></span>
            </div>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
