import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ShipmentDetailsPage.module.scss";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { ShipmentDetailsPageSliceActions as actions } from "@/state/slices/ShipmentDetailsPageSlice.ts";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";
import useShipmentDetailsPageService from "@/pages/sales-section/shipment-details-page/useShipmentDetailsPageService.ts";
import ShipmentConfigurationCard from "@/components/complex/custom-cards/shipment-configuration-card/ShipmentConfigurationCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import SelectOrderForShipmentCard from "@/components/complex/custom-cards/select-order-for-shipment-card/SelectOrderForShipmentCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import SelectCustomerAddress from "@/components/complex/custom-cards/select-customer-address/SelectCustomerAddress.tsx";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import CustomerAddressCard from "@/components/complex/custom-cards/customer-address-card/CustomerAddressCard.tsx";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";

export function ShipmentDetailsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.SHIPMENT_DETAILS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { shipmentId } = useParams();
  const state = useAppSelector<IShipmentDetailsPageSlice>(
    StoreSliceEnum.SHIPMENT_DETAILS,
  );
  const service = useShipmentDetailsPageService(handleCardAction);
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!state.selectedShipment || state.selectedShipment.id !== shipmentId) {
      service.getShipmentDetailsHandler(Number(shipmentId));
    }
    service.getShipmentDetailsHandler(Number(shipmentId));
    service.getDeliveryServicesListHandler();
  }, [shipmentId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "createShipment":
        handleCardAction("shipmentConfigurationCard", true);
        service.createShipmentHandler();
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
      case "removeOrderFromShipment":
        service.disconnectOrderFromShipmentHandler(
          state.selectedShipment.shipmentId,
          payload.orderId,
        );
        break;
      case "addItemToShipment":
        service.addVariantToShipmentHandler(payload);
        break;
      case "addAllItemsToShipment":
        service.addAllVariantsToShipmentHandler();
        break;
      case "removeItemFromShipment":
        service.removeVariantFromShipmentHandler(payload.stockActionId);
        break;
      case "changePackedOrderItemQuantity":
        service.changePackedOrderItemQuantityHandler(payload);
        break;
      case "decreasePackedOrderItemQuantity":
        service.decreaseShipmentStockActionHandler(payload);
        break;
      case "increasePackedOrderItemQuantity":
        service.increaseShipmentStockActionHandler(payload);
        break;
      case "confirmPackedProducts":
        service.confirmPackedProductsHandler();
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
      case "cancelShipment":
        service.cancelShipmentHandler();
        break;
      case "returnShipmentStatusToPrevious":
        service.returnShipmentStatusToPreviousHandler();
        break;
      case "confirmDeliveryData":
        service.confirmDeliveryDataHandler(payload);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.shipmentDetailsPage}>
      <SheContextSidebar hideSidebarBlock activeCards={state.activeCards}>
        <ShipmentConfigurationCard
          isLoading={state.isShipmentConfigurationCardLoading}
          shipment={state.selectedShipment}
          deliveryServices={state.deliveryServicesList}
          onAction={onAction}
        />
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
