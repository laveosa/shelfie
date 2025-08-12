import React, { useEffect } from "react";

import cs from "./CustomerOrdersPage.module.scss";
import CustomerMenuCard from "@/components/complex/custom-cards/customer-menu-card/CustomerMenuCard.tsx";
import useCustomerOrdersPageService from "./useCustomerOrdersPageService.ts";

export function CustomerOrdersPage() {

  const { 
    state,
    customerId,
    getCustomerInfoHandler
  } = useCustomerOrdersPageService();
  // ================================================================== EVENT
  useEffect(() => {
    if(state.customerCounter.ordersAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  // ================================================================== LAYOUT



  return (
    <div id={cs["CustomerOrdersPage"]} className={cs.customerOrdersPage}>

      <CustomerMenuCard
        isLoading={state.isCustomerMenuCardLoading}
        title="Customer"
        counter={state.customerCounter}
        customerId={customerId}
      />  
      
    </div>
  );
}
