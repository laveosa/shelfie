import React, { useEffect } from "react";

import cs from "./CustomerBasicDataPage.module.scss";
import useCustomerBasicDataPageService from "./useCustomerBasicDataPageService.ts";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function CustomerBasicDataPage() {
  // ==================================================================== UTILITIES
  const { state, customerId, ...service } = useCustomerBasicDataPageService();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getCustomerHandler();
    if (state.customerCounter?.addressesAmount === undefined && customerId) {
      service.getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, data?: any) {
    switch (actionType) {
      case "deleteCustomer":
        service.deleteCustomerHandler(data);
        break;
      case "createCustomer":
        service.createCustomerHandler(data);
        break;
      case "updateCustomer":
        service.updateCustomerHandler(data);
        break;
      case "closeCustomerCard":
        service.onCancelHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div id="CustomerBasicDataPage" className={cs.customerBasicDataPage}>
      <SheContextSidebar
        menuCollectionType="customer"
        menuTitle="Customer"
        counter={state.customerCounter}
        itemId={Number(customerId)}
        activeCards={state.activeCards}
      >
        <CustomerCard
          isLoading={state.isCustomerBasicDataLoading}
          customer={state.selectedCustomer}
          onAction={onAction}
        />
      </SheContextSidebar>
    </div>
  );
}
