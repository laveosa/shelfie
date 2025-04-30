import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./PurchasePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { PurchasePageSliceActions as actions } from "@/state/slices/PurchsePageSlice";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchasePageSlice } from "@/const/interfaces/store-slices/IPurchasePageSlice.ts";
import usePurchasePageService from "@/pages/products-section/purchase-page/usePurchasePageService.ts";

export function PurchasePage() {
  const dispatch = useAppDispatch();
  const service = usePurchasePageService();
  const state = useAppSelector<IPurchasePageSlice>(StoreSliceEnum.PURCHASE);
  const { productId } = useParams();

  useEffect(() => {
    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
  }, [productId]);

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  return (
    <div className={cs.attributePage}>
      <ProductMenuCard
        title={"Manage Purchases"}
        productCounter={state.productCounter}
        onAction={handleCardAction}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
    </div>
  );
}
