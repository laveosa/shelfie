import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./OrderShipmentPage.module.scss";
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
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import SelectShipmentForOrderCard from "@/components/complex/custom-cards/select-shipment-for-order-card/SelectShipmentForOrderCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import SelectCustomerAddress from "@/components/complex/custom-cards/select-customer-address/SelectCustomerAddress.tsx";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import CustomerAddressCard from "@/components/complex/custom-cards/customer-address-card/CustomerAddressCard.tsx";
import SelectOrderForShipmentCard from "@/components/complex/custom-cards/select-order-for-shipment-card/SelectOrderForShipmentCard.tsx";

export function OrderShipmentPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.ORDER_SHIPMENT].activeCards,
      refreshAction: actions.refreshActiveCards,
    });
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderShipmentPageService(handleCardAction);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
    service.getShipmentStatusForOrderHandler(Number(orderId));
    service.getShipmentsListForOrderHandler(orderId);
    dispatch(actions.refreshSelectedShipment({}));
    dispatch(actions.refreshActiveCards([]));
  }, [orderId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "createShipment":
        service.createShipmentForOrderHandler(Number(orderId));
        break;
      case "closeShipmentConfigurationCard":
        service.closeShipmentConfigurationCardHandler();
        break;
      case "changeShipmentDate":
        service.updateShipmentDatesHandler(
          state.selectedShipment.shipmentId,
          payload,
        );
        break;
      case "changeCustomer":
        service.getListOfCustomersForGridHandler({
          ...ordersState.customersGridRequestModel,
          searchQuery: payload,
        });
        break;
      case "selectCustomer":
        service.selectCustomerHandler(payload);
        break;
      case "searchEntity":
        service.searchEntityHandle(payload);
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandler();
        break;
      case "selectAddress":
        service.updateShipmentAddressHandler(payload);
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
        service.getShipmentDetailsHandler(payload.shipmentId);
        break;
      case "closeSelectShipmentForOrderCard":
        service.closeSelectShipmentForOrderCardHandler();
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
          payload,
        );
        break;
      case "addAllItemsToShipment":
        service.addAllVariantsToShipmentHandler(
          state.selectedShipment.shipmentId,
          payload,
        );
        break;
      case "removeItemFromShipment":
        service.removeVariantFromShipmentHandler(payload.stockActionId);
        break;
      case "changePackedOrderItemQuantity":
        service.changePackedOrderItemQuantityHandler(payload);
        break;
      case "confirmPackedProducts":
        service.confirmPackedProductsHandler(
          state.selectedShipment.shipmentId,
          payload,
        );
        break;
      case "openSelectAddressCard":
        service.openSelectAddressCardHandler(payload);
        break;
      case "searchAddress":
        service.searchAddressHandle(payload);
        break;
      case "closeSelectAddressCard":
        service.closeSelectAddressCardHandler();
        break;
      case "manageCustomer":
        service.openCustomerCardHandler(payload);
        break;
      case "openCustomerCard":
        service.openCustomerCardHandler();
        break;
      case "createCustomer":
        service.createCustomerHandler(payload);
        break;
      case "updateCustomer":
        service.updateCustomerHandler(payload);
        break;
      case "closeCustomerCard":
        service.closeCustomerCardHandler();
        break;
      case "manageAddress":
        service.manageAddressHandler(payload);
        break;
      case "submitCustomerAddressData":
        service.resolveCustomerAddressData(payload);
        break;
      case "closeCustomerAddressCard":
        service.closeCustomerAddressCardHandler();
        break;
      case "openSelectOrderForShipmentCard":
        service.openSelectOrderForShipmentCardHandler();
        break;
      case "connectOrderToShipment":
        service.addOrderToShipmentHandler(payload);
        break;
      case "closeSelectOrderForShipmentCard":
        service.closeSelectOrderForShipmentCardHandler();
        break;
      case "navigateToOrder":
        service.navigateToOrderHandler(payload);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.orderShipmentPage}>
      <SheContextSidebar
        menuCollectionType="order"
        menuTitle="Order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      >
        <ShipmentDetailsCard
          isLoading={state.isShipmentDetailsCardLoading}
          products={state.orderStockActions}
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
              shipmentsGridRequestModel={state.shipmentsGridRequestModel}
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
        {state.activeCards?.includes("selectOrderForShipmentCard") && (
          <div ref={createRefCallback("selectOrderForShipmentCard")}>
            <SelectOrderForShipmentCard
              isLoading={state.isSelectOrderForShipmentCardLoading}
              isGridLoading={state.isOrdersGridLoading}
              customer={state.selectedCustomer}
              ordersGridRequestModel={state.ordersGridRequestModel}
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
        {state.activeCards?.includes("selectCustomerAddressCard") && (
          <div ref={createRefCallback("selectCustomerAddressCard")}>
            <SelectCustomerAddress
              isLoading={state.isSelectCustomerAddressCardLoading}
              isGridLoading={state.isCustomerAddressesGridLoading}
              customer={state.selectedShipment?.customer}
              addressesList={state.addressesGridRequestModel?.items}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("customerCard") && (
          <div ref={createRefCallback("customerCard")}>
            <CustomerCard
              isLoading={state.isCustomerCardLoading}
              customer={state.managedCustomer}
              showCloseButton={true}
              hideNotificationCard={true}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("customerAddressCard") && (
          <div ref={createRefCallback("customerAddressCard")}>
            <CustomerAddressCard
              isLoading={state.isCustomerAddressCardLoading}
              customerAddress={state.managedAddress}
              countryList={state.countryCodesList}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
