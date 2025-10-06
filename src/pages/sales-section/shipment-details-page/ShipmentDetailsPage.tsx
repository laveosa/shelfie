import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ShipmentDetailsPage.module.scss";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderShipmentPageSliceActions as actions } from "@/state/slices/OrderShipmentPageSlice";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";
import useShipmentDetailsPageService from "@/pages/sales-section/shipment-details-page/useShipmentDetailsPageService.ts";
import ShipmentConfigurationCard from "@/components/complex/custom-cards/shipment-configuration-card/ShipmentConfigurationCard.tsx";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function ShipmentDetailsPage() {
  // ==================================================================== UTILITIES
  const { shipmentId } = useParams();
  const state = useAppSelector<IShipmentDetailsPageSlice>(
    StoreSliceEnum.SHIPMENT_DETAILS,
  );
  const shipmentsState = useAppSelector<IShipmentsPageSlice>(
    StoreSliceEnum.SHIPMENTS,
  );
  const service = useShipmentDetailsPageService();
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.SHIPMENT_DETAILS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!state.selectedShipment || state.selectedShipment.id !== shipmentId) {
      service.getShipmentDetailsHandler(Number(shipmentId));
    }
  }, [shipmentId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, _payload?: any) {
    switch (actionType) {
      case "createShipment":
        handleCardAction("shipmentConfigurationCard", true);
        // service.createShipmentHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.shipmentDetailsPage}>
      <SheContextSidebar hideSidebarBlock>
        <ShipmentConfigurationCard
          isLoading={state.isShipmentConfigurationCardLoading}
          shipment={shipmentsState.selectedShipment}
          onAction={onAction}
        />
      </SheContextSidebar>
    </div>
  );
}
