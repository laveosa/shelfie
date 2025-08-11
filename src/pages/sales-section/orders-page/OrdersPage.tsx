import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { merge } from "lodash";

import { OrdersPageSliceActions as actions } from "@/state/slices/OrdersPageSlice.ts";
import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import OrdersCard from "@/components/complex/custom-cards/orders-card/OrdersCard.tsx";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const service = useOrdersPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const navigate = useNavigate();
  useEffect(() => {
    service.getListOfOrdersForGridHandler(state.ordersGridRequestModel);
  }, [state.ordersGridRequestModel]);

  useEffect(() => {
    if (state.sortingOptions.length === 0) {
      service.getSortingOptionsForGridHandler();
    }
  }, []);

  function handleGridRequestChange(updates: GridRequestModel) {
    if (updates.brands || updates.categories || updates.filter) {
      dispatch(
        actions.refreshOrdersGridRequestModel({
          ...state.ordersGridRequestModel,
          currentPage: 1,
          ...updates,
        }),
      );
    } else {
      dispatch(
        actions.refreshOrdersGridRequestModel({
          ...state.ordersGridRequestModel,
          ...updates,
        }),
      );
    }
  }

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "createOrder":
        service.createOrderHandler();
        break;
      case "manageOrder":
        dispatch(actions.refreshSelectedOrder(payload));
        navigate(
          `${NavUrlEnum.SALES}${NavUrlEnum.ORDERS}${NavUrlEnum.ORDER_DETAILS}/${payload.id}`,
        );
        break;
      case "gridRequestChange":
        handleGridRequestChange(payload);
        break;
      case "applyColumns":
        const modifiedModel = merge({}, appState.preferences, payload);
        dispatch(appActions.refreshPreferences(modifiedModel));
        service.updateUserPreferencesHandler(modifiedModel);
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
        sortingOptions={state.sortingOptions}
        ordersGridModel={state.ordersGridModel}
        ordersGridRequestModel={state.ordersGridRequestModel}
        onAction={onAction}
      />
    </div>
  );
}
