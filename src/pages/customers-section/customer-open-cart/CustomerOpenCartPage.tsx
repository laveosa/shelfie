import React, { useEffect } from "react";

import cs from "./CustomerOpenCartPage.module.scss";
import useCustomerOpenCartPageService from "./useCustomerOpenCartPageService.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function CustomerOpenCartPage() {
  // ==================================================================== UTILITIES
  const { state, customerId, getCustomerInfoHandler } =
    useCustomerOpenCartPageService();

  // ================================================================== EVENT
  useEffect(() => {
    if (state.customerCounter?.openCartsAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  // ================================================================== LAYOUT
  return (
    <div id="CustomerOpenCartPage" className={cs.customerOpenCartPage}>
      <SheContextSidebar
        menuCollectionType="customer"
        menuTitle="Customer"
        counter={state.customerCounter}
        itemId={Number(customerId)}
        activeCards={state.activeCards}
      ></SheContextSidebar>
    </div>
  );
}
