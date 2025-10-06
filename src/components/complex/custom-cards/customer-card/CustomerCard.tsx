import React from "react";

import cs from "./CustomerCard.module.scss";
import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ICustomerCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerCard.ts";

export default function CustomerCard({
  isLoading,
  customer,
  showCloseButton,
  onAction,
}: ICustomerCard) {
  // ==================================================================== LAYOUT
  return (
    <div>
      <SheCard
        className={cs.customerConfigurationFormCard}
        title={customer ? "EditCustomer" : "CreateCustomer"}
        titleTransKey={
          customer ? "CardTitles.EditCustomer" : "CardTitles.CreateCustomer"
        }
        showCloseButton={showCloseButton}
        onSecondaryButtonClick={() => onAction("closeCustomerCard")}
        isLoading={isLoading}
        showNotificationCard={!!customer}
        notificationCardProps={{
          title: "Delete Customer",
          titleTransKey: "CardTitles.DeleteCustomer",
          text: "This customer will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible.",
          textTransKey: "ConfirmationMessages.DeleteCustomer",
          onClick: () => onAction("deleteCustomer", customer),
        }}
      >
        <div className={cs.customerCardContent}>
          <CustomerForm
            data={customer}
            isCreate={!customer}
            onSubmit={(data) =>
              customer
                ? onAction("updateCustomer", data)
                : onAction("createCustomer", data)
            }
            onCancel={() => onAction("closeCustomerCard")}
          />
        </div>
      </SheCard>
    </div>
  );
}
