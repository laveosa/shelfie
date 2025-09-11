import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ShipmentDetailsCard from "@/components/complex/custom-cards/shipment-details-card/ShipmentDetailsCard.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import useOrderShipmentPageService from "@/pages/sales-section/order-shipment-page/useOrderShipmentService.ts";
import ShipmentConfigurationCard from "@/components/complex/custom-cards/shipment-configuration-card/ShipmentConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderShipmentPageSliceActions as actions } from "@/state/slices/OrderShipmentPageSlice";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import { DataWithId } from "@/components/complex/grid/DndGrid.tsx";
import SelectShipmentForOrderCard from "@/components/complex/custom-cards/select-shipment-for-order/SelectShipmentForOrder.tsx";

export function OrderShipmentPage() {
  const { orderId } = useParams();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderShipmentPageService();
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
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
    service.getShipmentsListForOrderHandler(orderId);
  }, [orderId]);

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
        service.getListOfCustomersForGridHandler({
          ...ordersState.customersGridRequestModel,
          searchQuery: payload,
        });
        break;
      case "selectCustomer":
        handleCardAction("selectEntityCard");
        service.selectCustomerHandler(payload);
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
      case "selectShipment": {
        handleMultipleCardActions({
          shipmentConfigurationCard: false,
          selectShipmentForOrderCard: true,
        });
        service.selectShipmentHandler();
        break;
      }
      case "showAllShipments":
        service.showAllShipmentsHandler();
        break;
      case "connectShipmentToOrder":
        service.connectShipmentToOrderHandler(
          payload.shipmentId,
          Number(orderId),
        );
        break;
      case "manageShipment":
        handleMultipleCardActions({
          shipmentConfigurationCard: true,
          selectShipmentForOrderCard: false,
        });
        service.getShipmentDetailsHandler(payload.shipmentId);
        break;
      case "closeSelectShipmentForOrderCard":
        handleCardAction("selectShipmentForOrderCard");
        break;
      case "applyColumns":
        service.applyShipmentsGridColumns(payload);
        break;
      case "resetColumns":
        service.resetUserPreferencesHandler("shipments");
        break;
      case "gridRequestChange":
        service.shipmentsGridRequestChangeHandle(payload);
        break;
      case "removeOrderFromShipment":
        service.disconnectOrderFromShipmentHandler(
          state.selectedShipment.shipmentId,
          payload.orderId,
        );
        break;
      case "addItemToShipment":
        service.addVariantsToShipmentHandler(
          state.selectedShipment.shipmentId,
          {
            items: [
              {
                stockActionId: payload.stockActionId,
                quantity: payload.quantity,
              },
            ],
          },
        );
        break;
      case "removeItemFromShipment":
        service.removeVariantFromShipmentHandler(payload.stockActionId);
        console.log(payload);
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        isLoading={state.setIsProductMenuCardLoading}
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      />
      <ShipmentDetailsCard
        isLoading={state.isShipmentDetailsCardLoading}
        products={ordersState.stockActionsGridModel.items}
        shipments={state.orderShipments}
        customer={state.selectedCustomer}
        isProductsGridLoading={state.isProductsGridLoading}
        isShipmentsGridLoading={state.isOrderShipmentsGridLoading}
        onAction={onAction}
      />
      {state.activeCards.includes("selectShipmentForOrderCard") && (
        <div ref={createRefCallback("selectShipmentForOrderCard")}>
          <SelectShipmentForOrderCard
            isLoading={state.isSelectShipmentForOrderCardLoading}
            isGridLoading={state.isSelectShipmentForOrderGridLoading}
            shipmentsGridModel={state.shipmentsGridModel}
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
