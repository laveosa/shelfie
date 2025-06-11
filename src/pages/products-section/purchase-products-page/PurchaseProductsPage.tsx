import { useParams } from "react-router-dom";
import React from "react";

import cs from "./PurchaseProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const service = usePurchaseProductsPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const { purchaseId } = useParams();

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    // dispatch(actions.refreshActiveCards(updatedCards));
  }

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        title={"Manage Purchases"}
        productCounter={state.productCounter}
        itemsCollection="purchases"
        onAction={handleCardAction}
        activeCards={state.activeCards}
      />
    </div>
  );
}
