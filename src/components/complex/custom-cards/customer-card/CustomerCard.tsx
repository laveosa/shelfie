import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ICustomerCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerCard.ts";
import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import cs from "./CustomerCard.module.scss";

export default function CustomerCard({
  isLoading,
  customer,
  showCloseButton,
  onAction,
}: ICustomerCard) {
  const { t } = useTranslation();

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        className={cs.customerConfigurationFormCard}
        title={
          customer
            ? t("CardTitles.EditCustomer")
            : t("CardTitles.CreateCustomer")
        }
        showCloseButton={showCloseButton}
        onSecondaryButtonClick={() => onAction("closeCustomerCard")}
        showNotificationCard={!!customer}
        notificationCardProps={{
          title: "Delete Customer",
          titleTransKey: "CardTitles.DeleteCustomer",
          text: "This customer will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible.",
          textTransKey: "ConfirmationMessages.DeleteCustomer",
          buttonText: "Delete",
          buttonTextTransKey: "CommonButtons.Delete",
          buttonColor: "#FF0000",
          buttonIcon: Trash2,
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
      </SheProductCard>
    </div>
  );
}
