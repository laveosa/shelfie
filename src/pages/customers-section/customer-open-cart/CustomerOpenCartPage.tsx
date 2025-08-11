import React, { useEffect } from "react";

import cs from "./CustomerOpenCartPage.module.scss";
import CustomerMenuCard from "@/components/complex/custom-cards/customer-menu-card/CustomerMenuCard.tsx";
import useCustomerOpenCartPageService from "./useCustomerOpenCartPageService.ts";

export function CustomerOpenCartPage() {

  const { 
    state,
    customerId,
    getCustomerInfoHandler
  } = useCustomerOpenCartPageService();
  // ================================================================== EVENT
  useEffect(() => {
    if(state.customerCounter.openCartsAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  // ================================================================== LAYOUT



  return (
    <div id={cs["CustomerOpenCartPage"]} className={cs.customerOpenCartPage}>

      <CustomerMenuCard
        isLoading={state.isCustomerMenuCardLoading}
        title="Customer"
        counter={state.customerCounter}
        customerId={customerId}
      />  
      
    </div>
  );
}
