import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./PurchaseProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { PurchasesPageSliceActions as actions } from "@/state/slices/PurchasesPageSlice.ts";
import { IPurchasesPageSlice } from "@/const/interfaces/store-slices/IPurchasesPageSlice.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const service = usePurchaseProductsPageService();
  const state = useAppSelector<IPurchasesPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
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
    <div className={cs.purchaseProductsPage}>
      HELLO!!!
      {/*<ProductMenuCard*/}
      {/*  title={"Manage Purchases"}*/}
      {/*  productCounter={state.productCounter}*/}
      {/*  onAction={handleCardAction}*/}
      {/*  productId={Number(productId)}*/}
      {/*  activeCards={state.activeCards}*/}
      {/*/>*/}
    </div>
  );
}
