import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import useOrderDetailsPageService from "@/pages/sales-section/order-details-page/useOrderDetailsPageService.ts";
import OrderConfigurationCard from "@/components/complex/custom-cards/order-configuration-card/OrderConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import SelectDiscountCard from "@/components/complex/custom-cards/select-discount-card/SelectDiscountCard.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function OrderDetailsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.ORDER_DETAILS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, ordersState, ...service } =
    useOrderDetailsPageService(handleCardAction);
  const { orderId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
  }, [orderId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "openSelectEntityCard":
        service.openSelectEntityCardHandler();
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
        break;
      case "searchEntity":
        service.searchEntityHandler(payload);
        break;
      case "selectCustomer":
        service.assignCustomerToOrderHandler(orderId, payload.customerId);
        break;
      case "deleteOrder":
        service.deleteOrderHandler(Number(orderId));
        break;
      case "createDiscount":
        service.createDiscountHandler(orderId, payload);
        break;
      // case "applyDiscountToOrder":
      //   service.applyDiscountsToOrderHandler(orderId, {
      //     discounts: [payload.discountId],
      //   });
      //   break;
      case "removeDiscount":
        service.removeDiscountsFromOrderHandler(orderId, {
          discounts: [payload.discountId],
        });
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandler();
        break;
      case "openSelectDiscountCard":
        service.getDiscountsListHandler();
        break;
      case "closeSelectDiscountCard":
        service.closeSelectDiscountCardHandler();
        break;
      case "manageCustomer":
        service.manageCustomerHandler(payload);
        break;
      case "createCustomer":
        service.createCustomerHandler(payload);
        break;
      case "updateCustomer":
        service.updateCustomerHandler(payload);
        break;
      case "deleteCustomer":
        service.deleteCustomerHandler(payload);
        break;
      case "closeCustomerCard":
        service.closeCustomerCardHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.ordersPage}>
      <SheContextSidebar
        menuCollectionType="order"
        menuTitle="Order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      ></SheContextSidebar>

      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      />
      <OrderConfigurationCard
        isLoading={state.isOrderConfigurationCardLoading}
        isDiscountsGridLoading={state.isDiscountsGridLoading}
        isShipmentsGridLoading={state.isShipmentsGridLoading}
        order={ordersState.selectedOrder}
        onAction={onAction}
      />
      {state.activeCards?.includes("selectEntityCard") && (
        <div ref={createRefCallback("selectEntityCard")}>
          <SelectEntityCard
            isLoading={state.isSelectEntityCardLoading}
            isGridLoading={state.isSelectEntityGridLoading}
            entityName={"Customer"}
            entityCollection={ordersState.customersGridRequestModel.items}
            columns={
              CustomersListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("customerCard") && (
        <div ref={createRefCallback("customerCard")}>
          <CustomerCard
            isLoading={state.isCustomerCardLoading}
            showCloseButton={true}
            customer={state.selectedCustomer}
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
