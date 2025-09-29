import React, { useEffect } from "react";

import cs from "./CustomerOrdersPage.module.scss";
import useCustomerOrdersPageService from "./useCustomerOrdersPageService.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function CustomerOrdersPage() {
  const { state, customerId, getCustomerInfoHandler } =
    useCustomerOrdersPageService();
  // ================================================================== EVENT
  useEffect(() => {
    if (state.customerCounter?.ordersAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  // ================================================================== LAYOUT

  return (
    <div id="CustomerOrdersPage" className={cs.customerOrdersPage}>
      <SheContextSidebar
        menuCollectionType="customer"
        menuTitle="Customer"
        counter={state.customerCounter}
        itemId={Number(customerId)}
        activeCards={state.activeCards}
      >
        <h1>Customer Order page</h1>
      </SheContextSidebar>
    </div>
  );
}
