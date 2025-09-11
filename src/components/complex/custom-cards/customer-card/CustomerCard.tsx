import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerCard.module.scss";
import { Trash2 } from "lucide-react";
import { ICustomerCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerCard.ts";
import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import { useTranslation } from "react-i18next";

export default function CustomerCard({
  isLoading,
  customer,
  editCustomer,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onAction,
}: ICustomerCard) {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phoneNumber: customer.phoneNumber || "",
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
    }
  }, [customer]);

  function onSubmit(data) {
    onPrimaryButtonClick(data);
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        className={cs.customerConfigurationFormCard}
        title={
          editCustomer
            ? t("CardTitles.EditCustomer")
            : t("CardTitles.CreateCustomer")
        }
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
            onSubmit={onSubmit}
            onCancel={onSecondaryButtonClick}
          />
        </div>
      </SheProductCard>
    </div>
  );
}
