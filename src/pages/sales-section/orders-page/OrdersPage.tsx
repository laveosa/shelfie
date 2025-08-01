import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const service = useOrdersPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const { customerId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.INVOICES].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {}, []);

  return (
    <div id={cs.ordersPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Sales"
        itemsCollection="sales"
        counter={state.salesCounters}
      />
    </div>
  );
}
