import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import { Trash2 } from "lucide-react";

interface CustomerCardProps {
  isLoading?: boolean;
  customer?: any; // Replace with CustomerModel if available
  editCustomer: boolean;
  onPrimaryButtonClick: (data: any) => void;
  onSecondaryButtonClick?: () => void;
  onAction?: (actionType: string, data?: any) => void;
}

export default function CustomerCard({
  isLoading,
  customer,
  editCustomer,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onAction,
  ...props
}: CustomerCardProps) {
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
        {...props}
      >
        <div className={cs.customerCardContent}>
        <div className={cs.customerConfigurationForm}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field
              name="firstName"
              rules={{ required: "First name is required" }}
            >
              <SheInput
                label="First Name"
                placeholder="Enter first name..."
                isValid={!form.formState.errors.firstName}
                patternErrorMessage={form.formState.errors.firstName?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            <SheForm.Field
              name="lastName"
              rules={{ required: "Last name is required" }}
            >
              <SheInput
                label="Last Name"
                placeholder="Enter last name..."
                isValid={!form.formState.errors.lastName}
                patternErrorMessage={form.formState.errors.lastName?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            <SheForm.Field
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
              }}
            >
              <SheInput
                label="Email"
                placeholder="Enter email..."
                isValid={!form.formState.errors.email}
                patternErrorMessage={form.formState.errors.email?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            <SheForm.Field
              name="phoneNumber"
              rules={{ 
                required: "Phone number is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number (e.g., +1234567890 or 1234567890)"
                },
                minLength: {
                  value: 9,
                  message: "Phone number must be at least 9 digits"
                },
                maxLength: {
                  value: 15,
                  message: "Phone number cannot exceed 15 digits"
                }
              }}
            >
              <SheInput
                label="Phone Number"
                placeholder="Enter phone number..."
                isValid={!form.formState.errors.phoneNumber}
                patternErrorMessage={form.formState.errors.phoneNumber?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            

            <div
              className={cs.cardFooter}
              style={{ justifyContent: true ? "space-between" : "flex-end", }}
            >
                <SheButton
                  variant="secondary"
                  onClick={() => {onSecondaryButtonClick()}}
                  value="Cancel"
                />
                <SheButton
                  variant="default"
                  onClick={() => {form.handleSubmit(onSubmit)}}
                  value={editCustomer ? "Save Changes" : "Add Customer"}
                />
            </div>
          </SheForm>
        </div>
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