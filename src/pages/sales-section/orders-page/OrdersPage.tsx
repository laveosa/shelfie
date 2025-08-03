import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { OrdersPageSliceActions as actions } from "@/state/slices/OrdersPageSlice.ts";
import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import OrdersCard from "@/components/complex/custom-cards/orders-card/OrdersCard.tsx";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const service = useOrdersPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.INVOICES].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  useEffect(() => {
    service.getListOfOrdersForGridHandler(state.ordersGridRequestModel);
  }, [state.ordersGridRequestModel]);

  useEffect(() => {
    if (state.sortingOptions.length === 0) {
      service.getSortingOptionsForGridHandler();
    }
  }, []);

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "manageOrder":
        console.log("MANAGE", payload);
        // navigate(
        //   `${NavUrlEnum.PRODUCTS}`,
        // );
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Sales"
        itemsCollection="sales"
        counter={state.salesCounters}
      />
      <OrdersCard
        isLoading={state.isOrdersCardLoading}
        isGridLoading={state.isOrdersGridLoading}
        preferences={state.preferences}
        sortingOptions={state.sortingOptions}
        ordersGridModel={state.ordersGridModel}
        ordersGridRequestModel={state.ordersGridRequestModel}
        onAction={onAction}
      />
    </div>
  );
}
