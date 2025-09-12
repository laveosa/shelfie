import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ShipmentsCard from "@/components/complex/custom-cards/shipments-card/ShipmentsCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice.ts";
import useShipmentsPageService from "@/pages/sales-section/shipments-page/useShipmentsPageService.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";

export function ShipmentsPage() {
  const service = useShipmentsPageService();
  const state = useAppSelector<IShipmentsPageSlice>(StoreSliceEnum.SHIPMENTS);
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.SHIPMENTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    service.getShipmentsListForForGridHandler(state.shipmentsGridRequestModel);
  }, []);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "createShipment":
        service.createShipmentHandler();
        break;
      case "manageShipment":
        service.manageShipmentHandler(payload);
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard title="Sales" itemsCollection="sales" />
      <ShipmentsCard
        isLoading={state.isShipmentsCardLoading}
        isShipmentsGridLoading={state.isShipmentsGridLoading}
        shipmentsGridRequestModel={state.shipmentsGridRequestModel}
        onAction={onAction}
      />
    </div>
  );
}
