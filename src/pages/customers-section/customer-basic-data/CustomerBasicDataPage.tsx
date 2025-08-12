import React, { useEffect } from "react";

import cs from "./CustomerBasicDataPage.module.scss";
import useCustomerBasicDataPageService from "./useCustomerBasicDataPageService.ts";
import CustomerMenuCard from "@/components/complex/custom-cards/customer-menu-card/CustomerMenuCard.tsx";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

export function CustomerBasicDataPage() {

  const { 
    state,
    customerId,
    getCustomerHandler ,
    updateCustomerHandler,
    createCustomerHandler,
    onCancelHandler,
    getCustomerInfoHandler,
    deleteCustomerHandler
  } = useCustomerBasicDataPageService();

  const { openConfirmationDialog } = useDialogService();
  
  // ================================================================== EVENT
  useEffect(() => {
    getCustomerHandler();
    if(state.customerCounter.addressesAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    } 
  }, []);

  async function onAction(
    actionType: string,
    data?: any,
  ) {
    switch (actionType) {
      
      case "deleteCustomer":
        const confirmedCustomerDeleting = await openConfirmationDialog({
          title: "Deleting customer",
          text: `You are about to delete customer ${data.customerName}.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedCustomerDeleting) return;

        deleteCustomerHandler(data);
        break;
      
    }
  }
  // ================================================================== LAYOUT

  function onSubmitCustomerDataHandler(data: any) {
    if(customerId) {
      updateCustomerHandler(data);
    } else {
      createCustomerHandler(data);
    }
  }

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
        editCustomer={!!customerId}
        onPrimaryButtonClick={(data) => onSubmitCustomerDataHandler(data)}
        onSecondaryButtonClick={onCancelHandler}
        onAction={onAction}
      />
    </div>
  );
}
