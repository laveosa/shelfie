import React, { useEffect } from "react";

import cs from "./CustomerBasicDataPage.module.scss";
import useCustomerBasicDataPageService from "./useCustomerBasicDataPageService.ts";
import CustomerMenuCard from "@/components/complex/custom-cards/customer-menu-card/CustomerMenuCard.tsx";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";

export function CustomerBasicDataPage() {
  const {
    state,
    customerId,
    getCustomerHandler,
    updateCustomerHandler,
    createCustomerHandler,
    onCancelHandler,
    getCustomerInfoHandler,
    deleteCustomerHandler,
  } = useCustomerBasicDataPageService();

  // ================================================================== EVENT
  useEffect(() => {
    getCustomerHandler();
    if (state.customerCounter?.addressesAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  async function onAction(actionType: string, data?: any) {
    switch (actionType) {
      case "deleteCustomer":
        deleteCustomerHandler(data);
        break;
      case "createCustomer":
        createCustomerHandler(data);
        break;
      case "updateCustomer":
        updateCustomerHandler(data);
        break;
      case "closeCustomerCard":
        onCancelHandler();
        break;
    }
  }
  // ================================================================== LAYOUT

  return (
    <div className={cs.customerBasicDataPage}>
      <CustomerMenuCard
        isLoading={state.isCustomerMenuCardLoading}
        title="Customer"
        counter={state.customerCounter}
        customerId={customerId}
      />
      <CustomerCard
        isLoading={state.isCustomerBasicDataLoading}
        customer={state.selectedCustomer}
        onAction={onAction}
      />
    </div>
  );
}
