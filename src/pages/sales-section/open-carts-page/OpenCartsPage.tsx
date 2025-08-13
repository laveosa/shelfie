import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import React from "react";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";

export function OpenCartsPage() {
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);

  return (
    <div id={cs.ordersPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Sales"
        itemsCollection="sales"
        counter={state.salesCounters}
      />
    </div>
  );
}
