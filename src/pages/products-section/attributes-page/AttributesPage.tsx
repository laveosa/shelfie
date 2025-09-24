import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./AttributesPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { IAttributesPageSlice } from "@/const/interfaces/store-slices/IAttributesPageSlice.ts";
import { AttributesPageSliceActions as actions } from "@/state/slices/AttributesPageSlice";
import useAttributesPageService from "@/pages/products-section/attributes-page/useAttributesPageService.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function AttributesPage() {
  const dispatch = useAppDispatch();
  const service = useAttributesPageService();
  const state = useAppSelector<IAttributesPageSlice>(StoreSliceEnum.ATTRIBUTES);
  const { productId } = useParams();

  useEffect(() => {
    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCountersModel) => {
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
      <SheContextSidebar
        menuTitle={"Manage Attributes"}
        menuCollectionType="products"
        counter={state.productCounter}
        itemId={Number(productId)}
        activeCards={state.activeCards}
        onAction={handleCardAction}
      >
        <h1>Attribute Page</h1>
      </SheContextSidebar>
    </div>
  );
}
