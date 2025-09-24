import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./SizeChartPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { SizeChartPageSliceActions as actions } from "@/state/slices/SizeChartPageSlice.ts";
import useSizeChartPageService from "@/pages/products-section/size-chart-page/useSizeChartPageService.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export function SizeChartPage() {
  // ==================================================================== UTILITIES
  const { state, dispatch, ...service } = useSizeChartPageService();
  const { productId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCountersModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
  }, [productId]);

  // ==================================================================== EVENT HANDLERS
  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.sizeChartPage}>
      <SheContextSidebar
        menuTitle="Manage Size Charts"
        menuCollectionType="products"
        itemId={Number(productId)}
        activeCards={state.activeCards}
        onAction={handleCardAction}
      >
        <h1>Size Chart Page</h1>
      </SheContextSidebar>
    </div>
  );
}
