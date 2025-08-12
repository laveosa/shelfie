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

export function OrderShipmentPage() {
  const { orderId } = useParams();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderShipmentPageService();

  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
    service.getOrderStockActionsListForGrid(orderId);
  }, [orderId]);

  async function onAction(actionType: string, _payload?: any) {
    switch (actionType) {
      case "openSelectEntityCard":
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
      />
      <ShipmentDetailsCard
        isLoading={state.isShipmentDetailsCardLoading}
        products={ordersState.stockActionsGridModel.items}
        shipments={[]}
        isProductsGridLoading={state.isProductsGridLoading}
        isShipmentsGridLoading={state.isShipmentsGridLoading}
      />
      <ShipmentConfigurationCard />
    </div>
  );
}
