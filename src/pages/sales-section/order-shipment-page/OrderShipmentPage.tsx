import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ShipmentDetailsCard from "@/components/complex/custom-cards/shipment-details-card/ShipmentDetailsCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import useOrderShipmentPageService from "@/pages/sales-section/order-shipment-page/useOrderShipmentService.ts";
import ShipmentConfigurationCard from "@/components/complex/custom-cards/shipment-configuration-card/ShipmentConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderShipmentPageSliceActions as actions } from "@/state/slices/OrderShipmentPageSlice";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/customers-list-grid/CustomersListGridColumns.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import SelectShipmentForOrderCard from "@/components/complex/custom-cards/select-shipment-for-order/SelectShipmentForOrder.tsx";
import { filter } from "lodash";

export function OrderShipmentPage() {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderShipmentPageService();
  const ordersService = useOrdersPageService();

  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.ORDER_SHIPMENT].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
    service.getOrderStockActionsListForGrid(orderId);
  }, [orderId]);

  useEffect(() => {
    service.getShipmentsListForForGridHandler(state.shipmentsGridRequestModel);
  }, [state.shipmentsGridRequestModel]);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "createShipment":
        handleCardAction("shipmentConfigurationCard", true);
        service.createShipmentHandler();
        break;
      case "closeShipmentConfigurationCard":
        handleCardAction("shipmentConfigurationCard");
        break;
      case "changeShipmentDate":
        service.updateShipmentDatesHandler(
          state.selectedShipment.shipmentId,
          payload,
        );
        break;
      case "changeCustomer":
        handleCardAction("selectEntityCard", true);
        if (ordersState.customersGridModel.items.length === 0) {
          ordersService.getListOfCustomersForGridHandler({
            ...ordersState.customersGridRequestModel,
            searchQuery: payload,
          });
        }
        break;
      case "selectCustomer":
        handleCardAction("selectEntityCard");
        if (!state.selectedShipment?.shipmentId) {
          dispatch(actions.refreshSelectedCustomer(payload));
          dispatch(
            actions.refreshShipmentsGridRequestModel({
              ...state.shipmentsGridRequestModel,
              filter: {
                customerId: payload.customerId,
              },
            }),
          );
        } else {
          service.updateShipmentCustomerHandler(
            state.selectedShipment.shipmentId,
            { customerId: payload.customerId },
          );
        }
        break;
      case "closeSelectEntityCard":
        handleCardAction("selectEntityCard");
        break;
      case "selectAddress":
        handleCardAction("selectEntityCard");
        service.updateShipmentCustomerHandler(
          state.selectedShipment.shipmentId,
          { addressId: payload.addressId },
        );
        break;
      case "selectShipment":
        handleCardAction("selectShipmentForOrderCard", true);
        service.getShipmentsListForForGridHandler(
          state.shipmentsGridRequestModel,
        );
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        isLoading={state.setIsProductMenuCardLoading}
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
      />
      <ShipmentDetailsCard
        isLoading={state.isShipmentDetailsCardLoading}
        products={ordersState.stockActionsGridModel.items}
        shipments={[]}
        isProductsGridLoading={state.isProductsGridLoading}
        isShipmentsGridLoading={state.isShipmentsGridLoading}
        onAction={onAction}
      />
      {state.activeCards.includes("selectShipmentForOrderCard") && (
        <div ref={createRefCallback("selectShipmentForOrderCard")}>
          <SelectShipmentForOrderCard
            isLoading={state.isSelectShipmentForOrderCardLoading}
            isGridLoading={state.isSelectShipmentForOrderGridLoading}
            shipments={state.shipmentsGridModel.items}
            customer={state.selectedCustomer}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("shipmentConfigurationCard") && (
        <div ref={createRefCallback("shipmentConfigurationCard")}>
          <ShipmentConfigurationCard
            isLoading={state.isShipmentConfigurationCardLoading}
            shipment={state.selectedShipment}
            onAction={onAction}
          />
        </div>
      )}
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
