import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import { Trash2 } from "lucide-react";
import { ICustomerCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerCard.ts";
import CustomerForm from "@/components/forms/customer-form/CustomerForm";


export default function CustomerCard({
  isLoading,
  customer,
  editCustomer,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onAction,
}: ICustomerCard) {
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
        title={editCustomer ? "Edit Customer" : "Create Customer"}
        className={cs.customerConfigurationFormCard}
      >
        <div className={cs.customerCardContent}>
            <CustomerForm
              data={customer}
              isCreate={!customer}
              onSubmit={onSubmit}
              onCancel={onSecondaryButtonClick}
            />
        {customer && (
        <SheCardNotification
          title="Delete Customer"
          text="This customer will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible."
          buttonColor="#EF4343"
          buttonVariant="outline"
          buttonText="Delete"
          buttonIcon={Trash2}
            onClick={() => {onAction("deleteCustomer", customer)}}
          />
        )}
        </div>
      </SheProductCard>
    </div>
  );
} 