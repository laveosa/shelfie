import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./SizeChartPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { SizeChartPageSliceActions as actions } from "@/state/slices/SizeChartPageSlice.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import useSizeChartPageService from "@/pages/products-section/size-chart-page/useSizeChartPageService.ts";
import { ISizeChartPageSlice } from "@/const/interfaces/store-slices/ISizeChartPageSlice.ts";

export function SizeChartPage() {
  const dispatch = useAppDispatch();
  const service = useSizeChartPageService();
  const state = useAppSelector<ISizeChartPageSlice>(StoreSliceEnum.SIZE_CHART);
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
      <ProductMenuCard
        title={"Manage Size Charts"}
        counter={state.productCounter}
        itemsCollection="products"
        onAction={handleCardAction}
        itemId={Number(productId)}
        activeCards={state.activeCards}
      />
    </div>
  );
}
