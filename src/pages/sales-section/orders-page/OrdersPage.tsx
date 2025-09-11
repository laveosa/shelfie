import React, { useEffect } from "react";

import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import OrdersCard from "@/components/complex/custom-cards/orders-card/OrdersCard.tsx";

export function OrdersPage() {
  const service = useOrdersPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

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
        sortingOptions={sortingItems}
        ordersGridRequestModel={state.ordersGridRequestModel}
        onAction={onAction}
      />
    </div>
  );
}
