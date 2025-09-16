import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import useOrderDetailsPageService from "@/pages/sales-section/order-details-page/useOrderDetailsPageService.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import OrderConfigurationCard from "@/components/complex/custom-cards/order-configuration-card/OrderConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import SelectDiscountCard from "@/components/complex/custom-cards/select-discount-card/SelectDiscountCard.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export function OrderDetailsPage() {
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderDetailsPageService();
  const ordersService = useOrdersPageService();
  const { orderId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
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
      case "openSelectEntityCard":
        handleCardAction("selectEntityCard", true);
        ordersService.getListOfCustomersForGridHandler({
          ...ordersState.customersGridRequestModel,
          searchQuery: payload,
        });
        break;
      case "openCreateEntityCard":
        // dispatch(actions.resetManagedSupplier(null));
        // handleCardAction("supplierConfigurationCard", true);
        break;
      case "searchEntity":
        service.getListOfCustomersForGridHandler({
          ...ordersState.customersGridRequestModel,
          searchQuery: payload,
        });
        break;
      case "selectCustomer":
        handleCardAction("selectEntityCard");
        service.assignCustomerToOrderHandler(orderId, payload.customerId);
        break;
      case "deleteOrder":
        service.deleteOrderHandler(Number(orderId));
        break;
      case "createDiscount":
        service.createDiscountHandler(orderId, payload);
        break;
      case "applyDiscountToOrder":
        service.applyDiscountsToOrderHandler(orderId, {
          discounts: [payload.discountId],
        });
        break;
      case "removeDiscount":
        service.removeDiscountsFromOrderHandler(orderId, {
          discounts: [payload.discountId],
        });
        break;
      case "closeSelectEntityCard":
        handleCardAction("selectEntityCard");
        break;
      case "openSelectDiscountCard":
        handleCardAction("selectDiscountCard", true);
        service.getDiscountsListHandler();
        break;
      case "closeSelectDiscountCard":
        handleCardAction("selectDiscountCard");
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      />
      <OrderConfigurationCard
        isLoading={state.isOrderConfigurationCardLoading}
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
      {state.activeCards?.includes("selectDiscountCard") && (
        <div ref={createRefCallback("selectDiscountCard")}>
          <SelectDiscountCard
            isLoading={state.isSelectDiscountCardLoading}
            isGridLoading={state.isSelectDiscountGridLoading}
            discounts={state.discountsList}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
