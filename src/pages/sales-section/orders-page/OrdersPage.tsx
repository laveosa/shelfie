import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./OrdersPage.module.scss";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersCard from "@/components/complex/custom-cards/orders-card/OrdersCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function OrdersPage() {
  const service = useOrdersPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));
  const { orderId } = useParams();

  useEffect(() => {
    service.getListOfOrdersForGridHandler(state.ordersGridRequestModel);
  }, []);

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "createOrder":
        service.createOrderHandler();
        break;
      case "manageOrder":
        service.manageOrderHandler(payload);
        break;
      case "gridRequestChange":
        service.handleGridRequestChange(payload);
        break;
      case "applyColumns":
        service.updateUserPreferencesHandler(payload);
        break;
      case "resetColumns":
        service.resetUserPreferencesHandler("products");
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <SheContextSidebar
        menuCollectionType="sales"
        menuTitle="Sales"
        itemId={Number(orderId)}
        counter={state.salesCounters}
      >
        <OrdersCard
          isLoading={state.isOrdersCardLoading}
          isGridLoading={state.isOrdersGridLoading}
          preferences={state.preferences}
          sortingOptions={sortingItems}
          ordersGridRequestModel={state.ordersGridRequestModel}
          onAction={onAction}
        />
      </SheContextSidebar>
    </div>
  );
}
