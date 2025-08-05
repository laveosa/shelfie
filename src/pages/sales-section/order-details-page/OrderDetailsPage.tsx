import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import useOrderDetailsPageService from "@/pages/sales-section/order-details-page/useOrderDetailsPageService.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import OrderConfigurationCard from "@/components/complex/custom-cards/order-configuration-card/OrderConfigurationCard.tsx";

export function OrderDetailsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.PRODUCT_GALLERY,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderDetailsPageService();
  const ordersService = useOrdersPageService();
  const { orderId } = useParams();

  useEffect(() => {
    if (
      !ordersState.selectedOrder ||
      ordersState.selectedOrder.id !== orderId
    ) {
      service.getOrderDetailsHandler(Number(orderId));
    }
  });

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
      />
      <OrderConfigurationCard order={ordersState.selectedOrder} />
    </div>
  );
}
