import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import useOrderDetailsPageService from "@/pages/sales-section/order-details-page/useOrderDetailsPageService.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import OrderConfigurationCard from "@/components/complex/custom-cards/order-configuration-card/OrderConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/customers-list-grid/CustomersListGridColumns.tsx";

export function OrderDetailsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderDetailsPageService();
  const ordersService = useOrdersPageService();
  const { orderId } = useParams();
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.ORDER_DETAILS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });

  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
  }, [orderId]);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "":
        break;
      case "openSelectEntityCard":
        handleCardAction("selectEntityCard", true);
        if (ordersState.customersGridModel.items.length === 0) {
          dispatch(actions.setIsSelectEntityGridLoading(true));
          ordersService
            .getListOfCustomersForGridHandler({
              ...ordersState.customersGridRequestModel,
              searchQuery: payload,
            })
            .then(() => {
              dispatch(actions.setIsSelectEntityGridLoading(false));
            });
        }
        break;
      case "openCreateEntityCard":
        // dispatch(actions.resetManagedSupplier(null));
        // handleCardAction("supplierConfigurationCard", true);
        break;
      case "searchEntity":
        dispatch(actions.setIsSelectEntityGridLoading(true));
        ordersService
          .getListOfCustomersForGridHandler({
            ...ordersState.customersGridRequestModel,
            searchQuery: payload,
          })
          .then(() => {
            dispatch(actions.setIsSelectEntityGridLoading(false));
          });
        break;
      case "selectCustomer":
        handleCardAction("selectEntityCard");
        dispatch(actions.setIsOrderConfigurationCardLoading(true));
        service
          .assignCustomerToOrderHandler(orderId, payload.customerId)
          .then(() => {
            dispatch(actions.setIsOrderConfigurationCardLoading(false));
          });
        break;
      case "closeSelectEntityCard":
        handleCardAction("selectEntityCard");
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
      />
      <OrderConfigurationCard
        order={ordersState.selectedOrder}
        onAction={onAction}
      />
      {state.activeCards?.includes("selectEntityCard") && (
        <div ref={createRefCallback("selectEntityCard")}>
          <SelectEntityCard
            isLoading={state.isSelectEntityCardLoading}
            isGridLoading={state.isSelectEntityGridLoading}
            entityName={"Customer"}
            entityCollection={ordersState.customersGridModel.items}
            columns={
              CustomersListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
