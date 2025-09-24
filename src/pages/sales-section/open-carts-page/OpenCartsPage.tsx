import { useParams } from "react-router-dom";
import React from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";

export function OpenCartsPage() {
  // ==================================================================== UTILITIES
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const { orderId } = useParams();

  // ==================================================================== LAYOUT
  return (
    <div id={cs.ordersPage}>
      <SheContextSidebar
        menuCollectionType="sales"
        menuTitle="Sales"
        itemId={Number(orderId)}
        counter={state.salesCounters}
      >
        <h1>Open Carts Page</h1>
      </SheContextSidebar>
    </div>
  );
}
