import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./PurchaseProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import PurchaseProductsCard from "@/components/complex/custom-cards/purchase-products-card/PurchaseProductsCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const service = usePurchaseProductsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { purchaseId } = useParams();

  useEffect(() => {
    if (!productsState.purchaseCounters) {
      productsService.getPurchaseCountersHandler(Number(purchaseId));
    }
  }, [purchaseId]);

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    // dispatch(actions.refreshActiveCards(updatedCards));
  }

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
        onAction={handleCardAction}
      />
      <PurchaseProductsCard />
    </div>
  );
}
